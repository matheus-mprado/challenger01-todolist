import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    const randomId = Math.floor(Math.random() * 9999) +1
    
    newTaskTitle !== '' ?
        setTasks([...tasks,{
          id:randomId,
          isComplete:false,
          title:newTaskTitle
        }]):
        
        console.log('não deu')
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    let newtasks = tasks.map(item=>{
      return item.id === id ? 
        {...item, isComplete:!item.isComplete} : 
        {...item}
    })
    setTasks(newtasks)
  }

  function handleRemoveTask(id: number) {
    let newtasks = tasks.filter(item=>{
      return item.id !== id;
    });

    setTasks(newtasks);
  } 

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}