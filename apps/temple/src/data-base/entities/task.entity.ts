import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'task',
})
export default class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'type',
    length: 50,
  })
  type: Task.Type;

  @Column({
    name: 'detail',
    length: 200,
  })
  detail: Task.Detail;

  @Column({
    name: 'startDate',
    type: 'timestamp',
  })
  startDate: string;

  @Column({
    name: 'endDate',
    type: 'timestamp',
  })
  endDate: string;
}
