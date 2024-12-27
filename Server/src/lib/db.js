import mongoose from 'mongoose';

export const connectdb = async (req, res) => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/cars");
        console.log(`Connected to database: ${connect.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};