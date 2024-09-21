import {
  ChartColumn,
  Container,
  LayoutDashboardIcon,
  Package,
  Package2,
  PackageOpen,
  PackageSearch,
  Receipt,
  SquareStack,
  TabletSmartphone,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

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
    title: "Categorized Products",
    description:
      "Keep your products organized by category to avoid any confusion.",
    icon: <SquareStack size={24} />,
  },
];

export const faqList = [
  {
    id: "Q1",
    question: "What is the purpose StockifyHub?",
    answer:
      "Our goal is to help users efficiently organize and monitor their stocks, while providing a clear overview of their inventories.",
  },
  {
    id: "Q2",
    question: "Is there a mobile apps, on Android / iOS?",
    answer:
      "At the moment, we only offer a web app. However, we're excited to develop a mobile version for Android and iOS in the near future!",
  },
  {
    id: "Q3",
    question: "How do I sign up for the web app?",
    answer: (
      <p>
        Register your account at{" "}
        <Link href={"/register"} className="text-main-500 underline">
          this link
        </Link>
        .
      </p>
    ),
  },
  {
    id: "Q4",
    question: "Who’s the creator of StockifyHub?",
    answer: (
      <div>
        <p>
          Hello, my name is{" "}
          <span className="font-bold text-main-500">Andre Edyson</span>.
          Checkout my{" "}
          <Link
            href={"https://github.com/andreedyson"}
            target="_blank"
            className="underline"
          >
            GitHub{" "}
          </Link>
          or{" "}
          <Link
            href={"https://instagram.com/andreedyson"}
            target="_blank"
            className="underline"
          >
            Instagram
          </Link>
        </p>
      </div>
    ),
  },
  {
    id: "Q5",
    question: "How many organizations can I create?",
    answer: "As many as you want!",
  },
  {
    id: "Q6",
    question: "How many members can you add to an inventory?",
    answer:
      "Multiple users can be granted access to an inventory and each user will have their own account and role-based permissions within the system.",
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
