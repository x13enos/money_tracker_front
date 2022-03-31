import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout =() =>{
  return(
    <>
      <div class="flex flex-row">
        <div><Sidebar /></div>
        <div className='ml-4 mt-4'><Outlet /></div>
      </div>
    </>
  )
}

export default MainLayout;