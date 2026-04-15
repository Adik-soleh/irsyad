import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: any;
        admin: {
            id: any;
            username: any;
        };
    }>;
    seed(): Promise<{
        message: string;
        admin?: undefined;
    } | {
        message: string;
        admin: {
            id: any;
            username: any;
        };
    }>;
}
