import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export enum FilterType {
  Name = "name",
  Status = "status",
  Position = "position",
}

type AppProps = {
  handleSearchParams: (filter: string, filterBy: string) => void;
};

const Filter_Debounce_Timer = 300;

export const DashboardTableFilter = ({ handleSearchParams }: AppProps) => {
  const [filter, setFilter] = useState("");
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
