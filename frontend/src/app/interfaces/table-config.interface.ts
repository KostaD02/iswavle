export interface TableConfig {
  isFilterAllowed: boolean;
  filterLabel: string;
  filterPlaceHolder: string;
  isPaginateAllowed: boolean;
  pageSizeOptions?: number[];
  paginatorLabel?: string;
  displayColumns: TableDisplayColumn[];
  data: any;
}

export interface TableDisplayColumn {
  name: string;
  displayName: string;
}