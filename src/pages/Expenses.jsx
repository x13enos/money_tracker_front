import React from 'react'
import { useEffect, useState } from 'react'
import httpClient from '../axiosConfig'

function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState(false)
  const [form, setForm] = useState({ name: '', credit_card: '', balance: 0.0 })
  const [errors, setErrors] = useState({})

  useEffect( async () => {
    const response = await httpClient('/expenses')
    setExpenses(response.data)
  }, [])

  const onChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value })
  }

  const closeForm = () => {
    setNewExpense(false)
    setForm({ name: '', credit_card: '', balance: 0.0 })
  }

  const createExpense = async () => {
    try {
      const response = await httpClient.post('/expenses', form)
      setExpenses([...expenses, response.data])
      closeForm()
    } catch (error) {
      setErrors(error.response.data.errors)
    }
  }

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-4xl mt-1 mb-10'>Expense Categories({ expenses.length })</h1>
        { !newExpense &&
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 mt-1 rounded"
            onClick={() => { setNewExpense(true) }}>
            New
          </button>
        }
      </div>

      { newExpense && 
        <form action="#" method="POST">
          <div className="shadow overflow-hidden sm:rounded-md border mb-4">
            <div className="px-4 pt-5 pb-3 bg-white">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name"
                    value={form.name}
                    onChange={onChange}
                    className="mt-1 p-1 pl-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" />
                  {!!errors["name"] &&
                    <span className='text-red-500'>{ errors["name"].join(", ") }</span>
                  }
                </div>
              </div>
            </div>
            <div className='float-right'>
              <button 
                type="button" 
                className="mr-4 mb-2 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={closeForm}>
                  Cancel
              </button>
              <button 
                type="button" 
                className="mr-4 mb-2 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={createExpense}>
                  Save
              </button>
            </div>
          </div>
        </form>
      }
      
      { expenses.length > 0 && 
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) =>
              <tr key={expense.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{expense.name}</td>
                <td className="px-6 py-4 text-right"></td>
              </tr>
            )}
          </tbody>
        </table>
      }
    </>
  )
}

export default Expenses