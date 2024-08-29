import React from 'react';
import NoticeBoard from '../NoticeBoard';


const Welcome = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
  <NoticeBoard user={user} />
  );
};

export default Welcome;
