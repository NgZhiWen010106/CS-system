import React, { useEffect } from 'react'
import Layout from '../../../components/layout/Layout';
import BarGraph from '../barGraph/BarGraph';
import PieGraph from '../pieGraph/PieGraph';

function ExpenseTracker() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Layout>
            <div> 
                <BarGraph />

                {/* Line  */}
                <hr style={{ borderTop: '1px solid black', margin: '20px 0' }}/>

                <PieGraph />
            </div>
        </Layout>
    )
}

export default ExpenseTracker