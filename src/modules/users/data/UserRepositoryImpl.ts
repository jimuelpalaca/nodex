import User from '../domain/entity/User';
import UserRepository from '../domain/repositories/UserRepository';

class UserRepositoryImpl implements UserRepository {
    async findOne(id: number): Promise<User> {
        return User.findOne({ id });
    }

    async findByEmail(email: string): Promise<User> {
        return User.findOne({ where: { email } });
    }

    async all(): Promise<User[]> {
        return User.find();
    }

    async create(firstName: string, lastName: string, email: string, password: string): Promise<User> {
        return User.create({
            firstName,
            lastName,
            email,
            password,
        }).save();
    }

    async update(user: User, firstName: string, lastName: string, email: string, password: string): Promise<User> {
        await User.update(user.id, {
            firstName,
            lastName,
            email,
            password,
        });

        await user.reload();

        return user;
    }

    async delete(userId: number): Promise<void> {
        await User.delete(userId);
    }
}

export default UserRepositoryImpl;
