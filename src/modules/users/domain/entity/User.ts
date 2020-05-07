import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column({ type: 'varchar', name: 'first_name' })
    firstName: string;

    @Column({ type: 'varchar', name: 'last_name' })
    lastName: string;

    @Column({ type: 'varchar' })
    @Index()
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
    updatedAt: Date;
}

export default User;
