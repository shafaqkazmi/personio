import { useSearchParams, useNavigate } from "react-router-dom";
import { AppConfig } from "../../config/app-config";
import { useFetch } from "../../hooks/use-fetch";
import { ICandidate } from "../../interface/candidate";
import { SortArrayByKey } from "../../utils/utils";
import { Loader } from "../loading/loading";
import { DashboardTable } from "./dashbaoard-table";
import { FilterType, DashboardTableFilter } from "./dashboard-table-filter";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, error, data = [] } = useFetch(AppConfig.defaultUrl);

  const filter = searchParams.get("filter") || "";
  const filterBy = searchParams.get("filterBy") || "";
  const sort = searchParams.get("sort") || "";

  const rowColumns = [
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

  const handleSortSearchParams = (_sort: string) => {
    setSearchParams({ filter, filterBy, sort: _sort });
  };

  const sortedAndFilterData = () => {
    const filteredData = data.filter((candidate: ICandidate) => {
      switch (filterBy) {
        case FilterType.Name:
          return candidate.status.includes(filter);
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
        SortArrayByKey(a, b, sort, "asc")
      );
    }

    return filteredData;
  };

  return (
    <>
      <h1 className="breadcrumb" onClick={() => navigate("/")}>
        Applications
      </h1>
      {loading && <Loader />}
      {error && <div>Error</div>}
      {!loading && !error && (
        <>
          <div className="container">
            <DashboardTableFilter handleSearchParams={handleSearchParams} />
          </div>
          <div className="container">
            <DashboardTable
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
