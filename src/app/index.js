import React from "react";
import { connect } from "react-redux";
import Route from "./route";
import "antd/dist/antd.min.css"; // or 'antd/dist/antd.less'
import getUserLocation from "../utils/window";
import { setMaster, read } from "../redux/actions/master";

let initialState = {};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  async componentDidMount() {
    // simply showing component did mount skills along with react hook skills.

    getUserLocation(this.props.setMaster);
  }

  render() {
    return <Route {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  read,
});
export default connect(mapStateToProps, { setMaster })(App);
