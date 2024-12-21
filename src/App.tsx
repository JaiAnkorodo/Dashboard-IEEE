import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'; // Tambahkan Navigate
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Login from './pages/Authentication/Login.tsx';
import Register from './pages/Authentication/Register.tsx';
import AchievmentPage from './pages/AchievmentPage/Achievment';
import NewsPage from './pages/NewsPage/News';
import RecentActivitiesPage from './pages/RecentActivitiesPage/Activities';
import AddActivityPage from './pages/AddActivityPage/Add';
import AddAchievmentPage from './pages/AddAchievmentPage/Achiv';
import AddNewsPage from './pages/AddNewsPage/Addnews';
import EditActivityPage from './pages/EditActivityPage/Edit';
import EditNewsPage from './pages/EditNewsPage/Edit';
import EditAchievmentPage from './pages/EditAchievmentPage/Edit.tsx';
import LogPage from './pages/LogPage/log';
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
        {/* Rute Default ke /achievment */}
        <Route path="/" element={<Navigate to="/achievment" replace />} />

        <Route
          path="/achievment"
          element={
            <>
              <PageTitle title="Achievment | IEEE Dashboard Admin" />
              <AchievmentPage />
            </>
          }
        />
        <Route
          path="/news"
          element={
            <>
              <PageTitle title="News | IEEE Dashboard Admin" />
              <NewsPage />
            </>
          }
        />
        <Route
          path="/log"
          element={
            <>
              <PageTitle title="Log | IEEE Dashboard Admin" />
              <LogPage />
            </>
          }
        />
        <Route
          path="/recent-activities"
          element={
            <>
              <PageTitle title="Recent Activities | IEEE Dashboard Admin" />
              <RecentActivitiesPage />
            </>
          }
        />
        <Route
          path="/add-activity"
          element={
            <>
              <PageTitle title="Add New Activity | IEEE Dashboard Admin" />
              <AddActivityPage />
            </>
          }
        />
        <Route
          path="/add-achievment"
          element={
            <>
              <PageTitle title="Add New Achievment | IEEE Dashboard Admin" />
              <AddAchievmentPage />
            </>
          }
        />
        <Route
          path="/add-news"
          element={
            <>
              <PageTitle title="Add New News | IEEE Dashboard Admin" />
              <AddNewsPage />
            </>
          }
        />
        <Route
          path="/edit-activity/:id"
          element={
            <>
              <PageTitle title="Edit Activity | IEEE Dashboard Admin" />
              <EditActivityPage />
            </>
          }
        />
        <Route
          path="/edit-news/:id"
          element={
            <>
              <PageTitle title="Edit News | IEEE Dashboard Admin" />
              <EditNewsPage />
            </>
          }
        />
        <Route
          path="/edit-achievment/:id"
          element={
            <>
              <PageTitle title="Edit Achievment | IEEE Dashboard Admin" />
              <EditAchievmentPage />
            </>
          }
        />
        <Route
          path="/auth/login"
          element={
            <>
              <PageTitle title="Login | IEEE Dashboard Admin" />
              <Login />
            </>
          }
        />
        <Route
          path="/auth/register"
          element={
            <>
              <PageTitle title="Register | IEEE Dashboard Admin" />
              <Register />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
