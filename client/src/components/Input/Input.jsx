import React, {useContext} from "react";
import { MyContext } from '../hoc/withFormHandle';
import PropTypes from 'prop-types';

const Input = ({name, ...props}) => {
  const context = useContext(MyContext);
  return (
    <input value={context.value[name]} name={name} onChange={context.onChange} {...props} />
  )
}

export default Input;

Input.propTypes = {
 name: PropTypes.string.isRequired,
}