import { connect } from 'react-redux';
import MyAdverts from './MyAdverts';

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(MyAdverts); 
