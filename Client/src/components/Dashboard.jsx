import React from 'react';

const Dashboard = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const dayName = currentDate.toLocaleString('default', { weekday: 'short' }); // Short day name

  return (
    <div className='maindash h-[100vh] w-[89vw]'>

      <div className='w-[89vw] ml-20 pt-3 flex justify-between'> 

        {/* GREETING */}
        <div className="greet text-base">
          <h1 className="text-4xl font-bold pt-2 border-b pb-2">Dashboard</h1>
          <p className=''>Welcome back, Modi!</p>
        </div>

        {/* DATE */}
        <div className="flex justify-center  flex-row-reverse text-right items-center text-base">
          
          <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center">
            <span className="text-2xl font-bold">{day}</span>
          </div>
          <div className=' pr-2
          '>
            <div className="text-sm border-b">{dayName}</div>
            <div className="mt-1 text-sm">{month}</div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
