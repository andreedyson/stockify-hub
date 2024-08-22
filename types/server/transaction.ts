import { Status } from "@prisma/client";

export type TransactionsCountType = {
  totalPending?: number;
  totalIn_progress?: number;
  totalCompleted?: number;
  totalCancelled?: number;
};

export type TransactionsTableType = {
  id: string;
  date: Date;
  status: Status;
  product: string;
  productId: string;
  quantity: number;
  total: number;
  userId: string;
  currentUserRole: string;
};
