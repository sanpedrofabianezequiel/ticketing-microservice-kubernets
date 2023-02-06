import express,{Request,Response} from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signup',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
],
validateRequest
,async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user  = await User.findOne({ email });
    if (user) {
        throw new BadRequestError('Email in use');
    }
    const newUser = User.build({ email, password });
    await newUser.save();
    const userJwt = jwt.sign({
        id: newUser.id,
        email: newUser.email
    },process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    }

    res.status(201).send(newUser);
});

export { router as signupRouter };