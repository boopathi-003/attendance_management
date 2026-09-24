import { useEffect, useState } from "react";
import { useGetLeaveRecordByIdQuery } from "../../redux/ApiSlice";
import { Button, Modal, Spinner } from "react-bootstrap";

const LeaveModals = ({ show, handleClose, leaveId}) => {

    const [leave, setLeave] = useState(null);
    const { data, isLoading, error } = useGetLeaveRecordByIdQuery(leaveId);
  
    console.log(data);
  
    useEffect(() => {
      if (data) {
        setLeave(data);
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
          ) : leave ? (
            <div className="py-3">
              <div className="mb-4 p-3 rounded-3">
                <p className="mb-2"><strong className="text-secondary">Name:</strong> <span className="ms-2">{leave.user?.name}</span></p>
                <p className="mb-2"><strong className="text-secondary">User ID:</strong> <span className="ms-2">{leave.user?.userId}</span></p>
                <p className="mb-0"><strong className="text-secondary">Date:</strong> <span className="ms-2">{leave.leaveDate}</span></p>
              </div>
            </div>
          ) : (
            <p className="text-center text-danger">No data found</p>
          )}
        </Modal.Body>
        <Modal.Footer className="border-white">
          <Button variant="light" className="shadow-sm" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" className="shadow-sm">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    
    );
  };
  
export default LeaveModals;