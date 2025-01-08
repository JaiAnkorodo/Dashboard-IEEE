import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import IEEELogo from '../../images/logo/logo.png';

const Register: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Register" />

      <div className="min-h-screen bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col md:flex-row h-full w-full">
          {/* Left Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-tr from-[#C0A2FE] to-[#4E2D96] p-10 text-white">
            <Link to="/">
              <img className="h-20 mb-4" src={IEEELogo} alt="IEEE SB Logo" />
            </Link>
            <h2 className="text-2xl font-bold">Join Us!</h2>
            <p className="mt-2 text-center text-gray-100">
              Join IEEE Student Branch Telkom University to explore exclusive
              resources and networks.
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-white dark:bg-gray-900">
            <h2 className="mb-6 text-3xl font-semibold text-gray-800 dark:text-white">
              Register
            </h2>
            <p className="mb-8 text-sm text-gray-600 dark:text-gray-400">
              Create your account to start your journey.
            </p>

            <form>
              <div className="mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:border-[#6B0DE3] focus:ring focus:ring-[#C0A2FE] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  placeholder="John Doe"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:border-[#6B0DE3] focus:ring focus:ring-[#C0A2FE] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  placeholder="example@ieee.org"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:border-[#6B0DE3] focus:ring focus:ring-[#C0A2FE] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  placeholder="••••••••"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:border-[#6B0DE3] focus:ring focus:ring-[#C0A2FE] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-[#6B0DE3] px-4 py-2 text-white hover:bg-purple-700 focus:ring focus:ring-[#C0A2FE] dark:bg-[#6B0DE3] dark:hover:bg-purple-600"
              >
                Register
              </button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                className="text-[#6B0DE3] hover:underline dark:text-[#C0A2FE]"
                to="/auth/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
