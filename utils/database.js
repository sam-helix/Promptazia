import mongoose from "mongoose";
let isConnected = false;
export const connection2DB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log("mongoDB is already connected");
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });
        isConnected = true;
        console.log(`mongoDB connected:${conn.connection.host}`);

    }
    catch (e) {
        console.log(e);

    }


}
