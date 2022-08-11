import { ICandidate } from "../../interface/candidate";

export const Filter_Debounce_Timer = 300;

export enum FilterType {
  Name = "name",
  Status = "status",
  Position = "position",
}

export enum SortBy {
  PositionApplied = "positionApplied",
  YearOfExperience = "yearOfExperience",
  ApplicationDate = "applicationDate",
}

export type FilterProps = {
  handleSearchParams: (filter: string, filterBy: string) => void;
};

export type IColumns = {
  value: string;
  key: string;
  hasCss?: boolean;
};

export type IDashboardTable = {
  columns: IColumns[];
  rowData: ICandidate[];
  handleSortSearchParams: (sort: string) => void;
};
