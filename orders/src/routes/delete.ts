import express, { Request, Response } from 'express';
import { Order } from '../models/order';
import { NotFoundError } from '../../../auth/src/errors/not-found-error';
import { NotAuthorizedError } from '../../../auth/src/errors/not-authorized-error';
import { OrderStatus } from '@sgtickets/common';

const router = express.Router();

router.delete('/api/orders/:orderId',async (req: Request, res: Response) => {
   const { orderId } = req.params;

   const order =  await Order.findById(orderId);
   if(!order) {
       throw new NotFoundError();
   }

   if(order.userId !== req.currentUser!.id) {
       throw new NotAuthorizedError();
   }

    order.status = OrderStatus.Cancelled;
    await order.save();

    return res.status(204).send(order);
});

export { router as deleteOrderRouter };