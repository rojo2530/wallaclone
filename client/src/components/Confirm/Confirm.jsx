import React from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import api from '../../utils/api';



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
            console.log('Super props', this.props.id)
            deleteOne(this.props.id)
              .then(res => this.props.loadAdverts())
              .catch(err => console.log(err));  
          }
        },

        {
          label: 'No',
        }
      ]
    });
  };
 
  render() {
    console.log('PROPS:', this.props);
    return (
        <button onClick={this.submit}>Delete</button>
    );
  }
}

export default Confirm;