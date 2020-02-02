import React from "react";
import withFormHandle from '../hoc/withFormHandle';

const Form = ({children, ...props}) => {
    return (
      <form {...props}>
        {children} 
      </form>
    )
}

export default withFormHandle(Form);