import UserRepository from '../repositories/UserRepository';
import User from '../entity/User';
import NotFoundException from '../../../../app/exceptions/NotFoundException';

class FindUser {
    constructor(private userRepository: UserRepository) {}

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findOne(parseInt(id, 10));

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
