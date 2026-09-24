import React, { useEffect, useState } from 'react';
import {  useGetUsersQuery } from '../redux/ApiSlice';
import Header from '../components/header/Header';
import SideBar from '../components/sidebar/SideBar';
import { Row, Col} from 'react-bootstrap';
import '../css/GetUsers.css'
import PaginationComponent from '../components/pagination/Pagination';
import UserTable from '../components/table/Usertable';
import Toggle from '../components/header/Toggle';
import AddUser from '../components/modals/AddUser';

const GetUsers = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
 

    const recordsPerPage = 8;
    const firstIndex = currentPage * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;

    const { data, isLoading, refetch } = useGetUsersQuery([]);

    useEffect(() => {
        refetch();
        if (data) {
            setFilteredData(data);
        }
    }, [data, refetch]);
    data && console.log(data);

    const [filteredData, setFilteredData] = useState([]);

    const onDeleteUser = (userId) => {
      setFilteredData((prevData) => prevData.filter((user) => user.userId !== userId));
    };
   

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (data) {
            const filtered = data.filter((user) => (
                (user.name && user.name.toLowerCase().includes(value)) ||
                (user.userId && user.userId.toString().includes(value)) ||
                (user.roll && user.roll.toLowerCase().includes(value)) ||
                (user.department && user.department.toLowerCase().includes(value))
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
                        <Col />
                        <div className="">
                            <Row className="mx-1 justify-content-center m-0 p-0">
                                <Col lg={12} className="p-0 m-0 ">
                                    <Row className='p-0 mx-2 mb-3'>
                        
                                        <Col xl={4} lg={5} className='p-0 m-0 '>
                                            <div className="w-100 position-relative text-end mb-3">
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
                                        <Col  xl={8} lg={7} className='p-0 m-0 d-flex align-items-center justify-content-lg-end justify-content-center fs-lg-5 mb-lg-0 mb-3 fs-1 text-primary'>
                                            {sessionStorage.getItem('role') === 'admin' && <AddUser/>}
                                        </Col>
                                    </Row>
                                    <Row className='p-0 m-0 mx-2'>
                                        <Col className=" p-0 m-0">
                                            <UserTable
                                                records={records}
                                                firstIndex={firstIndex}
                                                searchTerm={searchTerm}
                                                handleSearch={handleSearch}
                                                isLoading={isLoading}
                                                onDeleteUser={onDeleteUser}
                                                
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                {/* Pagination */}
                                <Col lg={11} className="d-flex justify-content-center mt-3 mb-3">
                                    <PaginationComponent
                                        pageCount={TotalPages}
                                        handlePageClick={handlePageClick}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default GetUsers;

