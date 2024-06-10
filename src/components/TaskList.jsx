import  { useEffect, useState } from 'react';
import axios from 'axios';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TaskFilter from './TaskFilter';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
    const [tasks, setTasks] = useState([
    ]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchTasks = async () => {
            let url = 'http://localhost:8080/api/tasks/';
            if (filter === 'pending') {
                url += 'pending';
            } else if (filter === 'completed') {
                url += 'completed';
            } else {
                url += 'all';
            }
            const response = await axios.get(url);
            setTasks(response.data);
        };
        fetchTasks();
    }, [filter]);

    const handleTaskAdded = (task) => {
        setTasks([...tasks, task]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    const handleTaskDeleted = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleFilterChange = (selectedOption) => {
        setFilter(selectedOption.target.value);
    };

    return (
        <div className="bg-black">
           
            <div className="">
                <TaskForm onTaskAdded={handleTaskAdded} />
            </div>
            <div className='flex px-10 justify-end text-[#CEBEA4]'>
                <div className="w-[20%]">
                    <TaskFilter onFilterChange={handleFilterChange} />
                </div>
                
            </div>
            <div className="py-5">
                <TransitionGroup>
                    <div className='flex flex-col items-center'>
                        {tasks.map(task => (
                            <CSSTransition key={task.id} timeout={500} classNames="">
                                <TaskItem
                                    task={task}
                                    onTaskUpdated={handleTaskUpdated}
                                    onTaskDeleted={handleTaskDeleted}
                                />
                            </CSSTransition>
                        ))}
                    </div>
                    
                </TransitionGroup>
            </div>
        </div>
    );
};

export default TaskList;