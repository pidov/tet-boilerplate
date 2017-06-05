import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Index extends Component {
  render() {
    return (
      <Link to={`/mandate`}>Mandate</Link>  
    )
  }
}

Index.displayName = 'Index'

Index.propTypes = {
  
}

Index.defaultProps = {
  
}

export default Index
