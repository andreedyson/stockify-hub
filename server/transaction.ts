import prisma from "@/lib/db";
import {
  TransactionsCountType,
  TransactionsTableType,
} from "@/types/server/transaction";

export async function getTotalTransactionsByStatus() {
  try {
    const totalTransactionByStatus = await prisma.transaction.groupBy({
      by: ["status"],
      _count: {
        id: true,
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
    throw new Error(error.message || "An error occured");
  }
}

export async function getTransactionTableData(
  userId: string,
): Promise<TransactionsTableType[]> {
  try {
    const userHasAccess = await prisma.inventoryMember.findFirst({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!userHasAccess) {
      throw new Error("User not found");
    }

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
      userId: userHasAccess.id,
      currentUserRole: userHasAccess.role ?? "USER",
    }));

    return results;
  } catch (error: any) {
    throw new Error(error.message || "An error occured");
  }
}
