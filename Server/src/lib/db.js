import mongoose from 'mongoose';

export const connectdb = async (req, res) => {
    try {
        const connect = await mongoose.connect("mongodb+srv://naagarharsh70:CO80qLMQS0thC7SU@zynx.2t3en.mongodb.net/Zync");
        console.log(`Connected to database: ${connect.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};