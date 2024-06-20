import React from "react";

const Statistics = ({ data, selectedMonth }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-8">
        <div className="text-2xl font-bold mb-4">
          Statistics <span className="text-blue-500">{selectedMonth}</span>
        </div>
        <div className="grid gap-4">
          <div className="flex justify-between items-center bg-gray-200 p-4 rounded">
            <p className="text-lg">Total sell</p>
            <span className="text-xl font-semibold">
              {data?.totalSell?.totalSales}
            </span>
          </div>
          <div className="flex justify-between items-center bg-gray-200 p-4 rounded">
            <p className="text-lg">Total sold item</p>
            <span className="text-xl font-semibold">
              {data?.totalSell?.soldItems}
            </span>
          </div>
          <div className="flex justify-between items-center bg-gray-200 p-4 rounded">
            <p className="text-lg">Total not sold item </p>
            <span className="text-xl font-semibold ml-2">
              {" "}
              {data?.totalSell?.notSoldItems}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
