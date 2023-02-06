import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true); // trust first proxy
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)

/*app.all('*',async (req,res,next) => {
  next(new NotFoundError());
});*/

export { app };

