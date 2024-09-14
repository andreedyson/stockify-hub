import {
  ChartColumnIncreasing,
  Container,
  LayoutDashboardIcon,
  Package,
  Package2,
  PackageSearch,
  Receipt,
  User,
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
];

export const landingPageNavbarLinks = [
  {
    title: "Home",
    path: "#home",
  },
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Features",
    path: "#features",
  },
  {
    title: "FAQ",
    path: "#faq",
  },
];

export const aboutWalkthrough = [
  {
    title: "Register an account",
    description:
      "Start using our application by registering a free account (or a paid one).",
    icon: <User size={28} fill="#222222" stroke="#222222" />,
  },
  {
    title: "Create an Organization",
    description: "Manage different kind of products / your own organizations.",
    icon: <Container size={28} stroke="#222222" />,
  },
  {
    title: "Start Tracking",
    description:
      "Start adding products to track with an insightful charts and tables.",
    icon: <Package2 size={28} stroke="#222222" />,
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
