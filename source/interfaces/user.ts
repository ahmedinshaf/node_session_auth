import { Schema, model, Document, Model } from 'mongoose';

export default interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    verifiedAt: Date;
    matchesPassword: (password: string) => Promise<boolean>;
    verificationUrl: () => string;
}
