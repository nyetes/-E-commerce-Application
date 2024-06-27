import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import PrismaClient from "@prisma/client";
import AdminJSPrisma from "@adminjs/prisma";
// import prisma from "./utils/database";
import { Express } from "express";
// AdminJS.registerAdapter({
//   Resource: AdminJSPrisma.Resource,
//   Database: AdminJSPrisma.Database,
// });

const prisma = new PrismaClient();

AdminJS.registerAdapter(AdminJSPrisma);

const adminJs = new AdminJS({
  databases: [prisma],
  rootPath: "/admin",
  resources: [
    {
      resource: { model: "Product", client: prisma },
      options: {
        listProperties: ["image", "title", "category", "price", "rating"],
      },
    },
    {
      resource: { model: "Category", client: prisma },
      options: {
        listProperties: ["name"],
      },
    },
  ],
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);

export default adminRouter;
