import "./dashboard.css"
//import Chart from "react-google-charts";
import { Line, Bar } from 'react-chartjs-2'
import React, { useState, useEffect } from 'react'
import { DashboardHeader } from "../Header/header";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Chart as Charts, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Legend, Title, Tooltip, Filler } from 'chart.js'

Charts.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Legend, Title, Tooltip, Filler);

const datapoints = [20, 45, 5, 50, 45, 25, 30];
const datapoints1 = [70, 0, 55, 37, 50, 15, 30];
const datapoints2 = [10, 40, 15, 20, 5, 35, 30];
const yearLabels = ['2020', '2021', '2022', '2023', '2024'];
const weekLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const dailyLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const datasets = [
  { label: "ACCA", fill: true, data: datapoints, borderColor: "#660000", borderWidth: 0.75 },
  { label: "CPA", fill: true, data: datapoints1, borderColor: "#1E88E5", borderWidth: 0.75 },
  { label: "Skil", fill: true, data: datapoints2, borderColor: "#8db600", borderWidth: 0.75 },
];

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
      <DashboardHeader title={"Dashboard"}/>
      <div className="flex justify-end px-3 py-7">
        <select id="options" className='border border-black px-2 py-4 rounded-lg w-1/5' value={selectedOption} onChange={handleChange}>
          <option value="" className="block text-center p-4 text-xs text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Select Time Range</option>
          <option value="option1" className="block text-center p-4 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Last 7 Days</option>
          <option value="option1" className="block text-center p-4 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Last Week</option>
          <option value="option2" className="block text-center p-4 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Last Month</option>
          <option value="option3" className="block text-center p-4 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Last Year</option>
          <option value="option4" className="block text-center p-4 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">All Time</option>
          <option value="option4" className="block text-center p-4 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Custom</option>
        </select>
      </div>
      <section className="container px-5 py-7">
        <div className="flex flex-wrap -m-4">
          <EnrollmentTile title={"Total Enrollments"} number={100} path={'/total-enrollments'} />
          <EnrollmentTile title={"Skill Enrollments"} number={45} path={'/skill-dev-enrollments'} />
          <EnrollmentTile title={"ACCA Enrollments"} number={30} path={'/acca-enrollments'} />
          <EnrollmentTile title={"CPA Enrollments"} number={25} path={'/CPA-enrollments'} />
        </div>
      </section>
      {/* <LineChart /> */}
      <DualGraphs />
      <section className="py-3 px-3 flex"><UserLists /></section>
    </div>
  );
}

const EnrollmentTile = ({ title, number, path }) => {
  const history = useHistory();
  const handleButtonClick = () => {
    history.push(path);
  };
  return (
    <div className="xl:w-1/4 md:w-1/2 w-full">
      <button onClick={() => handleButtonClick()} className='flex justify-between items-center text-start w-full p-1'>
        <div className="px-5 py-7 w-full rounded-lg shadow-lg border border-gray-200 flex-col relative overflow-hidden items-center">
          <div className="flex justify-between items-center">
            <h2 className="text-lg w-1/2">{title}</h2>
            <h1 className='text-3xl font-semibold py-2'>{number}</h1>
          </div>
        </div></button>
    </div>
  )
}


const LineChart = () => {
  const [activeTab, setActiveTab] = useState('Daily');
  const openTab = (event, tabName) => {
    event.preventDefault();
    setActiveTab(tabName);
  };
  const dailyData = {
    fill: true,
    labels: dailyLabels,
    datasets: datasets,
    plugins: { legend: { display: true, position: 'top' }, },
  };
  const weeklyData = {
    fill: true,
    labels: weekLabels,
    datasets: datasets,
    plugins: { legend: { display: true, position: 'top' }, },
  };
  const monthlyData = {
    fill: true,
    labels: monthLabels,
    datasets: datasets,
    plugins: { legend: { display: true, position: 'top' }, },
  };
  const yearlyData = {
    fill: true,
    labels: yearLabels,
    datasets: datasets,
    plugins: { legend: { display: true, position: 'top' }, },
  };
  const value = 10;
  const maxValue = 20;
  const percentage = (value / maxValue) * 100;
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            if (tooltipItem.dataIndex === 0) {
              return `Used: ${value}`;
            } else {
              return `Remaining: ${maxValue - value}`;
            }
          },
        },
      },
      legend: { display: false, },
    },
    cutout: '70%',
  };
  return (
    <section className="py-12 px-3">
      <div className="w-full p-6 py-10 shadow-xl rounded rounded-xl border border-gray-200 flex items-center justify-between">
        <div className="w-2/3 justify-between px-12">
          <div className="flex border border-purple-800 rounded overflow-hidden mt-6 justify-center tab-bar">
            <button className={`tab-button py-1 px-3.5 w-full focus:outline-none ${activeTab === 'Daily' ? 'text-white bg-purple-800 font-medium' : ''}`} onClick={(event) => openTab(event, 'Daily')}>Daily</button>
            <button className={`tab-button py-1 px-3.5 w-full focus:outline-none ${activeTab === 'Weekly' ? 'text-white font-medium bg-purple-800' : ''}`} onClick={(event) => openTab(event, 'Weekly')}>Weekly</button>
            <button className={`tab-button py-1 px-3.5 w-full focus:outline-none ${activeTab === 'Monthly' ? 'text-white font-medium bg-purple-800' : ''}`} onClick={(event) => openTab(event, 'Monthly')}>Monthly</button>
            <button className={`tab-button py-1 px-3.5 w-full focus:outline-none ${activeTab === 'Yearly' ? 'text-white font-medium bg-purple-800' : ''}`} onClick={(event) => openTab(event, 'Yearly')}>Yearly</button>
          </div>
          <div className="tab-content" id="Daily" style={{ display: activeTab === 'Daily' ? 'block' : 'none' }}><Line data={dailyData} options={options} /></div>
          <div className="tab-content" id="Weekly" style={{ display: activeTab === 'Weekly' ? 'block' : 'none' }}><Line data={weeklyData} options={options} /></div>
          <div className="tab-content" id="Monthly" style={{ display: activeTab === 'Monthly' ? 'block' : 'none' }}><Line data={monthlyData} options={options} /></div>
          <div className="tab-content" id="Yearly" style={{ display: activeTab === 'Yearly' ? 'block' : 'none' }}><Line data={yearlyData} options={options} /></div>
        </div>
        <div className="w-1/3 flex-col px-6 py-1">
          <h1 className='text-2xl p-2'>Annual Projected Amount</h1>
          <div className="flex py-3 px-4 justify-between">
            <h2 className='text-xl text-purple-800 font-bold'>200000</h2>
            <h2 className='text-lg text-green-600 font-semibold'>20%</h2>
          </div>
          <div className="border-b border-purple-800"></div>
          <h1 className='text-2xl p-2'>Annual Actual Amount</h1>
          <div className="flex py-3 px-4 justify-between">
            <h2 className='text-xl text-purple-800 font-bold'>200000</h2>
            <h2 className='text-lg text-green-600 font-semibold'>20%</h2>
          </div>
          <div className="border-b border-purple-800"></div>
          <h1 className='text-2xl p-2'>Monthly Projected Amount</h1>
          <div className="flex py-3 px-4 justify-between">
            <h2 className='text-xl text-purple-800 font-bold'>200000</h2>
            <h2 className='text-lg text-green-600 font-semibold'>20%</h2>
          </div>
          <div className="border-b border-purple-800"></div>
          <h1 className='text-2xl p-2'>Monthly Actual Amount</h1>
          <div className="flex py-3 px-4 justify-between">
            <h2 className='text-xl text-purple-800 font-bold'>200000</h2>
            <h2 className='text-lg text-green-600 font-semibold'>20%</h2>
          </div>
          <div className="border-b border-purple-800"></div>
        </div>
      </div>
    </section>
  );
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
              {/* <Chart chartType="Bar" data={barData} options={options} /> */}
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
    // { name: "", amount: "₹1,00,000", enrollments: 15, photoURL: "" },
    // { name: "", amount: "₹1,00,000", enrollments: 15, photoURL: "" },
    // { name: "", amount: "₹1,00,000", enrollments: 15, photoURL: "" },
    // { name: "", amount: "₹1,00,000", enrollments: 15, photoURL: "" },
    // { name: "", amount: "₹1,00,000", enrollments: 15, photoURL: "" },
    // { name: "", amount: "₹1,00,000", enrollments: 15, photoURL: "" },
    // { name: "", amount: "₹1,00,000", enrollments: 15, photoURL: "" },
    // { name: "", amount: "₹1,00,000", enrollments: 15, photoURL: "" },
  ]
  const tasks = [
    { name: "Task 1", photoURL: "" },
    { name: "Task 2", photoURL: "" },
    { name: "Task 3", photoURL: "" },
    { name: "Task 4", photoURL: "" },
    { name: "Task 5", photoURL: "" },
    { name: "Task 6", photoURL: "" },
    { name: "Task 7", photoURL: "" },
    { name: "Task 8", photoURL: "" },
    { name: "Task 9", photoURL: "" },
    { name: "Task 10", photoURL: "" },
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
