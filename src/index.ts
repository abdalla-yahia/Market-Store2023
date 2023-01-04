import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middlewares/errorMiddleware';
import db from './database';
import config from './config';
import routes from './routes';

const app: Application = express();
const port = config.port;

// Add Middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Apply the rate limiting middleware to all requests
app.use(
    rateLimit({
        windowMs: 2 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message:
            'Many Requests has been sent from this Ip please try again after 2 minutes',
    })
);
app.get('/', (req: Request, res: Response) => {
    // throw new Error('Error eccured');
    res.send('Welcome To Our Page 😁');
});
app.use('/api', routes);
db.connect().then((client) => {
    return client
        .query('SELECT NOW()')
        .then((res) => {
            client.release();
            console.log(res.rows);
        })
        .catch((err: Error) => {
            client.release();
            console.log(err.stack);
        });
});
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Page Not Found' });
    next();
});
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Server Running At Port ${port}...!!!`);
});

export default app;
