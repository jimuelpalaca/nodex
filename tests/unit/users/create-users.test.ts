import chai from 'chai';
import { describe } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import { anything, instance, mock, when } from 'ts-mockito';
import User from '../../../src/modules/users/domain/entity/User';
import CreateUser from '../../../src/modules/users/domain/usecases/CreateUser';
import UserRepository from '../../../src/modules/users/domain/repositories/UserRepository';
import UnprocessableEntityException from '../../../src/app/exceptions/UnprocessableEntityException';

describe('User Creation', () => {
    let mockedUserRepository: UserRepository;
    let createUser: CreateUser;

    chai.should();
    chai.use(chaiAsPromised);

    beforeEach(() => {
        mockedUserRepository = mock<UserRepository>();
        createUser = new CreateUser(instance(mockedUserRepository));
    });

    it('should create a new user', async () => {
        when(mockedUserRepository.findByEmail(anything())).thenReturn(null);
        when(mockedUserRepository.create(anything(), anything(), anything(), anything())).thenResolve({
            firstName: 'User',
            lastName: 'Test',
            email: 'user@test.com',
            password: 'password',
        } as User);

        await createUser.create('User', 'Test', 'user@test.com', 'password').should.eventually.be.fulfilled;
    });

    it('should throw an unprocessable exception when provided email is already exist.', async () => {
        when(mockedUserRepository.findByEmail(anything())).thenResolve({
            email: 'user@test.com',
        } as User);

        await createUser
            .create('User', 'Test', 'user@test.com', 'password')
            .should.eventually.be.rejectedWith(UnprocessableEntityException, 'Email is already taken');
    });

    it('should throw an exception when saving user to the database fails', async () => {
        when(mockedUserRepository.findByEmail(anything())).thenReturn(null);
        when(mockedUserRepository.create(anything(), anything(), anything(), anything())).thenReject(new Error('Transaction Fails'));

        await createUser
            .create('User', 'Test', 'user@test.com', 'password')
            .should.eventually.be.rejectedWith(Error, 'Transaction Fails');
    });
});
