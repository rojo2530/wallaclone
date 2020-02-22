import React from 'react';
import Navbar from '../Navbar/';
import Adverts from '../Adverts';

function AdvertsByuser(props) {
  return (
    <>
      <Navbar />
      <Adverts nickname={props.match.params.user} />
    </>
  );
}

export default AdvertsByuser;
