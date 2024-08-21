import {
  ChartColumnIncreasing,
  LayoutDashboardIcon,
  Package,
  PackageSearch,
  Receipt,
} from "lucide-react";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const sidebarLinks = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboardIcon size={20} />,
  },
  {
    title: "Inventory",
    path: "/inventory",
    icon: <Package size={20} />,
  },
  {
    title: "Products",
    path: "/products",
    icon: <PackageSearch size={20} />,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: <Receipt size={20} />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <ChartColumnIncreasing size={20} />,
  },
];

export const userRole = [{ name: "USER" }, { name: "ADMIN" }];

export const transactionStatus = [
  {
    name: "Pending",
    value: "PENDING",
  },
  {
    name: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    name: "Completed",
    value: "COMPLETED",
  },
  {
    name: "Cancelled",
    value: "CANCELLED",
  },
];
