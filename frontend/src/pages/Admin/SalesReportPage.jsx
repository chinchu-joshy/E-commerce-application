import React from 'react'
import Home from '../../components/admin/Home'
import SalesReport from '../../components/admin/SalesReport'
import SalesReportDefault from '../../components/admin/SalesReportDefault'

function SalesReportPage() {
    return (
        <div>
            <Home/>
            {/* <SalesReport/> */}
            <SalesReportDefault/>
        </div>
    )
}

export default SalesReportPage
