import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { FilterProps, FilterType, Filter_Debounce_Timer } from "./dasboard-types";

export const DashboardTableFilter = ({ handleSearchParams }: FilterProps) => {
  const [filter, setFilter] = useState('');
  const [filterBy, setFilterBy] = useState(FilterType.Name);

  const onFilterChange = (event: any) => {
    setFilter(event.target.value);
    handleSearchParams(event.target.value, filterBy);
  };

  const onFilterTypeChange = (event: any) => {
    setFilterBy(event.target.value);
    handleSearchParams(filter, event.target.value);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(onFilterChange, Filter_Debounce_Timer),
    []
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  return (
    <div className="filter">
      <select defaultValue={filterBy} onChange={onFilterTypeChange}>
        <option value={FilterType.Name}>Name</option>
        <option value={FilterType.Status}>Status</option>
        <option value={FilterType.Position}>Position</option>
      </select>
      <input
        type="text"
        placeholder="Filter by Name, Status, Position Applied"
        onChange={debouncedChangeHandler}
      />
    </div>
  );
};
