import UserRepository from '../repositories/UserRepository';
import User from '../entity/User';
import NotFoundException from "../../../../app/exceptions/NotFoundException";

class UpdateUser {
    constructor(private userRepository: UserRepository) {}

    async update(userId: string, firstName: string, lastName: string, email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne(parseInt(userId, 10));

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return await this.userRepository.update(user, firstName, lastName, email, password);
    }
}

export default UpdateUser;
