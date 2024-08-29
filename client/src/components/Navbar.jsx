import React from 'react';
import '../style/sideBar.css';
import '../style/App.css';
import { Link } from 'react-router-dom';

const role = JSON.parse(localStorage.getItem('user')).role;

const NavBar = () => {

    const sidebarOptions = [
        { to: `/parent/chooseKid`, imgSrc: require('../img/chooseKid.png'), title: 'משתמש' },
        { to: `${role}/attendance`, imgSrc: require('../img/attendance.png'), title: 'נוכחות' },
        { to: `noticeBoard`, imgSrc: require('../img/noticeBoard.png'), title: 'הודעות' },
        { to: `whatsNew`, imgSrc: require('../img/whatsNew.png'), title: '?מה חדש' },
        { to: `/`, imgSrc: require('../img/logout.png'), title: 'התנתקות' }
    ];

    return (
        <div className="sidebar flex flex-col md:flex-col">
            <img className="logo-img nav-link" src="/client/img/logo.png" alt="" />
            {sidebarOptions.map((option, index) => (
                <Link onClick={option.onClick} to={option.to} key={index}>
                    <div className="option nav-link flex flex-col items-center md:flex-row">
                        <img src={option.imgSrc} alt="" />
                        <span className="option-title">{option.title}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default NavBar;
