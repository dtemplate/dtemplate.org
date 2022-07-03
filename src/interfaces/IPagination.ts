import { ITemplate } from './ITemplate';

export interface IPagination {
  templates: ITemplate[];
  total: number;
  page: number;
  limit: number;
  search: string;
  order: string;
}
