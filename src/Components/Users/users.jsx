import React from 'react'
import { DashboardHeader } from '../Header/header'
import ImportCSV from '../Utility/importCSV'

export default function Users() {
    return (
        <>
            <DashboardHeader title={"Users"} />
            <h2 className="px-4 text-xl">Total entries: 5</h2>
            <div className='py-12'>
                <ImportCSV filePath={process.env.PUBLIC_URL + "/Data/Users.csv"} />
            </div>
        </>
    )
}
