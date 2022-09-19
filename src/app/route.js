import React, { useEffect } from "react";
// config
import { Routes, Route } from "react-router-dom";

import { connect } from "react-redux";
// pages
import Users from "../screens/Users";

export const App = (props) => {
  const initialFetch = async () => {};
  useEffect(() => {
    initialFetch();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Users {...props} />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
