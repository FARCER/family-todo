import { EFilterType } from '../enum/filter-type.enum';

export interface IGetDataRequest {
  table: string;
  columns: string;
  filterType: EFilterType;
  filterField: string;
  customFilterField?: string;
}
