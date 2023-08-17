import 'dotenv/config';
import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import { db } from './db/connection.js';
import authRouter from './routes/auth.js';
import movieRouter from './routes/movies.js';
const app = express();
const PORT = 8080;
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//db
db();
app.use('/api/auth', authRouter);
app.use('/api/movie', movieRouter);
app.listen(process.env.PORT || PORT, () => {
    console.log(`server started on PORT ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map