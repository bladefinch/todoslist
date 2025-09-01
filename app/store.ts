import { configureStore } from '@reduxjs/toolkit'
import todolistReducer from './features/todolist/todolist.slice'
import sortbuttonReducer from './features/sortbutton/sortbutton.slice'

export const store = configureStore({
  reducer: {
    todolist: todolistReducer,
    sortbutton: sortbuttonReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch