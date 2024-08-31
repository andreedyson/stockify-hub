import prisma from "@/lib/db";
import {
  RecentTransactionsType,
  TransactionsCountType,
  TransactionsInsightsType,
  TransactionsTableType,
} from "@/types/server/transaction";
import { getUserInventoryIds } from "./inventory";

export async function getTotalTransactionsByStatus(userId: string) {
  try {
    const totalTransactionByStatus = await prisma.transaction.groupBy({
      by: ["status"],
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

    const result = totalTransactionByStatus.reduce<TransactionsCountType>(
      (acc, item) => {
        acc[
          `total${item.status.charAt(0) + item.status.slice(1).toLowerCase()}` as keyof TransactionsCountType
        ] = item._count.id;
        return acc;
      },
      {},
    );

    return result;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
}

export async function getTransactionTableData(
  userId: string,
): Promise<TransactionsTableType[]> {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        product: {
          Inventory: {
            users: {
              some: {
                userId,
              },
            },
          },
        },
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            inventoryId: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    const results = await Promise.all(
      transactions.map(async (transaction) => {
        const userAccess = await prisma.inventoryMember.findFirst({
          where: {
            userId: userId,
            inventoryId: transaction.product.inventoryId,
          },
        });

        return {
          id: transaction.id,
          date: transaction.date,
          status: transaction.status,
          product: transaction.product.name,
          productId: transaction.productId,
          quantity: transaction.quantity,
          inventoryId: transaction.product.inventoryId,
          total: transaction.totalPrice,
          userId: userAccess?.userId as string,
          currentUserRole: userAccess?.role ?? "USER",
        };
      }),
    );

    return results;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
}

export async function getTransactionTableByInventories(
  userId: string,
  inventoryId: string,
): Promise<TransactionsTableType[]> {
  try {
    const userHasAccess = await prisma.inventoryMember.findFirst({
      where: {
        userId: userId,
        inventoryId: inventoryId,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    const transactions = await prisma.transaction.findMany({
      where: {
        product: {
          inventoryId: inventoryId,
        },
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            inventoryId: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    const results = transactions.map((transaction) => ({
      id: transaction.id,
      date: transaction.date,
      status: transaction.status,
      product: transaction.product.name,
      productId: transaction.productId,
      quantity: transaction.quantity,
      total: transaction.totalPrice,
      inventoryId: transaction.product.inventoryId,
      userId: userHasAccess?.userId as string,
      currentUserRole: userHasAccess?.role ?? "USER",
    }));

    return results;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
}

export async function getTransactionsByTimeSpan(
  userId: string,
  span: string = "all",
  inventoryId?: string,
): Promise<TransactionsInsightsType[]> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const currentDate = new Date();
    let startDate, endDate;

    switch (span) {
      case "week":
        startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 6);

        endDate = currentDate;
        break;
      case "month":
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1,
        );
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
        );
        break;
      case "all":
        startDate = new Date(0);
        endDate = new Date();
        break;
      default:
        throw new Error("Invalid timespan specified");
    }

    const transactions = await prisma.transaction.groupBy({
      by: ["date"],
      where: {
        product: {
          Inventory: {
            users: {
              some: {
                userId: userId,
              },
            },
            ...(inventoryId && { id: inventoryId }),
          },
        },
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        totalPrice: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    const totalSums = transactions.map((transaction) => ({
      date: transaction.date, // Get only the date part
      total: transaction._sum.totalPrice || 0,
    }));

    return totalSums;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
}

export async function getRecentTransactions(
  userId: string,
): Promise<RecentTransactionsType[]> {
  try {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 6);

    const transactions = await prisma.transaction.findMany({
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
        date: {
          gte: startDate,
          lte: currentDate,
        },
        status: {
          not: "CANCELLED",
        },
      },
      include: {
        product: {
          select: {
            name: true,
            Category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: "desc",
      },
      take: 5,
    });

    const results = transactions.map((transaction) => ({
      id: transaction.id,
      status: transaction.status,
      date: transaction.date,
      totalPrice: transaction.totalPrice,
      productName: transaction.product.name,
      categoryName: transaction.product.Category.name,
    }));

    return results;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
}
