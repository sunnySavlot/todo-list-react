import './TodoApp.css'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function TodoApp() {
  const [task, setTask] = useState('')
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')) || []) 

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  function handleInputChange(e) {
    setTask(e.target.value)
  }

  function addTodo() {
    if (task) {
      setTodoList(prevTodoList => {
        return [...prevTodoList, {id: uuidv4(), task, isFinished: false}]
      })
      setTask('')
    }
  }

  function addTodoOnEnterKey(e) {
    if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
      addTodo()
    }
  }

  function deleteTodo(id) {
    setTodoList(prevTodoList => {
      return prevTodoList.filter( todo => {
        if (todo.id !== id) {
          return todo
        }
      })
    })
  }

  function editTodo(id) {
    if (task) {
      setTodoList(prevTodoList => {
        return prevTodoList.map(todo => {
          if (id === todo.id) {
            return {
              ...prevTodoList,
              task
            }
          } else {
            return todo
          }
        })
      })
      setTask('')
    }
  }

  function handleCheckBox(id) {
   setTodoList(prevTodoList => {
      return prevTodoList.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isFinished: !todo.isFinished
          }
        } else {
          return todo
        }
      })
   })
  }

  function clearAllTodos() {
    setTodoList([])
  }

  const todosElements = todoList.map(todo => {
    return (
      <div key={todo.id} className='todo-task-element'>
        <input 
          type="checkbox"
          onChange={()=>handleCheckBox(todo.id)}
          value={todo.isFinished}
        />
        <label 
          style={{textDecoration: todo.isFinished ? "line-through" : ""}}
        >
          {todo.task}
        </label> 
        <button onClick={()=>editTodo(todo.id)}>&#128221;</button> 
        <button onClick={()=>deleteTodo(todo.id)}>&#128465;</button> 
      </div>
    )
  })

  return (
    <main className='todo-app'>
        <div>
          <input 
            type="text" 
            className='todo-input'
            placeholder='Enter todo item'
            name='task'
            onChange={handleInputChange}
            onKeyDown={addTodoOnEnterKey}
            value={task}
          />
          <button
            onClick={addTodo}
            className='btn-enter'
          >
            Enter
          </button>
          <button
            onClick={clearAllTodos}
            className='btn-clear'
          >
            ClearAll
          </button>
        </div>
        <div>
          {todosElements}
        </div>
    </main>
  )
}