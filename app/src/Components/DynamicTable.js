import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import "./DynamicTable.css";
import AddButton from "./AddButton";

const DynamicTable = ({ data, rowHeight, action, handleAction, ispanding, attendanceStatus }) => {
  if (!data || data.length === 0) {
    return <div>No data to display</div>;
  }

  const [siNo, setSiNo] = useState(1);

  useEffect(() => {
    // Update SI.No when data changes
    setSiNo(1);
  }, []);

  const hiddenColumns = ["id", "Status"];
  const columns = Object.keys(data[0]).filter(
    (column) => !hiddenColumns.includes(column)
  );

  return (
    <table className="min-w-full border-collapse">
      <thead className="table-cols">
        <tr>
          <th
            className={`h-[${rowHeight}px] py-2 px-4 text-center color-white bg-gray-200 border border-gray-300`}
          >
            SI.No
          </th>

          {columns.map((column) => (
            <th
              className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`}
              key={column}
            >
              {column}
            </th>
          ))}
          {action && (
            <th
              className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`}
            >
              Edit/Delete
            </th>
          )}
          {ispanding && (
            <th
              className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`}
            >
              Approve/disapprove
            </th>
          )}
          {attendanceStatus && (
            <th
              className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`}
            >
              Attendance Status
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className={`h-[${rowHeight}px]`}>
            <td className="py-2 px-4 border border-gray-300 text-center">
              {siNo + rowIndex}
            </td>
            {columns.map((column) => (
              <td
                className="py-2 px-4 border border-gray-300 text-center"
                key={column}
              >
                {row[column]}
              </td>
            ))}
            {action && (
              <td
                className={`h-[${rowHeight}px] py-2 px-4 border border-gray-300 text-center`}
              >
                <div className="flex items-center justify-around">
                  <FaEdit
                    onClick={() => handleAction("edit", row.id)} // Pass 'edit' action and document ID
                    className="cursor-pointer text-blue-500 mr-2"
                  />

                  <ImCross
                    onClick={() => handleAction("delete", row.id)}
                    className="w-5 h-5 cursor-pointer text-white mr-1 rounded-full bg-red-500 p-1"
                  />
                </div>
              </td>
            )}
            {ispanding && (
              <td
                className={`h-[${rowHeight}px] py-2 px-4 border border-gray-300 text-center`}
              >
                <div className="flex items-center justify-around">
                  <button
                    onClick={() => handleAction("approve", row.id)}
                    className="cursor-pointer text-white font-semibold rounded bg-green-500 px-3 py-1 mr-2"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleAction("disapprove", row.id)}
                    className="cursor-pointer text-white font-semibold rounded bg-red-500 px-3 py-1 mr-1"
                  >
                    Disapprove
                  </button>
                </div>

              </td>
            )}
            {attendanceStatus && (
              <td
                className={`h-[${rowHeight}px] py-2 px-4 border border-gray-300 text-center`}
              >
                <div className="flex items-center justify-around">
                  <button
                    onClick={() => handleAction("toggle", row.EmpId)}
                    className={`cursor-pointer text-white font-semibold rounded px-3 py-1 mr-2 ${row.Status ? "bg-green-500" : "bg-red-500"
                      }`}
                  >
                    {row.Status ? "Present" : "Absent"}
                  </button>

                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
