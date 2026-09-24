import React, { useState } from 'react';
import { Button, Modal, ModalBody } from 'react-bootstrap';
import { useCreateUserMutation } from '../../redux/ApiSlice';
import Swal from 'sweetalert2';

const AddUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        userId: '',
        roll: '',
        department: ''
    });
    const [show, setShow] = useState(false);
    const [createUser] = useCreateUserMutation();
    const[isAdding,setIsAdding] = useState(false);

    const handleClose = () => {
        setShow(false);
        setFormData({ name: '', userId: '', roll: '', department: '' });
    };

    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.userId || !formData.roll || !formData.department) {
            console.error('All fields are required.');
            return;
        }
        createUser(formData)
            .unwrap()
            .then(() => {
                setIsAdding(true)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User Created Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.reload();
                handleClose();
            })
            .catch((error) => {
                setIsAdding(true)
                console.error('Error creating user:', error);
            });
    };

    return (
        <div>
            <Button className='shadow-sm rounded-2 py-2 px-3' onClick={handleShow}>
                <i className="mx-2 bi bi-person-plus-fill "></i>Add User
            </Button>

            <Modal
                size="sm"   
                show={show}
                className='rounded-3'
                onHide={handleClose}
                backdrop={false}
                style={{ backdropFilter: 'blur(2px)', border: '1px solid #f8f8f8' }}
                centered
            >
                <Modal.Header closeButton className="border-white">
                    <Modal.Title className="text-primary">Add New User</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <form className="d-flex flex-column gap-2">
                        {[
                            { id: 'name', label: 'Name', placeholder: 'Enter name', type: 'text' },
                            // { id: 'userId', label: 'User ID', placeholder: 'Enter user ID', type: 'number' },
                            { id: 'roll', label: 'Roll', placeholder: 'Enter roll', type: 'text' },
                            { id: 'department', label: 'Department', placeholder: 'Enter department', type: 'text' }
                        ].map((field) => (
                            <div key={field.id} className="form-group">
                                <label htmlFor={field.id} className="form-label">
                                    {field.label} <span className="text-danger">*</span>
                                </label>
                                <input
                                    type={field.type}
                                    className="form-control"
                                    id={field.id}
                                    name={field.id}
                                    value={formData[field.id]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    required
                                />
                            </div>
                        ))}
                    </form>
                </ModalBody>
                <Modal.Footer className="border-white" >
                 
                    <Button variant="primary " className="shadow-sm rounded-2" onClick={() => {handleSubmit(); handleClose();}} disabled={isAdding}>
                        {isAdding ? 'Adding...' : 'Add User'}
                     
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddUser;
