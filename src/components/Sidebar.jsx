import React from 'react'
import { Link } from 'react-router-dom'

function SidebarLink ({ title, icon, link }) {
  return (
    <>
      <li>
        <Link to={link} className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i type="solid" className={`bx bxs-${icon}`}></i></span>
          <span className="text-sm font-medium">{title}</span>
        </Link>
      </li>
    </>
  )
}

function Sidebar() {
  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />

      <div className="min-h-screen flex flex-row border-r">
        <div className="flex flex-col w-56 bg-white overflow-hidden">
          <div className="flex items-center justify-center h-20 shadow-md">
            <h1 className="text-3xl mx-4 uppercase"><img width="64" height="64" src="https://lh3.googleusercontent.com/rje_4dnymfb5FzllBp78a_DIm1THuLc2gy07ChKWyk7qB5UBSa6AH0nNETuqLZBY0s0" /></h1>
          </div>
          <ul className="flex flex-col py-4">
            <SidebarLink link="/bank_accounts" title="Bank Accounts" icon="bank" />
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar