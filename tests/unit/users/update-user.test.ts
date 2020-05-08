import chai from 'chai';
import { describe } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import { anything, instance, mock, when } from 'ts-mockito';
import UserRepository from '../../../src/modules/users/domain/repositories/UserRepository';
import FindUser from '../../../src/modules/users/domain/usecases/FindUser';
import User from '../../../src/modules/users/domain/entity/User';
import NotFoundException from '../../../src/app/exceptions/NotFoundException';
import UpdateUser from '../../../src/modules/users/domain/usecases/UpdateUser';

describe('Update User', () => {
    let mockedUserRepository: UserRepository;
    let updateUser: UpdateUser;

    chai.should();
    chai.use(chaiAsPromised);

    beforeEach(() => {
        mockedUserRepository = mock<UserRepository>();
        updateUser = new UpdateUser(instance(mockedUserRepository));
    });

    it('should update a specific user base on provided id', async () => {
        when(mockedUserRepository.findOne(anything())).thenResolve({
            email: 'user@test.com',
        } as User);
        when(mockedUserRepository.update(anything(), anything(), anything(), anything(), anything())).thenResolve();

        await updateUser.update('1', 'test', 'user', 'user@test.com', 'password').should.be.fulfilled;
    });

    it('should throw a not found exception when trying to update a non-existing user', async () => {
        when(mockedUserRepository.findOne(anything())).thenReturn(null);

        await updateUser
            .update('1', 'test', 'user', 'user@test.com', 'password')
            .should.be.rejectedWith(NotFoundException, 'User not found');
    });

    it('should throw an error when database transaction fails', async () => {
        when(mockedUserRepository.findOne(anything())).thenResolve({ email: 'user@test.com' } as User);
        when(mockedUserRepository.update(anything(), anything(), anything(), anything(), anything())).thenReject(
            new Error('Database transaction fails')
        );

        await updateUser
            .update('1', 'test', 'user', 'user@test.com', 'password')
            .should.be.rejectedWith(Error, 'Database transaction fails');
    });
});
