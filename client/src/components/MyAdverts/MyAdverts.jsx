import React from 'react';
import Navbar from '../Navbar/';
import Adverts from '../Adverts';

function MyAdverts(props) {
  return (
    <>
      <Navbar />
      <Adverts nickname={props.match.params.user} myadverts={true} />
    </>
  )
}
    
export default MyAdverts;