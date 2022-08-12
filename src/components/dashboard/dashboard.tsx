import { useSearchParams, useNavigate } from "react-router-dom";
import { AppConfig } from "../../config/app-config";
import { useFetch } from "../../hooks/use-fetch";
import { ICandidate } from "../../interface/candidate";
import { SortArrayByKey } from "../../utils/utils";
import { Error } from "../error/error";
import { Loader } from "../loader/loader";
import { FilterType, IColumns } from "./dasboard-types";
import { DashboardTable } from "./dashbaoard-table";
import { DashboardTableFilter } from "./dashboard-table-filter";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { data = [], loading, error } = useFetch({ url: AppConfig.defaultUrl });
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = decodeURI(searchParams.get("filter") || "").trim();
  const filterBy = searchParams.get("filterBy") || FilterType.Name;
  const sort = searchParams.get("sort") || "";

  const rowColumns: Array<IColumns> = [
    { value: "Name", key: "name" },
    { value: "Email", key: "email" },
    { value: "Age", key: "age" },
    { value: "Year of Experience", key: "yearOfExperience" },
    { value: "Position Applied", key: "positionApplied" },
    { value: "Applied On", key: "applicationDate" },
    { value: "Status", key: "status", hasCss: true },
  ];

  const handleSearchParams = (_filter: string, _filterBy: string) => {
    setSearchParams({ filter: _filter, filterBy: _filterBy, sort });
  };

  function handleSortSearchParams(_sort: string) {
    setSearchParams({ filter, filterBy, sort: _sort });
  }

  function sortedAndFilterData() {
    const filteredData = data.filter((candidate: ICandidate) => {
      switch (filterBy) {
        case FilterType.Name:
          return candidate.name.includes(filter);
        case FilterType.Position:
          return candidate.positionApplied.includes(filter);
        case FilterType.Status:
          return candidate.status.includes(filter);
        default:
          return true;
      }
    });

    if (sort) {
      return filteredData.sort((a: ICandidate, b: ICandidate) =>
        SortArrayByKey(a, b, sort)
      );
    }

    return filteredData;
  }

  return (
    <>
      <h1 className="breadcrumb" onClick={() => navigate("/")}>
        Applications
      </h1>
      {loading && <Loader />}
      {error && <Error />}
      {!loading && !error && (
        <>
          <div className="container">
            <DashboardTableFilter
              initialFilter={filter}
              initialFilterBy={filterBy}
              handleSearchParams={handleSearchParams}
            />
          </div>
          <div className="container">
            <DashboardTable
              initialSortBy={sort}
              columns={rowColumns}
              rowData={sortedAndFilterData()}
              handleSortSearchParams={handleSortSearchParams}
            />
          </div>
        </>
      )}
    </>
  );
};
