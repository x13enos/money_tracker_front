import React from 'react'
import { useEffect, useState } from 'react'
import httpClient from '../axiosConfig'

function BankAccounts() {
  const [bankAccounts, setBankAccounts] = useState([])
  const [newBankAccount, setNewBankAccount] = useState(false)
  const [form, setForm] = useState({ merchant_id: '', merchant_password: '' })
  const [errors, setErrors] = useState({})

  useEffect( async () => {
    const response = await httpClient('/bank_accounts')
    setBankAccounts(response.data)
  }, [])

  const onChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value })
  }

  const closeForm = () => {
    setNewBankAccount(false)
    setForm({ merchant_id: '', merchant_password: '' })
  }

  const createBankAccount = async () => {
    try {
      const response = await httpClient.post('/bank_accounts', form)
      setBankAccounts([...bankAccounts, response.data])
    } catch (error) {
      setErrors(error.response.data.errors)
    }
  }

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-4xl mt-1 mb-10'>Bank Accounts({ bankAccounts.length })</h1>
        { !newBankAccount &&
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 mt-1 rounded"
            onClick={() => { setNewBankAccount(true) }}>
            New
          </button>
        }
      </div>

      { newBankAccount && 
        <form action="#" method="POST">
          <div className="shadow overflow-hidden sm:rounded-md border mb-4">
            <div className="px-4 pt-5 pb-3 bg-white">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="merchant_id" className="block text-sm font-medium text-gray-700">Merchant ID</label>
                  <input 
                    type="text" 
                    name="merchant_id" 
                    id="merchant_id"
                    value={form.merchant_id}
                    onChange={onChange}
                    className="mt-1 p-1 pl-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" />
                  {!!errors["merchant_id"] &&
                    <span className='text-red-500'>{ errors["merchant_id"].join(", ") }</span>
                  }
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="merchant_password" className="block text-sm font-medium text-gray-700">Merchant Password</label>
                  <input 
                    type="text" 
                    name="merchant_password" 
                    id="merchant_password"
                    value={form.merchant_password}
                    onChange={onChange}
                    className="mt-1 p-1 pl-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" />
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
                onClick={createBankAccount}>
                  Save
              </button>
            </div>
          </div>
        </form>
      }
      
      { bankAccounts.length && 
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Merchant ID
              </th>
              <th scope="col" className="px-6 py-3">
                Merchant Password
              </th>
              <th scope="col" className="px-6 py-3">
              </th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((bankAccount) =>
              <tr key={bankAccount.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{bankAccount.id}</td>
                <td className="px-6 py-4">{bankAccount.merchant_id}</td>
                <td className="px-6 py-4">{bankAccount.merchant_password}</td>
                <td className="px-6 py-4 text-right"></td>
              </tr>
            )}
          </tbody>
        </table>
      }
    </>
  )
}

export default BankAccounts