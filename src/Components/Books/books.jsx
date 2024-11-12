import React from 'react'
import { DashboardHeader } from '../Header/header'
import ImportCSV from '../Utility/importCSV'

export default function Books() {
    return (
        <>
            <DashboardHeader title={"Books Inventory"} />
            <h2 className="px-4 text-xl">Total entries: 7</h2>
            <ImportCSV filePath={process.env.PUBLIC_URL + "/Data/Books.csv"} />
        </>
    )
}
