import axios from "axios";
import getApi from "../api";

export const setMaster = (props) => async (dispatch) => {
  const { payload, dispatch_key, key, ret } = props;
  let the_key = dispatch_key || key;

  try {
    dispatch({
      type: the_key,
      payload,
      ret: ret || {},
    });

    return "";
  } catch (err) {}
};

export const create = (props, callback) => async (dispatch) => {
  const {
    payload,
    dispatch_key,
    params,
    key,
    resetFields,
    query,
    new_state,
    update,
    replace,
    update_state,
    additional_dispatch,
  } = props;
  const gotApi = getApi("create", key, callback);
  let the_key = dispatch_key || key;

  let { api, config, ret } = gotApi;
  params &&
    params.forEach((element) => {
      api = api + "/" + element;
    });

  if (query) {
    api = api + "?" + query;
  }

  try {
    const default_config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(api, payload, config || default_config);

    dispatch({
      type: the_key,
      payload: res.data,
      update,
      new_state,
      update_state,
      replace,
      ret: ret || {},
    });

    if (additional_dispatch) {
      let entries = Object.entries(additional_dispatch);

      entries.forEach((entry) => {
        let config = {
          type: entry[0],
          payload: res.data,
          update,
          new_state,
          update_state,
          replace,
          ret: ret || {},
        };
        dispatch(config);
      });
    }
    resetFields && resetFields();

    const output = new Promise((resolutionFunc, rejectionFunc) => {
      resolutionFunc(res);
    });

    return output;
  } catch (err) {
    let output = err.response && err.response.data;

    return output;
  }
};

// create or update
export const read = (props, callback) => async (dispatch) => {
  const { key, params, dispatch_key, query, update, replace } = props;
  const gotApi = getApi("read", key, callback);
  let { api, ret } = gotApi;

  params &&
    params.forEach((element) => {
      api = api + "/" + element;
    });

  if (query) {
    api = api + query;
  }

  const default_config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let the_key = dispatch_key || key;
  try {
    const res = await axios.get(api, default_config);
    dispatch({
      type: the_key,
      payload: res.data,
      replace,
      update,
      ret: ret || {},
    });
    let output = new Promise((resolve) => resolve(res));

    return output;
  } catch (err) {
    let output = err.response && err.response.data;

    return output;
  }
};

export const read_one = (props, callback) => async (dispatch) => {
  const { key, params, dispatch_key, query } = props;
  const gotApi = getApi("read_one", key, callback);
  let { api } = gotApi;

  params &&
    params.forEach((element) => {
      api = api + "/" + element;
    });

  if (query) {
    api = api + query;
  }

  const default_config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let the_key = dispatch_key || key;

  try {
    const res = await axios.get(api, default_config);

    dispatch({
      type: the_key,
      payload: res.data,
      replace: true,
    });
    let output = new Promise((resolve) => resolve(res));

    return output;
  } catch (err) {
    let output = err.response && err.response.data;

    return output;
  }
};

// create or update
export const drop = (props, callback) => async (dispatch) => {
  const { key, params, dispatch_key } = props;
  const default_config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const gotApi = getApi("drop", key, callback);
  let { api } = gotApi;

  params.forEach((element) => {
    api = api + "/" + element;
  });
  let the_key = dispatch_key || key;

  try {
    const res = await axios.delete(api, default_config);
    dispatch({
      type: the_key,
      payload: res.data,
      drop: true,
    });

    return res;
  } catch (err) {
    let output = err.response && err.response.data;

    return output;
  }
};
