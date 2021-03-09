import { Document } from 'mongoose';

export default interface IProject extends Document {
    title: string;
    author: string;
}
