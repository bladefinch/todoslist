'use client'

import { IoCheckmarkOutline } from "react-icons/io5";
import { TodoListType } from "../features/todolist/todolisttypes";

import { useDispatch, useSelector } from "react-redux";
import { markascompleted, removecompleted } from "../features/todolist/todolist.slice";
import { RootState } from "../store";

type ItemCardProps = {
    item: TodoListType
}

export default function ListItem({item}: ItemCardProps) {
    const dispatch = useDispatch()
    const list = useSelector((state: RootState) => state.todolist.todolist)
    const iscompleted = list.find((todo) => todo.id === item.id)?.completed

    const toggleCompleted = () => {
        dispatch(markascompleted(item))
    }

    const removeItem = () => {
        dispatch(removecompleted(item))
    }


    return (
        <div className="w-[100%] py-2.5 px-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={toggleCompleted} data-testid="markascompleted" className="border border-amber-400 border-solid rounded-full p-1">
                        <IoCheckmarkOutline className={`transition-opacity ease-linear duration-100 ${iscompleted ? "opacity-100" : "opacity-0"}`}/>
                    </button>
                    <h1 className={`ml-3 ${iscompleted ? "line-through text-gray-400" : ""}`}>{item.todo}</h1>
                </div>
                {iscompleted ? (
                    <div onClick={removeItem} className="transition ease-linear duration-100 cursor-pointer text-sm hover:text-amber-400">Delete</div>
                ): ('')}
            </div>
        </div>
    )
}