import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Assets from './assets.entity';
import Earning from './earning.entity';
import Expenditure from './expenditure.entity';

@Entity({
  name: 'detail',
})
class Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'date',
    type: 'date',
  })
  date: string;

  @Column({
    name: 'amount',
    type: 'float',
    comment: '金额',
  })
  amount: number;

  @Column({
    name: 'description',
    type: 'char',
    length: '200',
    comment: '描述',
  })
  description: string;
}

@Entity()
export class AssetsDetail extends Detail {
  @OneToOne(() => Assets, (assets) => assets.id)
  @Column({
    name: 'assetsId',
  })
  assetsId: number;
}

@Entity()
export class EarningDetail extends Detail {
  @OneToOne(() => Earning, (earning) => earning.id)
  @Column({
    name: 'earningId',
  })
  earningId: number;
}

@Entity()
export class ExpenditureDetail extends Detail {
  @OneToOne(() => Expenditure, (expenditure) => expenditure.id)
  @Column({
    name: 'expenditureId',
  })
  expenditureId: number;
}

export default [AssetsDetail, EarningDetail, ExpenditureDetail];
