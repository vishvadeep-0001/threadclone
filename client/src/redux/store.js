import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./slice";

export default configureStore({
  reducer: {
    service: serviceReducer,
  },
  // middleware: (getDefaultMiddleware)=>{
  //   getDefaultMiddleware({
  //     serializableCheck: false
  //   }).concat(serviceApi.middleware)
  // }
});
