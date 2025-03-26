// src/components/TaskList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../redux/taskSlice';

const priorityColors = {
  high: 'bg-red-100 border-red-500',
  medium: 'bg-yellow-100 border-yellow-500',
  low: 'bg-green-100 border-green-500',
};

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const weather = useSelector(state => state.weather.data);
  const weatherStatus = useSelector(state => state.weather.loading);
  const dispatch = useDispatch();

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId));
    }
  };

  return (
    <div className="space-y-4">
      {sortedTasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks yet</p>
      ) : (
        <ul className="space-y-3">
          {sortedTasks.map(task => {
            const normalizedCity = task.city?.toLowerCase().trim();
            const taskWeather = normalizedCity ? weather[normalizedCity] : null;
            
            return (
              <li
                key={task.id}
                className={`p-4 border-l-4 rounded shadow-sm ${priorityColors[task.priority]} ${
                  task.completed ? 'opacity-70' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => dispatch(toggleTask(task.id))}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex flex-col">
                      <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.text}
                      </span>
                      {task.city && (
                        <div className="text-2xl text-red-500 mt-2">
                          Location: {task.city}
                          {taskWeather && (
                            <p className="ml-2">
                              {Math.round(taskWeather.main?.temp)}°C, {taskWeather.weather?.[0]?.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete task"
                  >
                    Delete
                  </button>
                </div>
                
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Priority: {task.priority}</span>
                  <span>
                    Created: {new Date(task.createdAt).toLocaleDateString()} at{' '}
                    {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TaskList;