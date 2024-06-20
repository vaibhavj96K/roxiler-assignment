import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Statistics from "./component/Statistics";
import Chart from "./component/Chart";
import months from "./data";
function App() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [search, setSeach] = useState("");
  const [page, setPage] = useState(1);

  const debaounce = (fn) => {
    let timer;

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, 1000);
    };
  };

  function handleChnage(e) {
    setSeach(e.target.value);
  }
  let debouncedFun = debaounce(handleChnage);

  async function getData() {
    let data = await fetch(
      `http://localhost:4000/api/v1/combine?searchh=${search}&month=${selectedMonth}&${page}`
    );

    let respose = await data.json();
    setData(respose);
  }

  function handleMonthChange(e) {
    setSelectedMonth(e.target.value);
  }

  useEffect(() => {
    getData();
  }, [search, selectedMonth]);

  return (
    <div className="min-h-screen bg-gray-100 p-6  flex justify-center items-center">
      <div className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <div className="mb-8">
          <p className="text-2xl font-bold text-center mb-4">
            Transaction Dashboard
          </p>
        </div>
        <div className="mb-6 flex w-[80%] flex-col md:flex-row justify-between items-center">
          <input
            type="text"
            placeholder="Search Transaction"
            onChange={debouncedFun}
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded mb-4 md:mb-0"
          />
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="w-full md:w-1/4 p-2 border border-gray-300 rounded"
          >
            {months.map((month, i) => (
              <option key={i}>{month}</option>
            ))}
          </select>
        </div>
        {/* **********tabel Head************** */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Id</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Sold</th>
              </tr>
            </thead>
            {/* **********tabel Body************** */}
            {data.products ? (
              <tbody className="text-gray-600 text-sm  font-semibold">
                {data.products.map((prod, ind) => (
                  <tr
                    key={ind}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {ind + 1}
                    </td>
                    <td className="py-3 px-6 text-left">{prod?.title}</td>
                    <td className="py-3 px-6 text-left">{prod?.description}</td>
                    <td className="py-3 px-6 text-left">
                      {prod?.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-left">{prod?.category}</td>
                    <td className="py-3 px-6 text-left">
                      {prod?.sold ? "sold" : "unsold"}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <h1>No data</h1>
            )}
          </table>
        </div>
        <Statistics data={data} selectedMonth={selectedMonth} />

        <Chart data={data} selectedMonth={selectedMonth} />
      </div>
      <div></div>
    </div>
  );
}

export default App;
