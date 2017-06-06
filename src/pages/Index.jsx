import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class Index extends Component {
  render() {
    return (
      <div>
        Index
      </div>
    )
  }
}

Index.displayName = 'Index'

Index.propTypes = {

}

Index.defaultProps = {

}

export default connect(
  state => ({
    ...state
  }),
  dispatch => ({
    //...bindActionCreators(actions, dispatch),
  })
)(Index)