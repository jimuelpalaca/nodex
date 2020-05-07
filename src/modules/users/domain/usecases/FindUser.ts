import UserRepository from '../repositories/UserRepository';
import User from '../entity/User';
import NotFoundException from '../../../../app/exceptions/NotFoundException';

class FindUser {
    constructor(private userRepository: UserRepository) {}

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async findAllUsers(): Promise<User[]> {
        return this.userRepository.all();
    }
}

export default FindUser;
