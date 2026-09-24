import React from 'react';
import '../css/AdminDashBoard.css';
import { Row, Col } from 'react-bootstrap';
import Header from '../components/header/Header';
import SideBar from '../components/sidebar/SideBar.jsx';
import moment from 'moment';
import Toggle from '../components/header/Toggle';
import TotalEmployees from './TotalEmployees';
import Presents from './Presents';
import Absents from './Absents';
import SickLeave from './SickLeave';
import PlannedLeave from './PlannedLeave';
import UnPlannedLeave from './UnPlannedLeave.jsx';
import GetAttendance from './GetAttendance.jsx';


const AdminDashboard = () => {
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
        <>
            <Row className=" header-container p-0 m-0 mt-2">
                <Col className='col-12 mt-2 p-0 sticky-top'>
                    <Col lg={12} className="header border-bottom border-secondary shadow border-opacity-25 text-end p-0 bg-white d-none d-lg-block">
                        <Header />
                    </Col>
                    <Col sm={12} className="d-lg-none d-block p-0 m-0">
                        <Toggle />
                    </Col>
                </Col>
            </Row>

            <div className="dashboard-scrollable">
                <Row className="mt-4 mx-2">
                    <Col lg={1} className="d-none d-lg-block rounded-3">
                        <SideBar />
                    </Col>

                    <Col lg={11} className=" p-0 ">
                        <Row className="m-0 mx-2">
                            <Col lg={3} md={12} className="mb-2 mb-lg-0 px-2">
                                <div className="card date-time-card text-center h-100 bg-white border-white shadow-sm">
                                    <Row className="h-50 row-cols-2 ms-2 mt-2">
                                        <Col lg={6} md={6} sm={6} className='fs-4 text-start mt-1'>
                                            <p>Today</p>
                                        </Col>
                                        <Col lg={6} md={6} sm={6} className='text-end fs-1'>
                                            <i className="px-3 sun bi bi-brightness-high"></i>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h4 className="text-secondary text-opacity-50 mt-1 fs-6">{moment().format('LTS')}</h4>
                                        <h4 className="text-secondary text-opacity-50 text-center mb-4 ms-2">{moment().format("MMM Do YY")}</h4>
                                    </Row>
                                    <button 
                                        className="btn btn-primary mb-2 m-0  mx-2 " 
                                        onClick={() => document.getElementById('get-attendance').scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        View Attendance
                                    </button>
                                </div>
                            </Col>

                            <Col lg={9} md={12} className="d-flex flex-wrap justify-content-between px-1 px-lg-0 ">
                                <div className="d-flex flex-wrap w-100">
                                    {leaveTypes.map((leaveType, index) => (
                                        <div className="col-md-4 col-12 mb-0 px-lg-0 px-md-0 rounded-3 p-1" key={index}>
                                            <div className="card leave-card text-center bg-white py-1 mx-lg-1 mx-md-1 border-white shadow-sm">
                                                <Row className='mb-lg-4 mb-0'>
                                                    <h6 className='text-start ms-2 text-secondary text-opacity-50'>{leaveType.field}</h6>
                                                    <Col>
                                                        <div className="progress-circle mt-2 fs-5 text-start ms-2">{leaveType.component}</div>
                                                    </Col>
                                                    <Col>
                                                        <i className={`icon bi ${leaveType.icon} me-2 text-primary fs-4 text-opacity-75`}></i>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>

                        <Row id="get-attendance" className="mt-2 mx-2 h-50">
                            <Col lg={12} className='mt-2 px-0'>
                                <GetAttendance/>
                            </Col>
                    
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default AdminDashboard;
