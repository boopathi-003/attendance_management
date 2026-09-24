import React, { useState } from 'react';
import { Button, Card, CardBody, Spinner, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserModal from '../modals/UserModal';
import '../../css/UserTable.css';

const UserTable = ({ records, firstIndex, isLoading, onDeleteUser }) => {
    const [show, setShow] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteConfirmation = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onDeleteUser(userId);
                Swal.fire('Deleted!', 'The user has been deleted.', 'success');
            }
        });
    };

    return (
        <>
            {isLoading ? (
                <h4 className="d-flex text-danger mt-5 justify-content-center align-items-center vh-100">
                    <Spinner animation="border" />
                </h4>
            ) : (
                <div className="table-responsive t1 shadow rounded-2 bg-white p-0 m-0">
                    <Card className="p-0 m-0 border border-white">
                        <CardBody className="p-0 m-0">
                            <Table bordered variant="border border-white" className="text-center mb-0">
                                <thead className="sticky-top shadow-sm">
                                    <tr className="table-header text-center">
                                        {['S.No', 'Name', 'UserId', 'Roll', 'Department', 'isActive', 'Actions'].map((field) => (
                                            <th key={field} className="text-info text-opacity-75 bg-opacity-100 rounded fs-6 fw-semibold p-2">
                                                {field}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.length > 0 ? (
                                        records.map((user, index) => (
                                            <tr key={index} className="table-data border-bottom">
                                                <td className="text-center text-secondary text-nowrap">{firstIndex + index + 1}</td>
                                                <td className="text-center text-secondary text-nowrap">{user.name}</td>
                                                <td className="text-center text-secondary text-nowrap">{user.userId}</td>
                                                <td className="text-center text-secondary text-nowrap">{user.roll}</td>
                                                <td className="text-center text-secondary text-nowrap">{user.department}</td>
                                                <td className="text-center">
                                                    <span className={user.isActive ? 'isactive' : 'inactive'}>
                                                        {user.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <Button
                                                        onClick={() => {
                                                            handleShow();
                                                            setSelectedUserId(user.userId);
                                                        }}
                                                        variant="none px-sm-1 px-0"
                                                    >
                                                        <h6 className="text-primary bg-light rounded-2 px-2 py-1 shadow-sm">view</h6>
                                                    </Button>

                                                    <UserModal
                                                        show={show}
                                                        handleClose={handleClose}
                                                        userId={selectedUserId}
                                                        onDelete={(userId) => onDeleteUser(userId)} 
                                                    />
                                                    {sessionStorage.getItem('role') === 'admin' && (
                                                        <Button
                                                            variant="none px-sm-1 px-0"
                                                            onClick={() => handleDeleteConfirmation(user.userId)}
                                                        >
                                                            <i className="bi bi-trash text-danger bg-light rounded-2 shadow-sm"></i>
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="text-center text-danger">
                                                No matches found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
            )}
        </>
    );
};

export default UserTable;
