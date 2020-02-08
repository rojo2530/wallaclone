import React from 'react';
import Navbar from '../Navbar/';

class AdvertsByuser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Props by user', this.props);
    return (
      <Navbar />
    )
  }

}

export default AdvertsByuser;