import express, { Request, Response, Application, json } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  readProducts,
  updateProduct,
} from "./logics";
import {
  verifyProductExistenceMiddleware,
  verifyProductName,
  verifyRequestKeys,
} from "./middlewares";

const app: Application = express();

const PORT: number = 3000;
const runningMessage = `Server is running on https://localhost:${PORT}`;

app.use(json());

app.post("/products", verifyProductName, createProduct);
app.get("/products", readProducts);
app.get("/products/:id", verifyProductExistenceMiddleware, getProductById);
app.patch(
  "/products/:id",
  verifyProductExistenceMiddleware,
  verifyRequestKeys,
  verifyProductName,
  updateProduct
);
app.delete("/products/:id", verifyProductExistenceMiddleware, deleteProduct);

app.listen(PORT, () => {
  console.log(runningMessage);
});
