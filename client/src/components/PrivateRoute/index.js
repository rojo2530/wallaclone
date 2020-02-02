import { connect } from 'react-redux';
import { isUserAuth } from '../../store/selectors';
import PrivateRoute from './PrivateRoute';

function mapStateToProps(state) {
  return {
    isAuth: isUserAuth(state.user),
  }
}

export default connect(mapStateToProps)(PrivateRoute); 