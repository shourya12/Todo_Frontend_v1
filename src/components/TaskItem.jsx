
import PropTypes from 'prop-types';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";
import { toast } from 'react-toastify';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {

    const handleToggleCompleted = async (task) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/tasks/${task.id}`, {
                ...task,
                completed: !task.completed,
            });
            onTaskUpdated(response.data);
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Error updating task');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/tasks/${task.id}`);
            onTaskDeleted(task.id);
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Error deleting task');
        }
    };

    return (
        <div className="task-item bg-[#2b2b2b] p-6 rounded-xl shadow-lg border border-[#3e3e3e] relative w-11/12 max-w-3xl m-4 flex flex-col">
            <div className="task-header flex justify-between items-center">
                <div className="label text-[#ffdf91] font-bold text-xl">{task.label}</div>
                <div className="date text-[#cebea4] text-sm italic">{task.dueDate}</div>
            </div>
            <div className="description mt-4 text-[#e0e0e0] flex-grow" style={{ maxHeight: '8em', overflowY: 'auto', wordWrap: 'break-word' }}>
                {task.description}
            </div>
            <div className="flex justify-between mt-4">
                <button className="delete-btn p-2" onClick={handleDelete}>
                    <MdDelete className="text-[#cebea4] hover:text-[#ff5631] text-2xl" />
                </button>
                <button className="mark-btn p-2" onClick={() => handleToggleCompleted(task)}>
                    {task.completed ? 
                        <BsCheckCircle className="text-green-400 text-2xl" /> :
                        <div className="border-2 border-[#ff5631] rounded-full w-6 h-6 flex items-center justify-center"></div>
                    }
                </button>
            </div>
        </div>
    );
};

TaskItem.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        description: PropTypes.string,
        completed: PropTypes.bool.isRequired,
        dueDate: PropTypes.string.isRequired,
    }).isRequired,
    onTaskUpdated: PropTypes.func.isRequired,
    onTaskDeleted: PropTypes.func.isRequired,
};

export default TaskItem;
