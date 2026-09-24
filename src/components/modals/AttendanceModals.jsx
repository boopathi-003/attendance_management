import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useGetAttendanceByIdQuery } from '../../redux/ApiSlice';

const AttendanceModals = ({ show, handleClose, attendanceId}) => {

  const [attendance, setAttendance] = useState(null);
  const { data, isLoading, error } = useGetAttendanceByIdQuery(attendanceId);



  useEffect(() => {
    if (data) {
        console.log(data);
      setAttendance(data);
    }
  }, [data]);


  return (
    <Modal  size="sm" show={show} onHide={handleClose} backdrop={false} style={{backdropFilter: 'blur(2px)', border: '1px solid #0d6efd'}}>
      <Modal.Header closeButton className="border-white ">
        <Modal.Title className="text-primary">Attendance Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : attendance ? (
          <div className="py-3">
            <div className="mb-4 p-3 rounded-3 ">
              <form className="d-flex flex-column gap-2">
                {[
                  { label: 'Name', value: attendance.user?.name },
                  { label: 'User ID', value: attendance.user?.userId },
                  { label: 'Date', value: attendance.date },
                 
                 
                ].map((item, index) => (
                  <div key={index} className="form-group">
                    <label className="text-secondary fw-semibold">{item.label}</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      value={item.value || ''}
                      readOnly
                    />
                  </div>
                ))}
              </form>
            </div>
          </div>
        ) : (
          <p className="text-center text-danger">No data found</p>
        )}
      </Modal.Body>
      <Modal.Footer className="border-white">
        
        <Button variant="danger" className="shadow-sm">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  
  );
};

export default AttendanceModals;