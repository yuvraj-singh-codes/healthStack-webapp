import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../features/slice';
import tabReducer from '../features/tabSlice';
import appReducer from '../features/allStateSlice';
import searchReducer from '../features/SearchSlice';
import filterSortReducer from '../features/filterSortSlice'

export const store = configureStore({
  reducer: {
    items:itemReducer,
    tabvalue:tabReducer,
    app: appReducer,
    search:searchReducer,
    filters:filterSortReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch