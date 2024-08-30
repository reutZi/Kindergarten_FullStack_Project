import React from 'react';
import '../style/sideBar.css';
import '../style/App.css';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();  // Define navigate using the hook

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); 
        navigate('/');  // Navigate to the home or login page after logout
    };

    const sidebarOptions = [
        { to: `/parent/chooseKid`, imgSrc: require('../img/chooseKid.png'), title: 'משתמש' },
        { to: `${user.role}/attendance`, imgSrc: require('../img/attendance.png'), title: 'נוכחות' },
        { to: `noticeBoard`, imgSrc: require('../img/noticeBoard.png'), title: 'הודעות' },
        { to: `whatsNew`, imgSrc: require('../img/whatsnew.png'), title: '?מה חדש' },
        { to: `#`, imgSrc: require('../img/logout.png'), title: 'התנתקות', onClick: handleLogout }
    ];

    return (
        <div className="sidebar flex flex-col md:flex-col">
            <img className="logo-img nav-link" src="/client/img/logo.png" alt="" />
            {sidebarOptions.map((option, index) => (
                option.onClick ? (
                    <div onClick={option.onClick} key={index} className="option nav-link flex flex-col items-center md:flex-row">
                        <img src={option.imgSrc} alt="" />
                        <span className="option-title">{option.title}</span>
                    </div>
                ) : (
                    <Link to={option.to} key={index} className="option nav-link flex flex-col items-center md:flex-row">
                        <img src={option.imgSrc} alt="" />
                        <span className="option-title">{option.title}</span>
                    </Link>
                )
            ))}
        </div>
    );
};

export default NavBar;
