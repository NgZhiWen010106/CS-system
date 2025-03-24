import React, { useCallback, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Button } from '@material-tailwind/react';

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const PieGraph = () => {
    const initialLabels = [];
    const initialDataPoints = [];
    const [labels, setLabels] = useState(initialLabels);
    const [dataPoints, setDataPoints] = useState(initialDataPoints);
    const [newLabel, setNewLabel] = useState('');
    const [newDataPoint, setNewDataPoint] = useState('');

    const addDataPoint = () => {
        const newLabels = [...labels, newLabel];
        const newDataPoints = [...dataPoints, newDataPoint];
        setLabels(newLabels);
        setDataPoints(newDataPoints);
        setNewLabel('');
        setNewDataPoint('');
    };

    const resetData = () => {
        setLabels(initialLabels);
        setDataPoints(initialDataPoints);
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
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Budget Chart',
            },
        },
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Amount (RM)',
                data: dataPoints,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.2)',       // Red
                    'rgba(255, 165, 0, 0.2)',     // Orange
                    'rgba(255, 255, 0, 0.2)',     // Yellow
                    'rgba(0, 128, 0, 0.2)',       // Green
                    'rgba(0, 0, 255, 0.2)',       // Blue
                    'rgba(75, 0, 130, 0.2)',      // Indigo
                    'rgba(238, 130, 238, 0.2)',   // Violet
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',       // Red
                    'rgba(255, 165, 0, 1)',     // Orange
                    'rgba(255, 255, 0, 1)',     // Yellow
                    'rgba(0, 128, 0, 1)',       // Green
                    'rgba(0, 0, 255, 1)',       // Blue
                    'rgba(75, 0, 130, 1)',      // Indigo
                    'rgba(238, 130, 238, 1)',   // Violet
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <div style={{ width: '800px', height: '600px' }}>
                <Pie ref={ref} options={options} data={data} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <label>Item:</label>
                    <input type="text" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} style={{ padding: '5px', width: '100px', border: '1px solid #ccc', borderRadius: '4px', marginLeft: '40px' }} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <label>Amount:</label>
                    <input type="number" value={newDataPoint} onChange={(e) => setNewDataPoint(e.target.value)} style={{ padding: '5px', width: '100px', border: '1px solid #ccc', borderRadius: '4px', marginLeft: '15px' }} />
                </div>

                <Button
                    onClick={addDataPoint} 
                    style={{
                        background: 'rgba(30,41,59,255)',
                        color: 'white',
                        marginBottom: '50px'
                    }}
                    className='px-8 py-2'
                >
                    Add Data
                </Button>

                <Button
                    onClick={resetData} 
                    style={{
                        background: 'rgba(30,41,59,255)',
                        color: 'white',
                        marginBottom: '10px'
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

export default PieGraph;
