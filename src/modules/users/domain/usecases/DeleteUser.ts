import UserRepository from '../repositories/UserRepository';
import NotFoundException from '../../../../app/exceptions/NotFoundException';

class DeleteUser {
    constructor(private userRepository: UserRepository) {}

    async destroy(userId: string) {
        const user = await this.userRepository.findOne(parseInt(userId, 10));

        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.userRepository.delete(user.id);
    }
}

export default DeleteUser;
