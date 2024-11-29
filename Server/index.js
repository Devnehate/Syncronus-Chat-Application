import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoute.js';
import contactsRoute from './routes/ContactRoutes.js';
import setupSocket from './socket.js';
import messagesRoute from './routes/MessagesRoutes.js';
import channelRoutes from './routes/ChannelRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials:true,
}
));

app.use("/uploads/profile", express.static("uploads/profile"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/contacts", contactsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/channel", channelRoutes);

const server = app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

setupSocket(server);

mongoose.connect(databaseUrl).then(() => console.log("Db connection successfull")).catch(err => console.log(err.message));