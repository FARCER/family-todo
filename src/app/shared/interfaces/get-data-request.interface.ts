import { EFilterType } from '../enum/filter-type.enum';

export interface IGetDataRequest {
  table: string;
  columns: string;
  filterField: string;
  filterType?: EFilterType;
  customFilterField?: string;
}
