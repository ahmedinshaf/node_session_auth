import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../models/user';
import { BadRequest, Unauthorized } from '../errors';
import { validate, registerSchema, loginSchema } from '../validation';
import { logIn, logOut } from '../auth';
import { catchAsync } from '../middleware';

const register = async (req: Request, res: Response, next: NextFunction) => {
    await validate(registerSchema, req.body);

    const { email, name, password } = req.body;

    const found = await User.exists({ email });

    if (found) {
        throw new BadRequest('Invalid email');
    }

    const user = await User.create({
        email,
        name,
        password
    });

    logIn(req, user.id);

    const link = user.verificationUrl();

    // await sendMail({
    //     to: email,
    //     subject: 'Verify your email address',
    //     text: link
    // });
    console.log(req.session);

    res.json({ message: 'OK' });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    await validate(loginSchema, req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchesPassword(password))) {
        throw new Unauthorized('Incorrect email or password');
    }
    logIn(req, user.id);
    res.json({ message: 'logged in' });
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await logOut(req, res);
        res.json({ message: 'OK' });
    } catch (e) {
        console.log(e);
    }
};

export default { register, login, logout };
