import TaskEntity from './task.entity';

import AssetsEntity from './readMe/assets.entity';
import DetailEntities from './readMe/detail.entity';
import EarningEntity from './readMe/earning.entity';
import ExpenditureEntity from './readMe/expenditure.entity';

export default [
  TaskEntity,
  AssetsEntity,
  EarningEntity,
  ExpenditureEntity,
  DetailEntities,
].flat(1);
