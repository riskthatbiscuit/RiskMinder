import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'

import Auth from '../utils/auth'

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN_USER)
  const navigate = useNavigate()

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await login({
        variables: { ...formState },
      })

      Auth.login(data.login.token)
    } catch (e) {
      console.error(e)
    }

    navigate('/portfolio')
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div
          className="card bg-white shadow-md rounded-lg px-4 py-8"
          style={{ width: '500px', maxWidth: '100%', minHeight: '300px' }}
        >
          <h4 className="font-bold text-xl mb-4 text-center text-gray-900">
            Login
          </h4>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <input
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
              type="submit"
            >
              Login
            </button>
          </form>
          {error && <p className="mt-4 text-red-500 text-xs italic">{error}</p>}
          <div className="mt-4 text-center">
            <p>Not signed up?</p>
            <Link to="/signup" className="text-blue-500 hover:text-blue-600">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
