import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../css/Sidebar.css';

const SideBar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const location = useLocation();

    const adminNavItems = [
        { icon: 'bi-columns-gap', label: 'Dashboard', path: '/admindashboard' },
        { icon: 'bi-card-checklist', label: 'Chat', path: '/leavechart' },
        { icon: "bi bi-people", label: 'user', path: '/user' },
        { icon: 'bi-check2-square', label: 'Attendance', path: '/attendance' }
    ];

    const userNavItems = [
        { icon: 'bi-columns-gap', label: 'Dashboard', path: '/userdashboard' },
        { icon: 'bi-card-checklist', label: 'Chat', path: '/leavechart' },
        { icon: "bi bi-people", label: 'user', path: '/user' }
    ];

    const navItems = sessionStorage.getItem('role') === 'admin' ? adminNavItems : userNavItems;

    useEffect(() => {
        const currentIndex = navItems.findIndex(item => item.path === location.pathname);
        if (currentIndex !== -1) {
            setActiveIndex(currentIndex);
        }
    }, [location.pathname]);

    return (
        <div className="sidebar sidebar-animation p-0 ">
            <div className="nav flex-column shadow rounded-2 bg-white ">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`navbars nav-link ${sessionStorage.getItem('role') === 'user' ? 'mb-2 mt-3' : 'mt-1'} 
                         text-primary fw-semibold d-flex align-items-center justify-content-center fs-3
                         ${  activeIndex === index ? 'active' : '' }`}
                        onClick={() => setActiveIndex(index)} >
                        <i className={`bi ${item.icon} me-2`}></i>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
