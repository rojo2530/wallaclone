import { createAdvertPost, fecthSingleAdvert, editAdvertPost } from '../../store/actions';
import { connect } from 'react-redux';
import ManageAdvert from './ManageAdvert';

function mapStateToProps(state) {
  return {
    advert: state.currentAdvert,
    isFetching: state.ui.isFetching,
    error: state.ui.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newAdvert: advert => dispatch(createAdvertPost(advert)),
    loadAdvert: id => dispatch(fecthSingleAdvert(id)),
    editAdvert: (id, advert) => dispatch(editAdvertPost(id,advert)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdvert);