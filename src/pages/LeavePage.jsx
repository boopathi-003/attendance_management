import React, { useEffect, useState } from 'react'
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import Header from '../components/header/Header';
import Toggle from '../components/header/Toggle';
import SideBar from '../components/sidebar/SideBar';
import { useGetLeaveRecordQuery } from '../redux/ApiSlice';
import LeaveTable from '../components/table/LeaveTable';
import PlannedTable from '../components/table/PlannedTable';
import SickLeaveTable from '../components/table/SickLeaveTable';


const LeavePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState([]);

    const recordsPerPage = 8;
    const firstIndex = currentPage * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;

    const { data, isLoading, refetch } = useGetLeaveRecordQuery([]);


    useEffect(() => {
        refetch();
        if (data) {
            setFilteredData(data);
        }
    }, [data], refetch);
    data && console.log(data);

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

                    <Col lg={11} className=" p-0 m-0 px-2">
                                <Row className='px-2 mx-2 mb-3'>
                                    <Col lg={12} className='p-0 m-0 mb-lg-0 mb-3'>
                                      <h4 className='fw-bold text-center text-lg-start text-primary '>Leave Record</h4>
                                    </Col>
                                </Row>
                          <Row>
                            <Tabs defaultActiveKey="Absents" id="justify-tab-example"  className='p-2 fw-bold 'justify >
                                <Tab eventKey="Absents" title="Absents" className='text-nowrap text-primary '>
                                  <LeaveTable   records={records} firstIndex={firstIndex}  searchTerm={searchTerm}  handleSearch={handleSearch}  isLoading={isLoading} />
                                </Tab>
                                <Tab eventKey="Sick Leave" title="Sick Leave" className='text-nowrap'>
                                    <SickLeaveTable/>
                                </Tab>
                                <Tab eventKey="Planned Leave" title="Planned Leave" className='text-nowrap'>
                                    <PlannedTable/>
                                </Tab>             
                            </Tabs>
                            </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default LeavePage;
