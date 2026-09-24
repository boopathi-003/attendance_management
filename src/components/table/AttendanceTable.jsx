import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../../css/AttendanceTable.css';

import AttendanceModal from '../modals/AttendanceModals';


const AttendanceTable = ({ records, handleDelete, firstIndex, searchTerm, handleSearch, isLoading }) => {

    const [show, setShow] = useState(false);
    const [selectedAttendanceId, setSelectedAttendanceId] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            {isLoading ? (
                <h4 className="d-flex text-danger mt-5 justify-content-center align-items-center vh-100">
                    <Spinner animation="border" />
                </h4>
            ) : (
                <>              
                <div className="t1 table-responsive shadow  rounded-2 bg-white p-0 m-0 ">
                    <Card className='p-0 m-0 border border-white'>
                    
                        <CardBody className='p-0 m-0'>
                            <Table bordered variant='border border-white' className="text-center">
                                <thead className='sticky-top shadow-sm'>
                                    <tr className='table-header text-nowrap'>
                                        {['S.No', 'Name', 'UserId', 'Date', 'Roll','Department', 'Record_In', 'Record_Out', 'Status', 'Working Hours', 'Actions'].map((field) => (
                                            <th key={field} className='text-info text-opacity-75  bg-opacity-100 rounded  fs-6 fw-semibold p-2'>{field}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {records.length > 0 ? (
                                        records.map((user, index) => (
                                            <tr key={index} className="table-data border-bottom">
                                                <td className="text-center text-secondary text-nowrap">{firstIndex + index + 1}</td>
                                                <td className="text-center text-secondary text-nowrap">
                                                    <Link className="text-decoration-none text-secondary" to={`/userProfile/${user.attendanceId}`}>
                                                        {user.user.name}
                                                    </Link>
                                                </td>   
                                                <td className="text-center text-secondary text-nowrap">{user.user.userId}</td>
                                                <td className="text-center text-secondary text-nowrap">{user.date}</td>
                                                <td className="text-center text-secondary text-nowrap">{user.user.roll}</td>
                                                <td className="text-center text-secondary text-nowrap">{user.user.department}</td>
                                                <td className="text-center text-secondary text-nowrap">{(user.user.record_in) === "-" ? "-" : user.recordIn}</td>
                                                <td className="text-center text-secondary text-nowrap">{(user.user.record_out) === "-" ? "-" : user.recordOut}</td>
                                                <td className="text-center text-nowrap">
                                                    {(user.status) === "absent" || (user.status) === "Sick Leave" || (user.status) === "Planned Leave" ? "A" : (user.status === "leave" ? "L" : "P")}
                                                </td>
                                                <td className="text-center text-secondary text-nowrap">{(user.user.record_in === "-" || user.user.record_out === "-") ? "0" : "8"}</td>
                                                <td className="text-center">
                                                    <Button onClick={() => {
                                                        handleShow();
                                                        setSelectedAttendanceId(user.attendanceId);
                                                    }} variant="none px-sm-1 px-0">
                                                        <h6 className='text-primary bg-light rounded-2 px-2 py-1 shadow-sm'>view</h6>
                                                    </Button>
                                                    <AttendanceModal 
                                                        show={show}
                                                        handleClose={handleClose}
                                                        attendanceId={selectedAttendanceId}
                                                        handleDelete={handleDelete}
                                                    />                                                                                              
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className="text-center text-danger">
                                                No matches found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
                </>
            )}
        </>
    );
};

export default AttendanceTable;
