import { Request, Response, NextFunction } from 'express';
import Error from '../interfaces/errorInterface';

const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = error.status || 500;
    const message = error.message || 'Opps Some Thing Went Error';
    res.status(status).json({ message, status });
};

export default errorMiddleware;
