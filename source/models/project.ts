import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IProject from '../interfaces/project';

const ProjectSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

ProjectSchema.post<IProject>('save', function () {
    logging.info('Mongo', 'Checkout the book we just saved: ', this);
});

export default mongoose.model<IProject>('Book', ProjectSchema);
