import React from 'react';
import '../style/sideBar.css';
import '../style/App.css';
import { Link } from 'react-router-dom';

const role = JSON.parse(localStorage.getItem('user')).role;

const NavBar = () => {

    const sidebarOptions = [
        { to: `${role}/attendance`, imgSrc: require('../img/attendance.png'), title: 'נוכחות' },
        { to: `/calendar`, imgSrc: require('../img/calendar.png'), title: 'לוח שנה' },
        { to: `noticeBoard`, imgSrc: require('../img/noticeBoard.png'), title: 'הודעות' },
        { to: `whats_new`, imgSrc: require('../img/whatsnew.png'), title: '?מה חדש' },
        { to: `/`, imgSrc: require('../img/logout.png'), title: 'התנתקות' }
    ];
    
  return (
    <div className="sidebar">
      <img className="logo-img nav-link" src="/client/img/logo.png" alt="" />
      {sidebarOptions.map((option, index) => (
        <Link onClick={option.onClick} to={option.to} key={index}>
        <div className="option nav-link">
          <img src={option.imgSrc} alt="" />
          <span className="option-title">{option.title}</span>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
