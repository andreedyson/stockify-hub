export type InventoryCardType = {
  id: string;
  name: string;
  color: string | null;
  createdAt: Date;
  updatedAt: Date;
  memberCount?: number;
};
