import React from "react";
export const MyContext = React.createContext();

export default function withFormHandle(FormComponent) {
  return class WithFormHandle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fields: {...props.initialValue},
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
      const { name, value } = e.target;
       this.setState(({ fields }) => ({
        fields: {
        ...fields,
        [name]: value
        }
      }));
    }

    handleSubmit(e) {
      e.preventDefault();
      this.props.onSubmit(this.state.fields);        
    }

    render() {
      return (
        <MyContext.Provider value={{ value: this.state.fields, onChange: this.handleChange }}>
          <FormComponent 
            {...this.props} 
            onSubmit={this.handleSubmit}
          />
        </MyContext.Provider>
      )
    }
  }
} 