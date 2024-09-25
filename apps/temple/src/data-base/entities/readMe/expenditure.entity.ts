import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExpenditureDetail } from './detail.entity';

@Entity({
  name: 'expenditure',
})
export default class Expenditure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'date',
    type: 'date',
  })
  date: string;

  @Column({
    name: 'clothes',
    type: 'float',
    comment: '衣物',
  })
  clothes: number;

  @Column({
    name: 'communication',
    type: 'float',
    comment: '通讯',
  })
  communication: number;

  @Column({
    name: 'elder',
    type: 'float',
    comment: '长辈相关',
  })
  elder: number;

  @Column({
    name: 'food',
    type: 'float',
    comment: '食',
  })
  food: number;

  @Column({
    name: 'health',
    type: 'float',
    comment: '医疗',
  })
  health: number;

  @Column({
    name: 'house',
    type: 'float',
    comment: '房屋',
  })
  house: number;

  @Column({
    name: 'sociality',
    type: 'float',
    comment: '社交',
  })
  sociality: number;

  @Column({
    name: 'transport',
    type: 'float',
    comment: '交通',
  })
  transport: number;

  @Column({
    name: 'others',
    type: 'float',
    comment: '其他消费',
  })
  others: number;

  @Column({
    name: 'description',
    type: 'char',
    length: '200',
    comment: '描述',
  })
  description: string;

  @OneToMany(() => ExpenditureDetail, (detail) => detail.id)
  details: ExpenditureDetail['id'][];
}
