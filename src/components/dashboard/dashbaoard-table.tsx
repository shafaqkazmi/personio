import React, { useState } from "react";
import { ICandidate } from "../../interface/candidate";
import { IDashboardTable, SortBy } from "./dasboard-types";

export const DashboardTable: React.FC<IDashboardTable> = ({
  initialSortBy,
  columns,
  rowData,
  handleSortSearchParams,
}) => {
  const [sortBy, setSortBy] = useState(initialSortBy);

  function onSortChange(key: string) {
    setSortBy(key);
    handleSortSearchParams(key);
  }

  function isSortAble(key: string) {
    return Object.values(SortBy).includes(key as SortBy);
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ value, key }) => (
            <th key={key}>
              <span>{value}</span>
              {isSortAble(key) && (
                <button
                  className={`sort-by ${sortBy === key ? "selected" : ""}`}
                  onClick={() => onSortChange(key)}
                />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowData.length === 0 ? (
          <tr>
            <td style={{ border: 0 }} colSpan={columns.length}>
              No data found
            </td>
          </tr>
        ) : (
          rowData.map((candidate: ICandidate, index) => (
            <tr key={index}>
              {columns.map(({ key, hasCss }) => {
                const colValue = candidate[key as keyof ICandidate];
                return (
                  <td className={`${hasCss ? colValue : ""}`} key={key}>
                    {colValue}
                  </td>
                );
              })}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
