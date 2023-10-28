import { Account } from 'src/nemo/account/entity/account.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string; // You may want to hash this password in a real application.

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  // Add other properties as needed
}
