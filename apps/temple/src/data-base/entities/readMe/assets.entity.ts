import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssetsDetail } from './detail.entity';

@Entity({
  name: 'assets',
})
export default class Assets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'date',
    type: 'date',
  })
  date: string;

  @Column({
    name: 'rmb',
    type: 'float',
    comment: '人民币',
  })
  rmb: number;

  @Column({
    name: 'hkDollar',
    type: 'float',
    comment: '港币',
  })
  hkDollar: number;

  @Column({
    name: 'dollar',
    type: 'float',
    comment: '美金',
  })
  dollar: number;

  @Column({
    name: 'description',
    type: 'char',
    length: '200',
    comment: '描述',
  })
  description: string;

  @OneToMany(() => AssetsDetail, (detail) => detail.id)
  details: AssetsDetail['id'][];
}
