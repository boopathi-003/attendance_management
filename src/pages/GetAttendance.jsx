import React, { useEffect, useState } from 'react';
import { useDeleteAttendanceMutation, useGetAttendanceQuery } from '../redux/ApiSlice';

import { Col, Row } from 'react-bootstrap';

import AttendanceTable from '../components/table/AttendanceTable';
import PaginationComponent from '../components/pagination/Pagination';
import '../css/GetAttendance.css';
import Swal from 'sweetalert2';

const GetAttendance = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState([]);

    const recordsPerPage = 10;
    const firstIndex = currentPage * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;

    const { data, isLoading, refetch } = useGetAttendanceQuery([]);
    const [deleteAttendance] = useDeleteAttendanceMutation();

    useEffect(() => {
        refetch();
        if (data) {
            setFilteredData(data);
        }
    }, [data]);
    data && console.log(data);


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAttendance(id);
                setFilteredData(filteredData.filter((user) => user.id !== id));
                Swal.fire("Deleted!", "User has been deleted.", "success");
            }
        });
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (data) {
            const filtered = data.filter((attendance) => (
                (attendance.user && attendance.user.name && attendance.user.name.toLowerCase().includes(value)) ||
                (attendance.attendanceId && attendance.attendanceId.toString().includes(value)) ||
                (attendance.user && attendance.user.status && attendance.user.status.toLowerCase().includes(value))
            ));
            setFilteredData(filtered);
            setCurrentPage(0);
        }
    };

    const handlePageClick = (selected) => {
        setCurrentPage(selected.selected);
    };

    const records = filteredData && filteredData.length > 0 ? filteredData.slice(firstIndex, lastIndex) : [];
    const TotalPages = Math.ceil((filteredData ? filteredData.length : 0) / recordsPerPage);

    return (
        <div>

            <div className="">
                <Row className="mx-1 justify-content-center m-0 p-0">
                

                    <Col lg={12} className="p-0 m-0 ">

                        <Row className='p-0 mx-2 mb-3'>
                            <Col lg={6} className='p-0 m-0 d-flex align-items-center justify-content-lg-start justify-content-center  mb-lg-0 mb-3 fs-3 text-primary'>
                                Attendance Overview
                            </Col>

                            <Col lg={6} className='p-0 m-0 '>
                                <div className="w-100 position-relative text-end ">
                                    <i className="search bi bi-search text-secondary fs-3 position-absolute top-50 translate-middle-y"></i>
                                    <input
                                        className='searchbar  ps-5 border border-light shadow-sm rounded-4 p-3 '
                                        onChange={handleSearch}
                                        type="text"
                                        value={searchTerm}
                                        placeholder="Search for names..."
                                        title="Type in a name"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className='p-0 m-0 mx-2'>
                            <Col className="p-0 m-0" style={{ maxHeight: '400px', overflowY: 'scroll', overflowX: 'scroll' }}>
                                <AttendanceTable
                                    records={records}
                                    handleDelete={handleDelete}
                                    firstIndex={firstIndex}
                                    searchTerm={searchTerm}
                                    handleSearch={handleSearch}
                                    isLoading={isLoading}
                                />
                            </Col>
                        </Row>

                    </Col>

                    {/* Pagination */}
                    {/* <Col lg={11} className="d-flex justify-content-center mt-3 mb-3">
                        <PaginationComponent
                            pageCount={TotalPages}
                            handlePageClick={handlePageClick}
                        />
                    </Col> */}
                </Row>
            </div>
        </div>
    );
};

export default GetAttendance;
