import mongoose from "mongoose";

const connectDB = async () => { 
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("connected to database.") 
        });
        connection.on('error',(err)=>{
            console.log("mongoDb connection error please make sure mongodb is running properly" + err);
            
        })

    } catch (error) {
        console.log("error while connecting with database.", error);
        
    }
}