import User from '../entity/User';

interface UserRepository {
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    all(): Promise<User[]>;
    create(firstName: string, lastName: string, email: string, password: string): Promise<User>;
    update(user: User, firstName: string, lastName: string, email: string, password: string): Promise<User>;
    delete(userId: number): Promise<void>;
}

export default UserRepository;
