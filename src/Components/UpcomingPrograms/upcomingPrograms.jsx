import React from 'react'
import ImportCSV from '../Utility/importCSV'
import Header, { DashboardHeader } from '../Header/header'

export default function UpcomingPrograms() {
    return (
        <>
            <DashboardHeader title={"Upcoming Programs"} />
            <ImportCSV filePath={process.env.PUBLIC_URL + "/Data/UpcomingPrograms.csv"}/>
        </>
    )
}
