export default function masterReducer(state, action) {
  const initialState = {
    [action.type]: [],
    loading: true,
  };
  state = state || initialState;

  // check if payload is an array or not.
  let output = action.payload;

  if (action.type === "reset_master") {
    return { ...state, current_profile: null, current_place: null };
  }
  if (!action.replace) {
    if (Array.isArray(action.payload)) {
      output = state[action.type] || [];

      if (action.update) {
        output = [...output];
        let keys = [];
        action.payload.forEach((item) => {
          keys.push(item.id);
        });
        let filtered = output.filter((item) => !keys.includes(item.id));
        output = [...action.payload, ...filtered];
      } else {
        output = [...action.payload, ...output];
      }
    }

    if (action.update_state && !Array.isArray(action.payload)) {
      let found_item = state[action.type];

      output = found_item.filter(
        (item) => item.id !== (action.payload && action.payload.id)
      );
      output = [action.payload, ...output];
    }

    if (action.drop) {
      output = state[action.type].filter(
        (item) => item.id !== (action.payload && action.payload.id)
      );
    }

    if (action.ret && action.ret.obj) {
      output = action.payload;
    }

    if (action.payload && action.payload.token) {
      localStorage.setItem("token", action.payload.token);
    }
  }

  if (action.new_state) {
    let accepted_type = ["array", "object"];
    let got_old_state = state[action.type];

    if (got_old_state && accepted_type.includes(typeof got_old_state)) {
      output = [action.payload, ...got_old_state];
    } else {
      output = [action.payload, got_old_state];
    }
  }

  return {
    ...state,
    [action.type]: output,
    loading: false,
  };
}
