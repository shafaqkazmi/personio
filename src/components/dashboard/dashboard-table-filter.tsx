import { debounce } from "lodash";
import { useCallback, useState } from "react";
import {
  FilterProps,
  FilterType,
  Filter_Debounce_Timer,
} from "./dasboard-types";

export const DashboardTableFilter = ({
  initialFilter,
  initialFilterBy,
  handleSearchParams,
}: FilterProps) => {
  const [filter, setFilter] = useState(initialFilter);
  const [filterBy, setFilterBy] = useState(initialFilterBy);

  // eslint-disable-next-line 
  const debouncedHandler = useCallback(
    debounce(
      (nextValue) => handleSearchParams(nextValue, filterBy),
      Filter_Debounce_Timer
    ),
    []
  );

  const onFilterChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(value);
    debouncedHandler(value);
  };

  const onFilterTypeChange = ({ target: { value } }: any) => {
    setFilterBy(value);
    handleSearchParams(filter, value);
  };

  return (
    <div className="filter">
      <select value={filterBy} onChange={onFilterTypeChange}>
        <option value={FilterType.Name}>Name</option>
        <option value={FilterType.Status}>Status</option>
        <option value={FilterType.Position}>Position</option>
      </select>
      <input
        value={filter}
        type="text"
        placeholder="Filter by Name, Status, Position Applied"
        onChange={onFilterChange}
      />
    </div>
  );
};
