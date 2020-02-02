import { connect } from 'react-redux';
import { setUser } from '../../store/actions';
import { isUserAuth } from '../../store/selectors';

import Login from './Login';

function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
  }
}

function mapStateToProps(state) {
  return {
    isAuth: isUserAuth(state.user),
    isFetching: state.ui.isFetching,
    error: state.ui.error,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);