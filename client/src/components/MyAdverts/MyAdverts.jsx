import React from 'react';
import Navbar from '../Navbar/';
import Adverts from '../Adverts';

function MyAdverts(props) {
  console.log('Myadverts' , props.match.params.user);
  return (
    <>
      <Navbar />
      <Adverts nickname={props.match.params.user} myadverts={true} />
    </>
  )
}
    
export default MyAdverts;