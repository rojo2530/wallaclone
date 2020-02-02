import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}
//Componente pasado a Hooks
export default function Loading ({ text = 'Loading', speed = 300}) {
  const [value, setValue] = useState(text); 

  useEffect(() => {
    const IntervalID = window.setInterval(() => {
      setValue(value => {
        return value === `${text}...`
          ? text
          : value + '.'
      })
    }, speed);

    return function cleanup() {
      window.clearInterval(IntervalID);
    }
  }, [text, speed]);

  return (
    <p style={styles.content}>
      {value}
    </p>
  )
}
//Dejo comentada el mismo componente hecho con Clase

// export default class Loading extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       content: this.props.text
//     }
//   }

//   componentDidMount() {
//     const { text, speed } = this.props;

//     this.interval = window.setInterval(() => {
//       this.state.content === text + '...'
//         ? this.setState({ content: text })
//         : this.setState(({ content }) => ({ content: content + '.' }))
//     }, speed)
//   }
  
//   componentWillUnmount () {
//     window.clearInterval(this.interval)
//   }

//   render() {
//     return (
//       <p style={styles.content}>
//         {this.state.content}
//       </p>
//     )
   
//   }
// }

Loading.propTypes = {
  text:PropTypes.string,
  speed: PropTypes.number
}

