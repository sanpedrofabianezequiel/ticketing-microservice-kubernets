import express, { Request, Response } from 'express';
import { Ticket } from '../models/tickets';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        return res.status(404).send({ message: 'Ticket not found' });
        //thow new NotFoundError(); NPM package: @quark-node/common
    }
    res.send(ticket);
});

export { router as showTicketRouter };