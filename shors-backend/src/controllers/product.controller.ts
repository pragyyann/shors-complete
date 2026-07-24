import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.getActiveProducts();

  res.status(200).json({
    success: true,
    data: products,
  });
});

export const getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  const product = await productService.getProductBySlug(slug);

  res.status(200).json({
    success: true,
    data: product,
  });
});

export const getProductsByCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = req.params.category as string;
  const products = await productService.getActiveProductsByCategory(category);

  res.status(200).json({
    success: true,
    data: products,
  });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  const product = await productService.updateProduct(id, req.body);

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  await productService.softDeleteProduct(id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
