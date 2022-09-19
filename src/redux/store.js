import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

let middlewares = [thunk];
const store = configureStore({
  reducer: rootReducer,
  middleware: [...middlewares],
});

export default store;
