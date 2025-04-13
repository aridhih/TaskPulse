import React, { useState } from 'react';
import { PiDotsThreeOutlineThin } from 'react-icons/pi';
import RemoveCardMenu from './RemoveCardMenu';
import { useTasks } from '../../../Layout/TaskContext';
import { useNavigate } from 'react-router-dom';

const RecentsCard = ({removeCard}) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const { tasks } = useTasks();
  const navigate = useNavigate();

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  return (
    <div className='h-72 border-gray-300 py-1 px-4 border bg-gray-200 rounded-xl shadow-lg shadow-gray-300'>
      <div className="h-[15%] border-b border-gray-300 font-medium justify-between flex items-center">
        <p>Recents</p>
        <PiDotsThreeOutlineThin className={`hover:text-black hover:text-xl ${isCardOpen && 'text-black text-xl'} cursor-pointer text-gray-500`} onClick={toggleCard} />
      </div>

      <div className='h-[85%] px-6 py-2'>
        <ol className='list-disc'>
          {tasks.slice(0, 5).map((task) => (
            <li key={task.id} onClick={() => handleTaskClick(task.id)} className="cursor-pointer hover:underline">
              {task.title}
            </li>
          ))}
        </ol>
      </div>

      {isCardOpen && (
        <>
          <RemoveCardMenu toggleCard={toggleCard} isCardOpen={isCardOpen} removeCard={removeCard} cardName="Recents" />
          <div className="fixed inset-0 z-40" onClick={toggleCard}></div>
        </>
      )}
    </div>
  );
};

export default RecentsCard;