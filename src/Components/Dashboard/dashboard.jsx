import "./dashboard.css"
import { Line, Bar } from 'react-chartjs-2'
import { analytics } from 'firebase/analytics'
import React, { useState, useEffect } from 'react'
import { DashboardHeader } from "../Header/header"
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { Chart as Charts, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Legend, Title, Tooltip, Filler } from 'chart.js'

Charts.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Legend, Title, Tooltip, Filler);

export default function Dashboard() {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      history.push('/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [history]);
  return (
    <div style={{ fontFamily: "Noto Sans" }} className="w-full">
      <DashboardHeader title={"Dashboard"} />
      <section className="container px-5 py-7">
        <div className="flex flex-wrap -m-4">
          <MetricTile title={"Total Sales"} number={100} path={'/total-enrollments'} />
          <MetricTile title={"Sales this Month"} number={45} path={'/skill-dev-enrollments'} />
          <MetricTile title={"ACCA Enrollments"} number={30} path={'/acca-enrollments'} />
          <MetricTile title={"CPA Enrollments"} number={25} path={'/CPA-enrollments'} />
        </div>
      </section>
      <DualGraphs />
      <section className="py-3 px-3 flex"><UserLists /></section>
    </div>
  );
}

const MetricTile = ({ title, number, path }) => {
  const history = useHistory();
  const handleButtonClick = () => {
    history.push(path);
  };
  return (
    <div className="xl:w-1/4 md:w-1/2 w-full">
      <button onClick={() => handleButtonClick()} className='flex justify-between items-center text-start w-full p-1'>
        <div className="px-5 py-7 w-full rounded-lg shadow-lg border border-gray-200 flex-col relative overflow-hidden items-center">
          <div className="flex justify-between items-center">
            <h2 className="text-sm w-1/2">{title}</h2>
            <h1 className='text-3xl font-semibold py-2'>{number}</h1>
          </div>
        </div></button>
    </div>
  )
}


const DualGraphs = () => {
  const datapoints = [20000, 45000, 45000];
  const datapoints1 = [70000, 30000, 55000];
  const datapoints2 = [10000, 60000, 65000];
  const quarterLabels = ['Apr', 'May', 'Jun'];
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };
  const lineDatasets = [
    { label: "ACCA", fill: true, data: datapoints, borderColor: "#660000", borderWidth: 0.75 },
    { label: "CPA", fill: true, data: datapoints1, borderColor: "#1E88E5", borderWidth: 0.75 },
    { label: "Skill", fill: true, data: datapoints2, borderColor: "#8db600", borderWidth: 0.75 },
  ];
  const barDatasets = [
    { label: "ACCA", fill: true, data: datapoints, borderColor: "#660000", backgroundColor: "#660000" },
    { label: "CPA", fill: true, data: datapoints1, borderColor: "#1E88E5", backgroundColor: "#1E88E5" },
    { label: "Skill", fill: true, data: datapoints2, borderColor: "#8db600", backgroundColor: "#8db600" },
  ];
  const lineData = {
    fill: true,
    labels: quarterLabels,
    datasets: lineDatasets,
    plugins: {
      legend: { fill: false, display: true, position: 'bottom' },
    },
  };
  const barData = {
    fill: true,
    labels: quarterLabels,
    datasets: barDatasets,
    plugins: {
      legend: { fill: false, display: true, position: 'bottom' },
    },
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'bottom' },
    },
  };
  return (
    <section class="px-5 py-8 mx-auto">
      <div class="flex flex-wrap -m-4">
        <div class="p-2 md:w-1/2 w-full">
          <div class="h-full border border-gray-300 p-8 rounded-xl">
            <div className="flex justify-between">
              <h1 className="p-2 text-xl text-black w-1/2">Sales Growth by Market Segment</h1>
              <div className="w-1/2">
                <select id="options" className='border border-gray-300 rounded-lg w-full py-3' value={selectedOption} onChange={handleChange}>
                  <option value="" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100 text-center">--Sort By--</option>
                  <option value="option1" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Daily</option>
                  <option value="option1" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Weekly</option>
                  <option value="option2" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Monthly</option>
                  <option value="option3" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Quarterly</option>
                  <option value="option4" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Yearly</option>
                  <option value="option4" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Custom</option>
                </select>
              </div>
            </div>
            <div className="h-[20vw] py-5">
              <Line data={lineData} options={options} />
            </div>
          </div>
        </div>
        <div class="p-2 md:w-1/2 w-full">
          <div class="h-full border border-gray-300 p-8 rounded-xl">
            <div className="flex justify-between">
              <h1 className="p-2 text-xl text-black">Sales per Rep</h1>
              <div className="w-1/2">
                <select id="options" className='border border-gray-300 rounded-lg w-full py-3' value={selectedOption1} onChange={handleChange1}>
                  <option value="" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100 text-center">--Sort By--</option>
                  <option value="option1" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Daily</option>
                  <option value="option1" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Weekly</option>
                  <option value="option2" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Monthly</option>
                  <option value="option3" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Quarterly</option>
                  <option value="option4" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Yearly</option>
                  <option value="option4" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Custom</option>
                </select>
              </div>
            </div>
            <div className="h-[20vw] py-5">
              <Bar data={barData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



const UserLists = () => {
  const sales_team = [
    { name: "Kashish Sahu", amount: "₹1,00,000", enrollments: 15, photoURL: "" },
    { name: "Anjali Singh", amount: "₹80,000", enrollments: 13, photoURL: "" },
  ]
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <section className="flex container py-3 mx-auto overflow-hidden">
      <div className="p-2 w-full">
        <div className="px-2 py-3 shadow-md rounded-xl border border-gray-200">
          <div className="flex justify-between items-center px-3 py-2">
            <h2 className="title-font font-semibold text-2xl text-gray-900 text-start p-5 w-1/2">Sales Team</h2>
            <div className="w-1/3">
              <select id="options" className='border border-gray-300 rounded-lg w-full py-3' value={selectedOption} onChange={handleChange}>
                <option value="" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100 text-center">--Sort By--</option>
                <option value="option1" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Daily</option>
                <option value="option1" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Weekly</option>
                <option value="option2" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Monthly</option>
                <option value="option3" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Quarterly</option>
                <option value="option4" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Yearly</option>
                <option value="option4" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform text-center hover:bg-gray-100">Custom</option>
              </select>
            </div>
          </div>
          <div className="h-[35vw] w-full py-12 scrollable-content overflow-auto items-center rounded-xl">
            <div className="flex justify-between px-10">
              <h1 className="text-center font-semibold text-end">Name</h1>
              <h1 className="text-center font-semibold text-end">Enrollments</h1>
              <h1 className="text-center font-semibold text-end">Amount</h1>
            </div>
            <ul>{sales_team.map((list, index) => (<MemberTile key={index} list={list} />))}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const MemberTile = ({ list }) => {
  return (
    <div className="p-2">
      <div className="px-8 py-4 border border-gray-50 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yellow-200 rounded-full"></div>
            <h1 className="text-md text-black px-4">{list.name}</h1>
          </div>
          <h1 className="text-md text-black px-4">{list.enrollments}</h1>
          <h1 className="items-center text-center text-sm font-bold transition-colors duration-300 transform" tabIndex="0">{list.amount}</h1>
        </div>
      </div>
    </div>
  )
}
