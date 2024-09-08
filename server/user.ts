import prisma from "@/lib/db";
import {
  CurrentUserPromise,
  DashboardStatisticProps,
} from "@/types/server/user";

export async function getCurrentUser(
  userId: string,
): Promise<CurrentUserPromise> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        fullname: true,
        image: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error("There was a problem getting user data");
  }
}

export async function getUserDashboardStatistics(
  userId: string,
): Promise<DashboardStatisticProps> {
  try {
    const totalProducts = await prisma.product.aggregate({
      _count: {
        id: true,
      },
      where: {
        Inventory: {
          users: {
            some: {
              userId: userId,
            },
          },
        },
      },
    });

    const totalInventories = await prisma.inventory.aggregate({
      _count: {
        id: true,
      },
      where: {
        users: {
          some: {
            userId: userId,
          },
        },
      },
    });

    const totalCategories = await prisma.category.aggregate({
      _count: {
        id: true,
      },
      where: {
        Inventory: {
          users: {
            some: {
              userId: userId,
            },
          },
        },
      },
    });

    const totalTransactions = await prisma.transaction.aggregate({
      _count: {
        id: true,
      },
      where: {
        product: {
          Inventory: {
            users: {
              some: {
                userId: userId,
              },
            },
          },
        },
      },
    });

    const results = [
      {
        title: "Products",
        amount: totalProducts._count.id,
        color: "255, 203, 17",
      },
      {
        title: "Inventories",
        amount: totalInventories._count.id,
        color: "17, 141, 255",
      },
      {
        title: "Categories",
        amount: totalCategories._count.id,
        color: "136, 17, 255",
      },
      {
        title: "Transactions",
        amount: totalTransactions._count.id,
        color: "255, 146, 17",
      },
    ];

    return results;
  } catch (error) {
    throw new Error("There was a problem getting dashboard data");
  }
}
