import { Request } from 'express';
import Response from '../../../../app/http/response/NodexResponse';
import User from '../../domain/entity/User';
import FindUser from '../../domain/usecases/FindUser';
import UsersTransformer from '../transformers/UsersTransformer';
import UserServiceProvider from '../provider/UserServiceProvider';
import CreateUser from '../../domain/usecases/CreateUser';
import UpdateUser from '../../domain/usecases/UpdateUser';
import NotFoundException from '../../../../app/exceptions/NotFoundException';
import UnprocessableEntityException from '../../../../app/exceptions/UnprocessableEntityException';
import DeleteUser from '../../domain/usecases/DeleteUser';
import ResponseCode from '../../../../app/http/response/ResponseCode';

class UsersController {
    constructor(
        private findUser: FindUser,
        private createUser: CreateUser,
        private updateUser: UpdateUser,
        private deleteUser: DeleteUser
    ) {}

    async index(req: Request, res: Response) {
        try {
            const users: User[] = await this.findUser.findAllUsers();

            return res.withCollection(users, new UsersTransformer());
        } catch (exception) {
            return res.withException(exception);
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const user: User = await this.findUser.findById(userId);

            return res.withItem(user, new UsersTransformer());
        } catch (exception) {
            if (exception instanceof NotFoundException) {
                return res.errorNotFound(exception.message);
            }

            return res.withException(exception);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password } = req.body;

            await this.createUser.create(firstName, lastName, email, password);

            return res
                .status(ResponseCode.HTTP_CREATED)
                .json({ message: 'OK' })
                .end();
        } catch (exception) {
            if (exception instanceof UnprocessableEntityException) {
                return res.errorUnprocessableEntity(exception.message);
            }

            return res.withException(exception);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { firstName, lastName, email, password } = req.body;

            const user = await this.updateUser.update(userId, firstName, lastName, email, password);

            return res.withItem(user, new UsersTransformer());
        } catch (exception) {
            if (exception instanceof NotFoundException) {
                return res.errorNotFound(exception.message);
            }

            return res.withException(exception);
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            await this.deleteUser.destroy(userId);

            return res.status(ResponseCode.HTTP_ACCEPTED).end();
        } catch (exception) {
            if (exception instanceof NotFoundException) {
                return res.errorNotFound(exception.message);
            }

            return res.withException(exception);
        }
    }

    static initialize(): UsersController {
        return new UsersController(
            UserServiceProvider.findUser,
            UserServiceProvider.createUser,
            UserServiceProvider.updateUser,
            UserServiceProvider.deleteUser
        );
    }
}

export default UsersController;
