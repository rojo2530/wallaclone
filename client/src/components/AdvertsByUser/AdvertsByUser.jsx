import React from 'react';
import Navbar from '../Navbar/';
import Adverts from '../Adverts';
import PropTypes from 'prop-types';

function AdvertsByuser(props) {
  return (
    <>
      <Navbar />
      <Adverts nickname={props.match.params.user} />
    </>
  )
}
    
export default AdvertsByuser;

Adverts.propTypes = {
  nickname: PropTypes.string.isRequired
};