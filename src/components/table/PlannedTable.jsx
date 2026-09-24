import React, { useEffect, useState } from 'react'
import { useGetPlannedLeaveQuery } from '../../redux/ApiSlice'
import { Card, CardBody, CardHeader, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PlannedTable = () => {
    const { data = [], isLoading, refetch } = useGetPlannedLeaveQuery(); 
    const [plannedLeave, setPlannedLeave] = useState([]);

    useEffect(() => {
        refetch();
        if (data.length > 0) { 
            setPlannedLeave(data);
        }
    }, [data, refetch]);

    return (
        <div>
            <Card className='border-white shadow-sm m-0 p-0'>
                <CardHeader className='bg-white fs-4 text-primary'>Planned Leave</CardHeader>
                <CardBody>
                    <div className='table-responsive'>
                        <Table className=''>
                        <thead className='sticky-top shadow-sm'>
                        <tr className='table-header  text-center '>
                                {['S.No', 'UserName', 'UserId', 'Reason', 'Department', 'Roll'].map((header) => (
                                    <th key={header} className='p-2 m-0 text-info border-white'>{header}</th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                                {plannedLeave.length > 0 ? (
                                    plannedLeave.map((user, index) => (
                                        <tr key={index} className="table-data border-bottom">
                                            <td className="text-center text-secondary text-nowrap">{index + 1}</td>
                                            <td className="text-center text-secondary text-nowrap">
                                                <Link className="text-decoration-none text-secondary" to={`/userProfile/${user.user.name}`}>
                                                    {user.user.name}
                                                </Link>
                                            </td>   
                                            <td className="text-center text-secondary text-nowrap">{user.user.userId}</td>
                                            <td className="text-center text-secondary text-nowrap">{user.leaveReason}</td>
                                            <td className="text-center text-secondary text-nowrap">{user.user.department}</td>
                                            <td className="text-center text-secondary text-nowrap">{user.user.roll}</td>                                                          
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center text-danger">
                                            No matches found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default PlannedTable;
