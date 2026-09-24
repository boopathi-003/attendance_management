
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import TotalEmployees from '../../pages/TotalEmployees';
import Presents from '../../pages/Presents';
import Absents from '../../pages/Absents';
import SickLeave from '../../pages/SickLeave';
import PlannedLeave from '../../pages/PlannedLeave';
import UnPlannedLeave from '../../pages/UnPlannedLeave.jsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LeaveChart = () => {
    const leaveTypes = [
        { component: <TotalEmployees />, field: 'Total Employees', icon: 'bi-people-fill', count: 12 },
        { component: <Presents />, field: 'Presents', icon: 'bi-check-lg', count: 19 },
        { component: <Absents />, field: 'Absents', icon: 'bi-cloud-slash', count: 3 },
        { component: <SickLeave />, field: 'Sick Leave', icon: 'bi-thermometer-high', count: 5 },
        { component: <PlannedLeave />, field: 'Planned Leave', icon: 'bi-clipboard2-check', count: 7 },
        { component: <UnPlannedLeave />, field: 'UnPlanned Leave', icon: 'bi-calendar-x', count: 10 }
    ];

    const chartData = {
        labels: leaveTypes.map(leaveType => leaveType.field),
        datasets: [
            {
                label: 'Leave Count',
                data: leaveTypes.map(leaveType => leaveType.count),
                backgroundColor: '#0d6efd',

            },
        ],
    };
    return (
        <div className="card border-0 shadow-sm ">
            <div className="card-body mb-4">
                <div className="chart-container bg-white">
                    <h6 className='text-center text-primary text-opacity-50 mb-4'>Leave Types Chart</h6>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                            barThickness: 10,
                            
                        }}
                    />
                </div>
            </div>
        </div>  
    );
};

export default LeaveChart;
