import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

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
  //env NATS_CLIENT_ID
  //NATS_URL
  //NATS_CLUSTER_ID
  //MONGO_URI
  //JWT_KEY
  try {
    await natsWrapper.connect(
       process.env.NATS_CLUSTER_ID || '',
       process.env.NATS_CLIENT_ID || '',
       process.env.NATS_URL || ''   
    );
    natsWrapper.client?.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
  });
  process.on('SIGINT', () => natsWrapper.client.close());
  process.on('SIGTERM', () => natsWrapper.client.close());
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


