import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app: Application = express();
const port = process.env.PORT || 3000;

// Add Middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Apply the rate limiting middleware to all requests
app.use(
    rateLimit({
        windowMs: 2 * 60 * 1000, // 15 minutes
        max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message:
            'Many Requests has been sent from this Ip please try again after 2 minutes',
    })
);
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome To Our Page 😁');
});

app.listen(port, () => {
    console.log(`Server Running At Port ${port}...!!!`);
});

export default app;
