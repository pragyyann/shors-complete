import { prisma } from "../lib/prisma.js";
import { PreorderStatus } from "@prisma/client";

export class DashboardService {
  async getDashboardData() {
    // Run independent aggregations concurrently for efficiency
    const [
      totalProducts,
      totalFeaturedCollections,
      totalCustomers,
      totalPreorders,
      ordersGroupByStatus,
      recentPreorders,
      topOrderedProducts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.homepageShowcaseModule.count(),
      prisma.customer.count(),
      prisma.preorder.count(),
      prisma.preorder.groupBy({
        by: ["status"],
        _count: { status: true },
      }),
      prisma.preorder.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          customer: true,
        },
      }),
      prisma.preorder.groupBy({
        by: ["productId"],
        _count: { productId: true },
        orderBy: { _count: { productId: "desc" } },
        take: 5,
      }),
    ]);

    const orders: Record<PreorderStatus, number> = {
      NEW: 0,
      CONTACTED: 0,
      CONFIRMED: 0,
      IN_PRODUCTION: 0,
      READY: 0,
      DELIVERED: 0,
      CANCELLED: 0,
    };

    ordersGroupByStatus.forEach((group: any) => {
      orders[group.status as PreorderStatus] = group._count.status;
    });

    // Resolve product names for top products
    const topProductIds = topOrderedProducts.map((p: any) => p.productId);
    const topProductDetails = await prisma.product.findMany({
      where: { id: { in: topProductIds } },
      select: { id: true, name: true },
    });

    const topProducts = topOrderedProducts.map((group: any) => {
      const productDetail = topProductDetails.find((p: any) => p.id === group.productId);
      return {
        id: group.productId,
        name: productDetail?.name || "Unknown Product",
        preorderCount: group._count.productId,
      };
    });

    return {
      summary: {
        totalProducts,
        totalFeaturedCollections,
        totalCustomers,
        totalPreorders,
      },
      orders,
      recentPreorders,
      topProducts,
    };
  }
}
