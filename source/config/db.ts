import { ConnectionOptions } from 'mongoose';
export const MONGO_URI = `mongodb+srv://inshaf:127149@cluster0.t0rre.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const MONGO_OPTIONS: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
