import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { indexOrderRouter } from './routes';
import { deleteOrderRouter } from './routes/delete';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';

const app = express();
app.set('trust proxy', true); // trust first proxy
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(indexOrderRouter)
app.use(deleteOrderRouter)
app.use(newOrderRouter)
app.use(showOrderRouter)

/*app.all('*',async (req,res,next) => {
  next(new NotFoundError());
});*/

export { app };

