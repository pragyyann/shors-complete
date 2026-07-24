import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import { Prisma } from "@prisma/client";

export class ProductService {
  async getActiveProducts() {
    return prisma.product.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
      include: {
        images: true,
      },
    });
  }

  async getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: true,
      },
    });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return product;
  }

  async getActiveProductsByCategory(category: string) {
    return prisma.product.findMany({
      where: {
        category,
        isActive: true,
      },
      orderBy: { displayOrder: "asc" },
      include: {
        images: true,
      },
    });
  }

  async createProduct(data: Prisma.ProductUncheckedCreateInput) {

    // Validate slug uniqueness
    const existingProduct = await prisma.product.findUnique({
      where: { slug: data.slug },
    });
    if (existingProduct) {
      throw new ApiError(409, "A product with this slug already exists");
    }

    return prisma.product.create({
      data,
    });
  }

  async updateProduct(id: number, data: Prisma.ProductUncheckedUpdateInput) {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    // Validate slug uniqueness if slug is being updated
    if (data.slug && data.slug !== product.slug) {
      const existingProduct = await prisma.product.findUnique({
        where: { slug: data.slug as string },
      });
      if (existingProduct) {
        throw new ApiError(409, "A product with this slug already exists");
      }
    }

    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async softDeleteProduct(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
