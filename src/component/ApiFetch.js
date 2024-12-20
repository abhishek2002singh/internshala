import React, { useEffect, useState } from 'react';
import Card from './Card';

const ApiFetch = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?page=1&results=10&seed=abc'); 
        const data = await response.json();
        setUsers(data.results);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-white flex flex-wrap items-center justify-center gap-6 p-6">
      {users.length > 0 ? (
        users.map((user, index) => <Card key={index} user={user} />)
      ) : (
        <p className="text-gray-600 text-lg">Loading...</p>
      )}
    </div>
  );
};

export default ApiFetch;
