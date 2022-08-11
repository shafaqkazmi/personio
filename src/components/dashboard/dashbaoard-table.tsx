import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ICandidate } from "../../interface/candidate";
import { IDashboardTable, SortBy } from "./dasboard-types";

export const DashboardTable: React.FC<IDashboardTable> = ({
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
    <table>
      <thead>
        <tr>
          {columns.map(({ value, key }) => (
            <th key={key}>
              <span>{value}</span>
              {isSortAble(key) && (
                <button
                  className={`sort-by ${sort === key ? "selected" : ""}`}
                  onClick={() => onSortChange(key)}
                />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowData.map((candidate: ICandidate, index) => (
          <tr key={index}>
            {columns.map(({ key, hasCss }) => {
              const colValue = candidate[key as keyof ICandidate];
              return <td className={`${hasCss ? colValue : ""}`} key={key}>
              {colValue}
            </td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
