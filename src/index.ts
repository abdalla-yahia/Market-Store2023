import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome To Our Page 😁');
});

app.listen(port, () => {
    console.log(`Server Running At Port ${port}...!!!`);
});

export default app;
