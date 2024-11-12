import React from 'react'
import ImportCSV from '../Utility/importCSV'
import { DashboardHeader } from '../Header/header'
//import ProgramData from '../../Data/Programs.csv'

export default function Programs() {
  return (
    <div>
      <DashboardHeader title={"Programs"} />
      <h2 className="px-4 text-xl">Total entries: 17</h2>
      <div className="py-12">
        <ImportCSV filePath={process.env.PUBLIC_URL + "/Data/Programs.csv"} removeCol1="Start Date" removeCol2="End Date" />
      </div>
    </div>
  )
}
