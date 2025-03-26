// src/pages/Dashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import TaskInput from '../component/TaskInput';
import TaskList from '../component/TaskList';
import Logout from '../component/Logout';

const Dashboard = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <Logout />
      </div>
      <TaskInput />
      <TaskList />
    </div>
  );
};

export default Dashboard;