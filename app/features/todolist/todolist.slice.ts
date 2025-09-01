import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoListType } from "./todolisttypes";

type todolist = {
    todolist: TodoListType[];
    currentlist: TodoListType[]
}

const initialState: todolist = {
    todolist: [],
    currentlist: []
}

export const todolistSlice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        addtolist: (state, action: PayloadAction<TodoListType>) => {
            state.todolist.unshift({
                id: state.todolist.length + 1,
                todo: action.payload.todo,
                completed: false
            })
        },
        markascompleted: (state, action: PayloadAction<TodoListType>) => {
            const todo = state.todolist.find((todo) => todo.id === action.payload.id)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        removecompleted: (state, action: PayloadAction<TodoListType>) => {
            state.todolist = state.todolist.filter((todo) => todo.id !== action.payload.id)
        },
        removeallcompleted: (state) => {
            state.todolist = state.todolist.filter((todo) => !todo.completed)
        }
    }
})


export const { addtolist, markascompleted, removecompleted, removeallcompleted} = todolistSlice.actions
export default todolistSlice.reducer