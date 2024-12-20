import React from 'react';

const Card = ({ user }) => {
  return (
    <div className="max-w-xl w-full bg-white border-2 border-gray-300 shadow-lg rounded-lg p-6 flex items-center gap-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-500 cursor-pointer">
     
      <div className="flex-shrink-0">
        <img
          src={user.picture.large}
          alt="User"
          className="w-32 h-32 rounded-md border border-gray-400"
        />
      </div>

      
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{user.name.first +" "+user.name.last}</h2>
         
        </div>
        <p className="text-gray-600 mt-2">
          <strong>Gender:</strong> {user.gender}
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Phone:</strong> {user.phone}
        </p>
      </div>
    </div>
  );
};

export default Card;
