import { UserRole } from "../../utils/enums/roles";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  @Column()
  password: string;
  @Column()
  age: number;

  @Column()
  username: string;

  @Column()
  role: UserRole;
}
