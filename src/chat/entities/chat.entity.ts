import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn()
  chat_id: number;

  @Column()
  user_id: number;

  @Column()
  recipientId: number;

  @Column({ type: 'varchar' })
  message: string;

  @ManyToOne(() => Chat, { nullable: true })
  @JoinColumn({ name: 'reply_to', referencedColumnName: 'chat_id' })
  reply_to: Chat;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
