
# **Stockify Hub**

![Landing Page](https://github.com/user-attachments/assets/f4ec7ad6-c3e7-4718-9aeb-11d6aa70fd6a)

## 📋 <a name="table">Table of Contents</a>

1. 📰 [Overview](#overview)
2. ⚙️ [Technology Used](#tech-stack)
3. 👩‍💻 [Features](#features)
4. 👟 [Getting Started](#started)

## <a name="overview">📰 Overview</a>

StockifyHub is a powerful, modern inventory management web application designed for flexibility, ease of use, and seamless stock management. Built with a high-performance tech stack of Next.js, PostgreSQL, Prisma, and Tailwind CSS, StockifyHub streamlines the complexity of inventory tracking with a clean, responsive design and a suite of features tailored to the needs of businesses of all sizes.


## <a name="tech-stack">⚙️ Technology Used</a>

- Next.js
- Typescript
- PostgreSQL
- Prisma
- TailwindCSS
- Zod
- NextAuth
- shadcn
- UploadThing

  
## <a name="features">👩‍💻 Features</a>

🔐 **Secure Authentication**: Secure authentication using NextAuth, user can sign up and log in with ease using email/password or Google account.

📦 **Inventory Creation**: Create and manage multiple inventories within StockifyHub, organizing products, categories, and transactions in a structured and easy-to-navigate format.

🫂 **Role-Based Access**: Control access across three main roles—Owner, Admin, and User.

🧑‍💻 **Add Members to Inventories**: wners can invite members to join an inventory and assign them either Admin or User roles.

🗃️ **Product and Category Management**: Easily add, update, and categorize products within inventories. Users with appropriate permissions can create categories to organize products, assign products to categories, and edit product details as needed.

🧾 **Transaction Tracking**: Track transactions by status (Pending, In Progress, Completed, Cancelled) to get the clarity on stock movement.

⭕ **Real-Time Updates**: Get live updates on stock levels and inventory changes, ensuring your data is always up-to-date and allowing your team to make quick, data-driven decisions.

🖥️ **Modern, Responsive Interface**: With a design powered by Tailwind CSS, StockifyHub provides a seamless user experience across devices, allowing easy management from desktops, tablets, and mobile phones.

##  <a name="started">👟 Getting Started</a>

To set up StockifyHub locally, follow these steps:

1. **Clone the repository**:
    ```bash
   git clone https://github.com/andreedyson/stockify-hub.git
   cd stockify-hub
    ```
2. **Install Dependencies**:
    ```bash
   npm install
    ```

3. **Configure environment variables**:
   Create a .env file in the root directory with the required environment variables. Include your PostgreSQL database credentials, NextAuth configuration (e.g., secret, providers), and any other necessary variables.
   ```env
   # NextAuth
    NEXTAUTH_URL =
    NEXT_PUBLIC_BASE_API_URL=
    NEXTAUTH_SECRET=
    
    # Postgres
    POSTGRES_URL=
    POSTGRES_PRISMA_URL=
    POSTGRES_URL_NO_SSL=
    POSTGRES_URL_NON_POOLING=
    POSTGRES_USER=
    POSTGRES_HOST=
    POSTGRES_PASSWORD=
    POSTGRES_DATABASE=
    
    # https://uploadthing.com
    UPLOADTHING_SECRET=
    UPLOADTHING_APP_ID=
    
    # https://console.cloud.google.com
    GOOGLE_ID=
    GOOGLE_SECRET=
    ```

5. **Migrate the database**:
  Initialize your PostgreSQL database schema with Prisma:
    ```bash
    npx prisma migrate dev --name init
    ```

6. **Run the development server**:
    ```bash
   npm run dev
    ```

7. **Access StockifyHub**:
Open http://localhost:3000 in your browser to start managing your inventory.
---
Created by [@andreedyson](https://www.github.com/andreedyson)

