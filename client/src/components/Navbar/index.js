import { connect } from 'react-redux';
import { setUser } from '../../store/actions';
import Navbar from './Navbar';
import { isUserAuth } from '../../store/selectors';
import { withRouter } from 'react-router-dom';

function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
  }
}

function mapStateToProps(state) {
  return {
    isAuth: isUserAuth(state.user),
  }
}

export default connect(mapStateToProps
  , mapDispatchToProps)(withRouter(Navbar)); 