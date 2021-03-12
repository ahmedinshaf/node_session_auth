import { Request, Response } from 'express';
import { SESSION_NAME } from './config';
import IUser from './interfaces/user';

declare module 'express-session' {
    interface Session {
        userId: string;
        createdAt: Number;
    }
}

export const isLoggedIn = (req: Request) => !!req.session!.userId;

export const logIn = (req: Request, userId: string) => {
    req.session!.userId = userId;
    req.session!.createdAt = Date.now();
};

export const logOut = (req: Request, res: Response) =>
    new Promise<void>((resolve, reject) => {
        req.session!.destroy((err: Error) => {
            if (err) reject(err);

            res.clearCookie(SESSION_NAME);

            resolve();
        });
    });

export const markAsVerified = async (user: IUser) => {
    user.verifiedAt = new Date();
    await user.save();
};

export const resetPassword = async (user: IUser, password: string) => {
    user.password = password;
    await user.save();
};
