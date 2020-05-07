import User from '../../domain/entity/User';
import Transformer from '../../../../app/http/mapper/Transformer';

class UsersTransformer implements Transformer<User> {
    transform(data: User): object {
        return {
            full_name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            created_at: data.createdAt,
            updated_at: data.updatedAt,
        };
    }
}

export default UsersTransformer;
