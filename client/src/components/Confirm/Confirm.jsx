import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import api from '../../utils/api';
import PropTypes from 'prop-types';


const { deleteOne } = api();

class Confirm extends React.Component {
  submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteOne(this.props.id)
              .then(res => this.props.loadAdverts())
              .catch(err => console.log(err));
          },
        },

        {
          label: 'No',
        },
      ],
    });
  };

  render() {
    return <button onClick={this.submit}>Delete</button>;
  }
}

Confirm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Confirm;
