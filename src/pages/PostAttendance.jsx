import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Toggle from '../components/header/Toggle';
import Header from '../components/header/Header';
import SideBar from '../components/sidebar/SideBar';

const PostAttendance = () => {
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

                    <Col lg={11} className='m-0 p-0'>
                      
                    </Col>
            </Row>
            </div>
            </>

    );
}

export default PostAttendance