import React from 'react';
import Navbar from '../Navbar/';
import Adverts from '../Adverts';

function MyAdverts({ user }) {
  return (
    <>
      <Navbar />
      <Adverts nickname={user.nickname} myadverts={true} />
    </>
  )
}
    
export default MyAdverts;