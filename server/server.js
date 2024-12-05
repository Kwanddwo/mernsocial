import mongoose from 'mongoose';
import config from '../config/config';
import app from './express';

const HOST = 'http://127.0.0.1';
const port = config.port

const mongoUri = config.mongoUri;

mongoose.connect(mongoUri)
.then(() => {
    console.log(`Connected successfully to mongodb server on ${mongoUri}`);
})
.catch((err) => { console.log(err) })

mongoose.connection.on('error', (err) => {
    console.error(err);
    throw new Error(`Unable to connect to database: ${mongoUri}`);
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info(`server started on port ${port}, link: ${HOST}:${port}`);
});