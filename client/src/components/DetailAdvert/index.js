import DetailAdvert from './DetailAdvert';
import { connect } from 'react-redux';
import { fecthSingleAdvert } from '../../store/actions';

function mapStateToProps(state) {
  return {
    advert: state.currentAdvert,
    isFetching: state.ui.isFetching,
    error: state.ui.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadAdvert: id => dispatch(fecthSingleAdvert(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailAdvert)