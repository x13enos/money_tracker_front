import React, { useEffect } from 'react'
import httpClient from '../axiosConfig'

function Dashboard() {

  useEffect(async () => {
    const user = await httpClient.get('/users/auth')
  });

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export default Dashboard