import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import leadsSlice from "../features/leads/leadSlice";
import transSlice from "../features/transactions/tranSlice";
import { userReducer } from "../redux/slice/user";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
  tran: transSlice,
  user: userReducer,
};

export default configureStore({
  reducer: combinedReducer,
});
