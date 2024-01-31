import mongoose from 'mongoose';

const connectDb = async (): Promise<void> => {
    try {
        const databaseURL = process.env.DATABASE_URL;

        if (!databaseURL) {
            throw new Error('DATABASE_URL not provided');
        }

        await mongoose.connect(databaseURL);
        console.log('Conexão com o MongoDB estabelecida!');
    } catch (err) {
        console.error(err);
    }
};

export default connectDb;
