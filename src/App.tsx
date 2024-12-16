import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import RecentActivitiesPage from './pages/RecentActivitiesPage/Activities';
import AddActivityPage from './pages/AddActivityPage/Add';
import EditActivityPage from './pages/EditActivityPage/Edit';
import LogPage from './pages/LogPage/log';
import Settings from './pages/Settings';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="IEEE Dashboard Admin" />
              <ECommerce />
            </>
          }
        />

        <Route
          path="/log"
          element={
            <>
              <PageTitle title="Log | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <LogPage />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/recent-activities"
          element={
            <>
              <PageTitle title="Recent Activities | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <RecentActivitiesPage />
            </>
          }
        />
        <Route
          path="/add-activity"
          element={
            <>
              <PageTitle title="Add New Activity" />
              <AddActivityPage />
            </>
          }
        />
        <Route
          path="/edit-activity/:id"
          element={
            <>
              <PageTitle title="Edit Activity" />
              <EditActivityPage />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
