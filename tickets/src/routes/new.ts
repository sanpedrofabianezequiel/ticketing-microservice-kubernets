import express ,{ Request, Response } from 'express' ;
import { body } from 'express-validator' ;
import { requireAuth,validateRequest } from '@sgtickets/common';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { Ticket } from '../models/tickets';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router() ;

router.post('/api/tickets' ,[
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
],
 validateRequest
, async(req: Request, res: Response) => {
    const { title, price } = req.body;
    console.log('Creating a ticket');
    const ticket =  Ticket.build({
        title,
        price,
        userId: '1234'  //req.currentUser!.id
    });
    await ticket.save();
    await new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: 0
    });
    res.status(201).send(ticket);
});
export { router as createTicketRouter } ;