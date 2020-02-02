import React from 'react';
import CaptureError from '../CaptureError';
import api from '../../utils/api';
import PropTypes from 'prop-types';
import { MyContext } from '../hoc/withFormHandle'

const { getTags } = api();

export default class SelectTagContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: '',
      loading: true,
      error: false, 
      errorMessage: ''
    }
  }

  componentDidMount() {
    getTags().then(tags => this.setState({
      tags: ['all', ...tags],
      loading: false
    })).catch(err => this.setState({ error: true, errorMessage: err.message}));
  }

  render () {
    const { tags, loading, error } = this.state;
    if (error) {
      return <CaptureError message="Error fecthing tags" error={error} />
    }
    if (loading) {
      return null;
    }
    const { name } = this.props;
    return (
      <div className="select width100">
        <select className="width100" value={this.context.value[name]} name={name} onChange={this.context.onChange} {...this.props}  >
          {tags.map(tagName => {
            return  <option key={tagName} value={tagName}>{tagName}</option>
          })}
        </select>
    </div>
    ) 
  }
}

SelectTagContext.propTypes = {
  name: PropTypes.string.isRequired,
}

SelectTagContext.contextType = MyContext;
