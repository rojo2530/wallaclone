import { connect } from 'react-redux';
import { setFilter, fetchAdverts, setCurrentPage} from '../../store/actions';
import Adverts from './Adverts';

function mapStateToProps(state) {
  return {
    user: state.user,
    isFetching: state.ui.isFetching,
    error: state.ui.error,
    currentPage: state.currentPage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFilter: filter => dispatch(setFilter(filter)),
    loadAdverts: () => dispatch(fetchAdverts()),
    changePage: page => dispatch(setCurrentPage(page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Adverts);