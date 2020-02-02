import React from 'react';
import { Select } from 'antd';
import api from '../../utils/api';
import PropTypes from 'prop-types';
import CaptureError from '../CaptureError';

const { Option } = Select;
const { getTags } = api();

export default class SelectMultiple extends React.Component {
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
      tags: [...tags],
      loading: false
    })).catch(err => this.setState({ error: true, errorMessage: err.message}));
  }

  render () {
    const { tags, loading, error } = this.state;
    const { value, onChange } = this.props;
    if (loading) {
      return null;
    }
    if (error) {
      return <CaptureError message="Error fecthing tags" error={error} />
    }
    return (
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        value={value}
        onChange={onChange}
      >
        {tags.map(tag => (
          <Option key={tag}>{tag}</Option>  
        ))}  
      </Select>
    )
  }
}

SelectMultiple.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}