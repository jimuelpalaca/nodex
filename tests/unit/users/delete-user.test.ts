import chai from 'chai';
import { describe } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import { anything, instance, mock, when } from 'ts-mockito';
import User from '../../../src/modules/users/domain/entity/User';
import UserRepository from '../../../src/modules/users/domain/repositories/UserRepository';
import DeleteUser from '../../../src/modules/users/domain/usecases/DeleteUser';
import NotFoundException from '../../../src/app/exceptions/NotFoundException';

describe('Delete User', () => {
    let mockedUserRepository: UserRepository;
    let deleteUser: DeleteUser;

    chai.should();
    chai.use(chaiAsPromised);

    beforeEach(() => {
        mockedUserRepository = mock<UserRepository>();
        deleteUser = new DeleteUser(instance(mockedUserRepository));
    });

    it('should delete a user', async () => {
        when(mockedUserRepository.findOne(anything())).thenResolve({
            email: 'user@test.com',
        } as User);
        when(mockedUserRepository.delete(anything())).thenResolve();

        await deleteUser.destroy('1').should.be.fulfilled;
    });

    it('should throw a not found exception when trying to delete a non-existing user', async () => {
        when(mockedUserRepository.findOne(anything())).thenReturn(null);

        await deleteUser.destroy('1').should.be.rejectedWith(NotFoundException, 'User not found');
    });

    it('should throw an error when deleting user on the database fails', async () => {
        when(mockedUserRepository.findOne(anything())).thenResolve({
            email: 'user@test.com',
        } as User);
        when(mockedUserRepository.delete(anything())).thenReject(new Error('Database transaction fails'));

        await deleteUser.destroy('1').should.be.rejectedWith(Error, 'Database transaction fails');
    });
});
