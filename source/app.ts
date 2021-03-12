import express from 'express';
import session, { Store } from 'express-session';
import { SESSION_OPTIONS } from './config';
import { notFound, serverError } from './middleware';
import projectRoutes from './routes/project';
import authRoutes from './routes/auth';
// import { home, login, register, verify, reset } from './routes';
// import { notFound, serverError, active } from './middleware';

export const createApp = (store: Store) => {
    const app = express();

    app.use(express.json());

    app.use(session({ ...SESSION_OPTIONS, store }));
    app.get('/', (req, res) => res.send('Hello'));
    app.use('/api/projects', projectRoutes);
    app.use('/api/auth', authRoutes);
    app.use(notFound);
    app.use(serverError);

    return app;
};
