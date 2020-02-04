import React, { Component } from "react";
import CounterContainer from "../containers/CounterContainer";
import Buttons from "../components/Buttons";
import getRandomColor from "../lib/getRandomColor";

import * as actions from '../actions';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    const { onCreate, onRemove } = this.props;

    return (
      <div className="App">
        <Buttons onCreate={onCreate} onRemove={onRemove} />
        <CounterContainer />
      </div>
    );
  }
}

const mapToDispatch = (dispatch) => ({
  onCreate: () => dispatch(actions.create(getRandomColor())),
  onRemove: () => dispatch(actions.remove())
});

export default connect(null, mapToDispatch)(App);
