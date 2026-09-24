import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import SideBar from '../sidebar/SideBar';
import logo from '../../assets/logo.png';

const Toggle = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='mx-lg-4 mx-3 p-1   rounded-3 row m-0 p-0 shadow-sm bg-white '>

            <div className='col-2 d-lg-none p-0 m-0'>
                <Button variant="white" onClick={handleShow}>
                    <BsList className="fs-1" />
                </Button>

                <Offcanvas className="w-50" show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <SideBar />
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
            <div className='col-10 d-flex  justify-content-end align-items-center p-0 '>
                <img src={logo} alt="logo" height="40" className="ms-2" />

            </div>
        </div>
    );
};

export default Toggle;
