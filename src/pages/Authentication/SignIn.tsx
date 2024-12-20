import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import IEEELogo from '../../images/logo/logo-blue.jpg'; // Pastikan file logo ini ada
import IEEELogoDark from '../../images/logo/logo.png'; // Pastikan file logo ini ada

const SignIn: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Sign In" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center flex flex-col items-center justify-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img
                  className="hidden dark:block h-auto w-100%"
                  src={IEEELogoDark}
                  alt="IEEE SB Logo Dark"
                />
                <img
                  className="dark:hidden h-auto w-40"
                  src={IEEELogo}
                  alt="IEEE SB Logo"
                />
              </Link>

              <p className="5xl:px-50 text-lg text-gray-600">
                Welcome to IEEE Student Branch Telkom University. Log in to
                access your dashboard.
              </p>

              <span className="mt-15 inline-block">
                <svg
                  width="350"
                  height="350"
                  viewBox="0 0 350 350"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG content unchanged */}
                </svg>
              </span>
            </div>
          </div>

          <div className="w-full xl:w-1/2">
            <div className="p-8 md:p-12 lg:p-20">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
                Sign In to IEEE SB Telkom University
              </h2>
              <p className="mb-8 text-sm text-gray-600 dark:text-gray-400">
                Enter your credentials to continue.
              </p>

              <form>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
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
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring focus:ring-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Sign In
                </button>
              </form>

              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link
                  className="text-blue-600 hover:underline dark:text-blue-400"
                  to="/auth/signup"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
