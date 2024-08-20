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
        createdAt: "asc",
      },
    });

    const results = transactions.map((transaction) => ({
      date: transaction.createdAt,
      status: transaction.status,
      product: transaction.product.name,
      quantity: transaction.quantity,
      total: transaction.totalPrice,
    }));

    return results;
  } catch (error: any) {
    throw new Error(error.message || "An error occured");
  }
}
