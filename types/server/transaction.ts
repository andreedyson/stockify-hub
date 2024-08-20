import { Status } from "@prisma/client";

export type TransactionsCountType = {
  totalPending?: number;
  totalInProgress?: number;
  totalCompleted?: number;
  totalCancelled?: number;
};

export type TransactionsTableType = {
  date: Date;
  status: Status;
  product: string;
  quantity: number;
  total: number;
};
