import mongoose from "mongoose";
export const db = () => {
    const dbConnection = process.env.DB;
    if (!dbConnection) {
        console.error("Database connection string not provided");
        return;
    }
    try {
        mongoose.connect(dbConnection).then(() => {
            console.log('Database connected successfully');
        });
    }
    catch (error) {
        return error;
    }
};
//# sourceMappingURL=connection.js.map