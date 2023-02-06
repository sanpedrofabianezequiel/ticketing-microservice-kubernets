import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { app } from './app';

app.set('trust proxy', true); // trust first proxy
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

/*app.all('*',async (req,res,next) => {
  next(new NotFoundError());
});*/



const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!||'');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
}

start();


