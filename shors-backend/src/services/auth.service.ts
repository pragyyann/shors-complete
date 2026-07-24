import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import { generateToken } from "../utils/jwt.js";

export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async login(email: string, password: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    const user = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    return { token, user };
  }

  async changePassword(adminId: number, currentPassword: string, newPassword: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid current password");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.admin.update({
      where: { id: adminId },
      data: { password: hashedNewPassword },
    });
  }
}

