import UserRepository from '../../domain/repositories/UserRepository';
import UserRepositoryImpl from '../../data/UserRepositoryImpl';
import FindUser from '../../domain/usecases/FindUser';
import CreateUser from '../../domain/usecases/CreateUser';
import UpdateUser from "../../domain/usecases/UpdateUser";
import DeleteUser from "../../domain/usecases/DeleteUser";

class UserServiceProvider {
    static userRepository: UserRepository = new UserRepositoryImpl();

    static findUser: FindUser = new FindUser(UserServiceProvider.userRepository);
    static createUser: CreateUser = new CreateUser(UserServiceProvider.userRepository);
    static updateUser: UpdateUser = new UpdateUser(UserServiceProvider.userRepository);
    static deleteUser: DeleteUser = new DeleteUser(UserServiceProvider.userRepository);
}

export default UserServiceProvider;
