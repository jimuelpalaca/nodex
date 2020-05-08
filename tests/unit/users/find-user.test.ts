import chai from 'chai';
import { describe } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import { anything, instance, mock, when } from 'ts-mockito';
import UserRepository from '../../../src/modules/users/domain/repositories/UserRepository';
import FindUser from '../../../src/modules/users/domain/usecases/FindUser';
import User from '../../../src/modules/users/domain/entity/User';
import NotFoundException from '../../../src/app/exceptions/NotFoundException';

describe('Find User', () => {
    let mockedUserRepository: UserRepository;
    let findUser: FindUser;

    chai.should();
    chai.use(chaiAsPromised);

    beforeEach(() => {
        mockedUserRepository = mock<UserRepository>();
        findUser = new FindUser(instance(mockedUserRepository));
    });

    it('should return a specific user base on provided id', async () => {
        when(mockedUserRepository.findOne(anything())).thenResolve({
            email: 'user@test.com',
        } as User);

        await findUser.findById('1').should.be.fulfilled;
    });

    it('should throw a not found exception when trying to fetch a non-existing user', async () => {
        when(mockedUserRepository.findOne(anything())).thenReturn(null);

        await findUser.findById('1').should.be.rejectedWith(NotFoundException, 'User not found');
    });

    it('should throw an error when database transaction fails', async () => {
        when(mockedUserRepository.findOne(anything())).thenReject(new Error('Database transaction fails'));

        await findUser.findById('1').should.be.rejectedWith(Error, 'Database transaction fails');
    });
});
