import mongoose from 'mongoose';

export const connectdb = async (req, res) => {
    try {
        const connect = await mongoose.connect("mongodb+srv://neeleshrana22:cabproject123@cluster0.mqshx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`Connected to database: ${connect.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};