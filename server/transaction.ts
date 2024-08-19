import prisma from "@/lib/db";
import { TransactionsCount } from "@/types/server/transaction";

export async function getTotalTransactionsByStatus() {
  try {
    const totalTransactionByStatus = await prisma.transaction.groupBy({
      by: ["status"],
      _count: {
        id: true,
      },
    });

    const result = totalTransactionByStatus.reduce<TransactionsCount>(
      (acc, item) => {
        acc[
          `total${item.status.charAt(0) + item.status.slice(1).toLowerCase()}` as keyof TransactionsCount
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
