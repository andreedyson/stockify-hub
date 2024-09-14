import {
  Bell,
  ChartColumn,
  Container,
  LayoutDashboardIcon,
  Package,
  Package2,
  PackageOpen,
  PackageSearch,
  Receipt,
  TabletSmartphone,
  User,
  Users,
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

export const featuresList = [
  {
    title: "Inventory Tracking",
    description: "Keep your inventory data up-to-date with real-time tracking.",
    icon: <PackageOpen size={24} />,
  },
  {
    title: "Role-Based Management",
    description:
      "Multiple users to access the inventory with role-based permissions.",
    icon: <Users size={24} />,
  },
  {
    title: "Insightful Dashboard",
    description:
      "Dashboard to display the most relevant information at a glance.",
    icon: <LayoutDashboardIcon size={24} />,
  },
  {
    title: "Mobile Accessibility",
    description:
      "Access your inventory data on the go with our mobile-friendly design.",
    icon: <TabletSmartphone size={24} />,
  },
  {
    title: "Charts Overview",
    description: "View charts of transactions by all, weekly, and monthly.",
    icon: <ChartColumn size={24} />,
  },
  {
    title: "Automated Alerts",
    description: "Receive automated notifications for low stock.",
    icon: <Bell size={24} />,
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
