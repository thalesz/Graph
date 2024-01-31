import cors, { CorsOptions } from 'cors';
import allowedOrigins from './allowedOrigins';

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin as string) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }

    },
};

export default corsOptions;
