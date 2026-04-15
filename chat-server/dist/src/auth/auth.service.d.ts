import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateAdmin(username: string, password: string): Promise<any>;
    login(username: string, password: string): Promise<{
        access_token: any;
        admin: {
            id: any;
            username: any;
        };
    }>;
    seedAdmin(): Promise<{
        message: string;
        admin?: undefined;
    } | {
        message: string;
        admin: {
            id: any;
            username: any;
        };
    }>;
    verifyToken(token: string): any;
}
