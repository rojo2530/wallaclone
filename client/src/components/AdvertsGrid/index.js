import { connect } from 'react-redux';
import AdvertsGrid from './AdvertsGrid';

function mapStateToProps(state) {
  return {
    adverts: state.adverts,
  }
}

export default connect(mapStateToProps)(AdvertsGrid);