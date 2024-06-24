import { useRouteError } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div
      id="error-page"
      className="flex flex-col justify-center items-center h-screen bg-gray-100"
    >
      <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
      <p className="mt-3 text-lg text-gray-800">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="mt-2 text-md text-gray-500">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link
        to="/"
        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Back Home
      </Link>
    </div>
  )
}
