import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { PreorderStatus, Prisma } from "@prisma/client";

interface GetPreordersOptions {
  page?: number;
  limit?: number;
  status?: PreorderStatus;
  search?: string;
  sort?: "desc" | "asc";
}

interface CreatePreorderDto {
  productId: number;
  quantity: number;
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  message?: string;
}


export class PreorderService {
  async getPreorders(options: GetPreordersOptions) {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.PreorderWhereInput = {};

    if (options.status) {
      where.status = options.status;
    }

    if (options.search) {
      let searchId: number | undefined;
      // Extract numeric ID if the search matches "SH-XXXX" or is purely numeric
      if (/^SH-\d+$/i.test(options.search)) {
        searchId = parseInt(options.search.replace(/^SH-/i, ""), 10);
      } else if (/^\d+$/.test(options.search)) {
        searchId = parseInt(options.search, 10);
      }

      where.OR = [
        { customer: { name: { contains: options.search } } },
        { customer: { email: { contains: options.search } } },
        { customer: { phone: { contains: options.search } } },
        { product: { name: { contains: options.search } } },
      ];

      if (searchId && !isNaN(searchId)) {
        where.OR.push({ id: searchId });
      }
    }

    const sortOrder = options.sort === "asc" ? "asc" : "desc";

    const [total, data] = await Promise.all([
      prisma.preorder.count({ where }),
      prisma.preorder.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: sortOrder },
        include: {
          customer: true,
          product: true,
        },
      }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    };
  }

  async getPreorderById(id: number) {
    const preorder = await prisma.preorder.findUnique({
      where: { id },
      include: {
        customer: true,
        product: true,
      },
    });

    if (!preorder) {
      throw new ApiError(404, "Preorder not found");
    }

    return preorder;
  }

  async updatePreorder(id: number, data: { status?: PreorderStatus; internalNotes?: string }) {
    const preorder = await prisma.preorder.findUnique({
      where: { id },
    });

    if (!preorder) {
      throw new ApiError(404, "Preorder not found");
    }

    return prisma.preorder.update({
      where: { id },
      data,
      include: {
        customer: true,
        product: true,
      },
    });
  }

  async createPreorder(data: CreatePreorderDto) {
    // 1. Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    // 2. Find or create customer by phone
    let customer = await prisma.customer.findUnique({
      where: { phone: data.phone },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: data.fullName,
          phone: data.phone,
          email: data.email || null,
          city: data.city || null,
        },
      });
    } else {
      // Optionally update email/city if provided and they didn't have one
      if ((data.email && !customer.email) || (data.city && !customer.city)) {
        customer = await prisma.customer.update({
          where: { id: customer.id },
          data: {
            email: customer.email || data.email || null,
            city: customer.city || data.city || null,
          },
        });
      }
    }

    // 3. Create preorder
    const preorder = await prisma.preorder.create({
      data: {
        customerId: customer.id,
        productId: product.id,
        fullName: data.fullName,
        quantity: data.quantity,
        message: data.message || null,
        status: PreorderStatus.NEW,
      },
      include: {
        customer: true,
        product: true,
      },
    });

    return preorder;
  }
}
