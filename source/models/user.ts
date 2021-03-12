// import { Schema, Document, Model } from 'mongoose';
import mongoose, { Schema, Model } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { BCRYPT_WORK_FACTOR, APP_SECRET, EMAIL_VERIFICATION_TIMEOUT, APP_ORIGIN } from '../config';

import IUser from '../interfaces/user';

interface UserModel extends Model<IUser> {
    signVerificationUrl: (url: string) => string;
    hasValidVerificationUrl: (path: string, query: any) => boolean;
}
const UserSchema: Schema = new Schema(
    {
        email: String,
        name: String,
        password: String,
        verifiedAt: Date
    },
    {
        timestamps: true
    }
);

UserSchema.pre<IUser>('save', async function () {
    if (this.isModified('password')) {
        this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
    }
});

UserSchema.methods.matchesPassword = function (password: string): Promise<boolean> {
    const user = this as IUser;
    return compare(password, user.password);
};

UserSchema.methods.verificationUrl = function (): String {
    const user = this as IUser;
    const token = createHash('sha1').update(user.email).digest('hex');
    const expires = Date.now() + EMAIL_VERIFICATION_TIMEOUT;

    const url = `${APP_ORIGIN}/email/verify?id=${this.id}&token=${token}&expires=${expires}`;
    const signature = User.signVerificationUrl(url);

    return `${url}&signature=${signature}`;
};

UserSchema.statics.signVerificationUrl = (url: string) => createHmac('sha256', APP_SECRET).update(url).digest('hex');

UserSchema.statics.hasValidVerificationUrl = (path: string, query: any) => {
    const url = `${APP_ORIGIN}${path}`;
    const original = url.slice(0, url.lastIndexOf('&'));
    const signature = User.signVerificationUrl(original);

    return timingSafeEqual(Buffer.from(signature), Buffer.from(query.signature)) && +query.expires > Date.now();
};

UserSchema.set('toJSON', {
    transform: (doc, { __v, password, ...rest }, options) => rest
});

export const User = mongoose.model<IUser, UserModel>('User', UserSchema);
