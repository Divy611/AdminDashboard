import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ImportCSV from '../Utility/importCSV';

export default function CPAEnrollments() {
  const history = useHistory();
  const handleButtonClick = () => {
    history.goBack();
  };
  return (
    <div className='p-5'>
      <div className="flex items-center justify-between">
        <button className="flex items-center" onClick={handleButtonClick}>
          <i className="fa-solid fa-chevron-left text-2xl"></i>
          <h1 className='text-3xl text-black font-semibold ml-3'>CPA Enrollments</h1>
          <div className="px-3">
            <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <h2 class="text-sm font-normal text-emerald-500">70 Confirmed</h2>
            </div>
          </div>
          <div className="px-3">
            <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100">
              <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
              <h2 class="text-sm font-normal text-red-500">20 Cancelled</h2>
            </div>
          </div>
          <div className="px-3">
            <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100">
              <span class="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
              <h2 class="text-sm font-normal text-yellow-500">10 Refunded</h2>
            </div>
          </div>
        </button>
      </div>
      <ImportCSV filePath={process.env.PUBLIC_URL + "/Data/CPAEnrollments.csv"} removeCol1={"Amount Paid"} removeCol2={"Subject Name"} removeCol3={"Payment Option"} removeCol4={"Address"} />
    </div>
  )
}
