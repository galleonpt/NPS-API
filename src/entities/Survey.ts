import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('surveys')
class Survey{
  @PrimaryGeneratedColumn('uuid')
  readonly id:string;
  
  @Column()
  title:string;
  
  @Column()
  description:string;
  
  @CreateDateColumn()
  created_at:Date;
  
}

export { Survey }