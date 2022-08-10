import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ICandidate } from "../../interface/candidate";

enum SortBy {
  PositionApplied = "positionApplied",
  YearOfExperience = "yearOfExperience",
  ApplicationDate = "applicationDate",
}

type IColumns = {
  value: string;
  key: string;
}

type IDashboardTable = {
  columns: IColumns[];
  rowData: ICandidate[];
  handleSortSearchParams: (sort: string) => void;
};

export const DashboardTable: React.FunctionComponent<IDashboardTable> = ({
  columns,
  rowData,
  handleSortSearchParams,
}) => {
  const [searchParams] = useSearchParams();
  const defaultSort = searchParams.get("sort") || "";
  const [sort, setSort] = useState(defaultSort);

  const onSortChange = (key: string) => {
    setSort(key);
    handleSortSearchParams(key);
  };

  const isSortAble = (key: string) =>
    Object.values(SortBy).includes(key as SortBy);

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map(({ value, key }) => (
            <th key={key}>
              <span>{value}</span>
              {isSortAble(key) && (
                <a
                  href=""
                  className={sort ? "sorted" : ""}
                  onClick={() => onSortChange(key)}
                >
                  sort
                </a>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowData.map((candidate: ICandidate, index) => (
          <tr key={index}>
            {columns.map(({ key }) => (
              <td key={key}>{candidate[key as keyof ICandidate]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
