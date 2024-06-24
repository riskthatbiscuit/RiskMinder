import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../utils/mutations'

import Auth from '../utils/auth'

const Signup = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })
  const [createUser, { error, data }] = useMutation(CREATE_USER)
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
      const { data } = await createUser({
        variables: { ...formState },
      })

      Auth.login(data.createUser.token)
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
            Signup
          </h4>
          <div className="card-body">
            {data ? (
              <p className="text-center">
                Success! You may now head{' '}
                <Link to="/" className="text-blue-500 hover:text-blue-700">
                  back to the homepage.
                </Link>
              </p>
            ) : (
              <form className="space-y-6" onSubmit={handleFormSubmit}>
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
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Sign Up
                </button>
              </form>
            )}
            {error && (
              <p className="mt-2 text-center text-sm text-red-600">
                {error.message}
              </p>
            )}
          </div>
          <div className="mt-4 text-center">
            <p>Already signed up?</p>
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Signup
