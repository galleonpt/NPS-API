import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
class User{
  @PrimaryGeneratedColumn('uuid')
  readonly id:string;
  
  @Column()
  name:string;
  
  @Column()
  email:string;
  
  @CreateDateColumn()
  created_at:Date;
  
}

export {User}