import React, { useCallback, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Button } from '@material-tailwind/react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, 
    Filler,
);

const BarGraph = () => {
    const initialInputValues = [0, 0, 0, 0, 0, 0, 0, 0];
    const [expenseValues, setExpenseValues] = useState(initialInputValues);
    const [profitValues, setProfitValues] = useState(initialInputValues);

    const handleChange = (index, event, setValues) => {
        const newValues = [...expenseValues];
        newValues[index] = event.target.value === "" ? "" : parseFloat(event.target.value);
        setValues(newValues);
    };

    const handleReset = () => {
        setExpenseValues(initialInputValues);
        setProfitValues(initialInputValues);
    };

    let ref = useRef(null);

    const downloadImage = useCallback(() => {
        const link = document.createElement("a");
        link.download =  "chart.png";
        link.href = ref.current.toBase64Image();
        link.click();
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Weekly Financial Chart',
            },
        },
    };

    const data = {
        labels: [
            'Week 1',
            'Week 2',
            'Week 3',
            'Week 4',
            'Week 5',
            'Week 6',
            'Week 7',
            'Week 8',
        ],
        datasets: [
            {
                label: 'Expenses Per Week (RM)',
                data: expenseValues,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Profit Per Week (RM)',
                data: profitValues,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <div style={{ width: '800px', height: '600px' }}>
                <Bar ref={ref} options={options} data={data}/>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '100px' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                    <h4>Expenses</h4>
                    {expenseValues.map((value, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <label style={{ marginRight: '10px' }}>Week {index + 1}:</label>
                            <input
                                type="number"
                                value={value}
                                onChange={(event) => handleChange(index, event, setExpenseValues)}
                                style={{ padding: '5px', width: '100px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                    ))}
                    </div>

                    <div style={{ marginLeft: "20px" }}>
                    <h4>Profit</h4>
                    {profitValues.map((value, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <label style={{ marginRight: '10px' }}>Week {index + 1}:</label>
                            <input
                                type="number"
                                value={value}
                                onChange={(event) => handleChange(index, event, setProfitValues)}
                                style={{ padding: '5px', width: '100px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                    ))}
                    </div>
                </div>

                <Button
                    onClick={handleReset} 
                    style={{
                        background: 'rgba(30,41,59,255)',
                        color: 'white',
                        marginBottom: '10px',
                        marginTop: '40px'
                    }}
                    className='px-8 py-2'
                >
                    Reset
                </Button>

                <Button
                    onClick={downloadImage} 
                    style={{
                        background: 'rgba(30,41,59,255)',
                        color: 'white',
                    }}
                    className='px-8 py-2'
                >
                    Download
                </Button>
            </div>
        </div>
    );
};

export default BarGraph;
