import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input } from 'semantic-ui-react'
import { getOneCat } from '../reducers/feline'


class Search extends Component {


render() {
  return(
<Form.Input
    value={this.state.searchVal}
    onChange={this.handleChange}
    name='search'
    placeholder='search' />
  )}
}
