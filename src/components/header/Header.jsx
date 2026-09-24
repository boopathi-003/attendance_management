import Dropdown from 'react-bootstrap/Dropdown';
import lock from '../../assets/lock.png';
import logout from '../../assets/logout.png';
import profilepic from '../../assets/profilepic.png';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import logo from '../../assets/logo.png';
const Header = (props) => {
    let name = props.userName;
    const navigate = useNavigate();

    const log = () => {
        sessionStorage.removeItem('token');

        setTimeout(() => {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Successfully Logged out",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
        }, 3000);
        navigate('/login');
    }

    return (
        <div className=' header d-flex justify-content-end align-items-center  rounded p-2 mx-3'>
             <div className='col-2 text-start'>
                <img src={logo} alt="logo" height="50" className='w-25 ' />
             </div>
             <div className='col-10 d-flex justify-content-end'>
                <Dropdown>
                    <Dropdown.Toggle 
                        variant="bg-secondary border-primary rounded-5 py-1 mb-2 mt-2 bg-white bg-opacity-10" 
                        id="dropdown-basic"
                        className="d-flex align-items-center"
                    >
                        <img 
                            className="rounded-circle p-0 mx-2" 
                            src={profilepic} 
                            width={30} 
                            height={30} 
                            alt='Profile'
                        /> 
                        <span className="d-none d-md-inline">{name}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="white shadow border-white m-0 p-0">
                        <Dropdown.Item as='span'>
                            <img className="" src={profilepic} width={18} height={18} alt='Profile' />
                            <Link className='text-decoration-none text-dark' to='/myprofile'>My profile</Link>
                        </Dropdown.Item>
                        <Dropdown.Item as="span">
                            <img className="" src={lock} width={18} height={18} alt='Change Password' /> Change Password
                        </Dropdown.Item>
                        <Dropdown.Item as="span">
                            <Button variant='none p-0' onClick={log}>
                                <img className="" src={logout} width={18} height={18} alt='Logout' /> Logout
                            </Button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
             </div>
        </div>
    );
}

export default Header;
