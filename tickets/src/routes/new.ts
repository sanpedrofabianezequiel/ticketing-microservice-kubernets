import express ,{ Request, Response } from 'express' ;
import { body } from 'express-validator' ;
import { validateRequest } from '../../../auth/src/middlewares/validate-request';
import { Ticket } from '../models/tickets';

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
    res.status(201).send(ticket);
});
export { router as createTicketRouter } ;