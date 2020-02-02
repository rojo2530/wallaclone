import { connect } from 'react-redux';
import { setUser, createUser } from '../../store/actions';
import { isUserAuth } from '../../store/selectors';
import Register from './Register';

function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
    newUser: user => dispatch(createUser(user))
  }
}

function mapStateToProps(state) {
  return {
    isAuth: isUserAuth(state.user),
    isFetching: state.ui.isFetching,
    error: state.ui.error,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);