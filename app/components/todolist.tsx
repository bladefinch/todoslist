'use client'

import { useState, useMemo } from "react";
import ListItem from "../components/listitem";

import { useDispatch, useSelector } from "react-redux";
import { addtolist } from "../features/todolist/todolist.slice";
import { RootState } from "../store";

import { activesortbutton } from '../features/sortbutton/sortbutton.slice';

import { removeallcompleted } from "../features/todolist/todolist.slice";

export default function TodoList() {
  const [todo, setTodo] = useState<string>('')
  const [error, setError] = useState<string>('')

  const dispatch = useDispatch()
  const list = useSelector((state: RootState) => state.todolist.todolist)

  const addTodo = () => {
    if (todo.trim()){
      dispatch(addtolist({todo: todo, id: list.length + 1, completed: false}))
      setTodo('')
    }
    else {
      setError('Todo cannot be empty')
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  const buttons = ['All', 'Active', 'Completed']
  
  const activebutton = (useSelector((state: RootState) => state.sortbutton.name))

  const handleClick = (value: string) => {
    dispatch(activesortbutton({ name: value }));
  };

  const sortedtodos = useMemo(() => {
    if (activebutton === 'All') return list;
    if (activebutton === 'Active') return list.filter(todo => !todo.completed);
    if (activebutton === 'Completed') return list.filter(todo => todo.completed);
  }, [list, activebutton]);

  return (
    <div>
      <div className="w-[100%] max-w-[650px] mx-auto  p-2.5">
        <h1 className="text-4xl uppercase font-bold text-center mb-5">Todos</h1>
        <div className="flex gap-2.5">
            <input value={todo} onChange={(e) => setTodo(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTodo()} className="w-full border border-black border-solid rounded-3xl px-5 py-2.5" placeholder="What needs to be done?"/>
            <button onClick={addTodo} className="bg-black text-white rounded-3xl px-5 py-2.5 hover:bg-amber-400 transition ease-linear duration-100 w-[150px]">Add todo</button>
        </div>
        {error? <p className="text-red-500 text-center pt-5"> {error} </p> : ''}
        <div className="grid gap-2.5 mt-5 py-2.5 border border-amber-400 border-solid rounded-3xl">
            {sortedtodos?.length? (
              sortedtodos?.map((item) => (<ListItem key={item.id} item={item}/>))
            ) : (
              <h2 className="text-center py-5 uppercase">No todos yet</h2>
            )}
          <div className="text-sm flex justify-between items-center px-5 border-t border-amber-400 pt-2.5
          max-[426px]:grid max-[426px]:gap-2.5">
            <div>{list.filter((todo) => !todo.completed).length} Items left</div>
            <div className="flex">
              {buttons.map((item) => (<button key={item} className={`px-3 py-1.5 rounded-3xl transition ease-linear duration-100 cursor-pointer ${activebutton === item ? 'bg-amber-400 text-white' : ''}`} onClick={() => handleClick(item)}>{item}</button>))}
            </div>
            <div onClick={() => dispatch(removeallcompleted())} className="cursor-pointer hover:text-amber-400 transition ease-linear duration-100">Clear completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
