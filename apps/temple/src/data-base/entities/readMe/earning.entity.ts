import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EarningDetail } from './detail.entity';

@Entity({
  name: 'earning',
})
export default class Earning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'date',
    type: 'date',
  })
  date: string;

  @Column({
    name: 'wage',
    type: 'float',
    comment: '基本工资',
  })
  wage: number;

  @Column({
    name: 'partTimeIncome',
    type: 'float',
    comment: '兼职收入',
  })
  partTimeIncome: number;

  @Column({
    name: 'investmentIncome',
    type: 'float',
    comment: '投资收入',
  })
  investmentIncome: number;

  @Column({
    name: 'otherIncome',
    type: 'float',
    comment: '其它收入',
  })
  otherIncome: number;

  @Column({
    name: 'description',
    type: 'char',
    length: '200',
    comment: '描述',
  })
  description: string;

  @OneToMany(() => EarningDetail, (detail) => detail.id)
  details: EarningDetail['id'][];
}
