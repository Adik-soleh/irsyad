import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, password: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return admin;
  }

  async login(username: string, password: string) {
    const admin = await this.validateAdmin(username, password);
    const payload = { sub: admin.id, username: admin.username, role: 'admin' };

    return {
      access_token: this.jwtService.sign(payload),
      admin: {
        id: admin.id,
        username: admin.username,
      },
    };
  }

  async seedAdmin() {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    const existing = await this.prisma.admin.findUnique({
      where: { username },
    });

    if (existing) {
      return { message: 'Admin already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await this.prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        email: process.env.MAIL_TO || null,
      },
    });

    return {
      message: 'Admin created successfully',
      admin: { id: admin.id, username: admin.username },
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
