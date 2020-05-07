import { Request, Router } from 'express';
import UsersController from './controllers/UsersController';
import Response from '../../../app/http/response/NodexResponse';
import UserCreateValidation from './middlewares/UserCreateValidation';

const userRouter = Router();
const usersController = UsersController.initialize();
const userCreateValidation = new UserCreateValidation();

userRouter.get('', (req: Request, res: Response) => usersController.index(req, res));
userRouter.post('', userCreateValidation.rules, userCreateValidation.validate(), (req: Request, res: Response) =>
    usersController.create(req, res)
);
userRouter.get('/:userId', (req: Request, res: Response) => usersController.show(req, res));
userRouter.put('/:userId', (req: Request, res: Response) => usersController.update(req, res));
userRouter.delete('/:userId', (req: Request, res: Response) => usersController.destroy(req, res));

export default userRouter;
