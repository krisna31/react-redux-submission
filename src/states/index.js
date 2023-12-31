import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import leaderboardReducer from "./leaderboards/reducer";
import threadDetailReducer from "./threadDetail/reducer";
import usersReducer from "./users/reducer";
import threadsReducer from "./threads/reducer";
import { loadingBarReducer } from "react-redux-loading-bar";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    leaderboards: leaderboardReducer,
    threadDetail: threadDetailReducer,
    threads: threadsReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
