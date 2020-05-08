import UserRepository from '../repositories/UserRepository';
import UnprocessableEntityException from "../../../../app/exceptions/UnprocessableEntityException";

class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async create(firstName: string, lastName: string, email: string, password: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if (user) {
            throw new UnprocessableEntityException('Email is already taken');
        }

        await this.userRepository.create(firstName, lastName, email, password);
    }
}

export default CreateUser;
