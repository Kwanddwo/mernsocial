import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const CURRENT_WORKING_DIR = process.cwd();

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.use('/', authRoutes);
app.use('/', userRoutes);

// Overrides default error handler
// express-jwt throws an error named UnauthorizedError when a token cannot be
// validated for some reason. We catch this error here to return a 401 status back to the
// requesting client. We also add a response to be sent if other server-side errors are
// generated and caught here.
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message})
    } else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
})

export default app