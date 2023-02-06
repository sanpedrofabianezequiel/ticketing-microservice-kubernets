import express ,{ Request, Response } from 'express' ;
import { body } from 'express-validator' ;

import { validateRequest } from '../../../auth/src/middlewares/validate-request';
import { Ticket } from '../models/tickets';
import { requireAuth } from '../../../auth/src/middlewares/require-auth'; //NPM
import { NotFoundError } from '../../../auth/src/errors/not-found-error';
import { NotAuthorizedError } from '../../../auth/src/errors/not-authorized-error';

const router = express.Router() ;

router.put('/api/tickets/:id', requireAuth,[
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
],validateRequest, async(req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        throw new NotFoundError();
        //thow new NotFoundError(); NPM package: @quark-node/common
    }
    if (ticket.userId !== (req as any).currentUser!.id) {
        throw new NotAuthorizedError();
    }
    ticket.set({
        title: req.body.title,
        price: req.body.price
    }); //set the properties of the ticket
    await ticket.save(); //save the ticket
    res.send(ticket);
});

export { router as updateTicketRouter } ;