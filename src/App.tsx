import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
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
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | IEEE Dashboard Admin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | IEEE Dashboard Admin" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
