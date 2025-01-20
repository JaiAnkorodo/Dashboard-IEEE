import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
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
import AddFAQPage from './pages/AddFAQPage/AddFAQ.tsx';
import EditActivityPage from './pages/EditActivityPage/Edit';
import EditNewsPage from './pages/EditNewsPage/Edit';
import EditAchievmentPage from './pages/EditAchievmentPage/Edit.tsx';
import EditFAQPage from './pages/EditFAQPage/EditFAQ.tsx';
import TrashPage from './pages/TrashPage/Trash.tsx';
import FAQpage from './pages/FAQpage/FAQ.tsx';
import Settings from './pages/Settings.tsx';
import DefaultLayout from './layout/DefaultLayout';
import { UserProvider } from './contexts/UserContext';

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
    <UserProvider>
      {' '}
      <DefaultLayout>
        <Routes>
          {/* Rute Default ke /achievements */}
          <Route path="/" element={<Navigate to="/achievements" replace />} />

          <Route
            path="/achievements"
            element={
              <>
                <PageTitle title="Achievement | IEEE Dashboard Admin" />
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
            path="/recent-activities"
            element={
              <>
                <PageTitle title="Recent Activities | IEEE Dashboard Admin" />
                <RecentActivitiesPage />
              </>
            }
          />
          <Route
            path="/FAQ"
            element={
              <>
                <PageTitle title="FAQ Page | IEEE Dashboard Admin" />
                <FAQpage />
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
            path="/add-achievements"
            element={
              <>
                <PageTitle title="Add New Achievement | IEEE Dashboard Admin" />
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
            path="/add-faq"
            element={
              <>
                <PageTitle title="Add New FAQ | IEEE Dashboard Admin" />
                <AddFAQPage />
              </>
            }
          />
          <Route
            path="/activity/:id"
            element={
              <>
                <PageTitle title="Edit Activity | IEEE Dashboard Admin" />
                <EditActivityPage />
              </>
            }
          />
          <Route
            path="/news/:id"
            element={
              <>
                <PageTitle title="Edit News | IEEE Dashboard Admin" />
                <EditNewsPage />
              </>
            }
          />
          <Route
            path="/achievements/:id"
            element={
              <>
                <PageTitle title="Edit Achievement | IEEE Dashboard Admin" />
                <EditAchievmentPage />
              </>
            }
          />
          <Route
            path="/faq/:id"
            element={
              <>
                <PageTitle title="Edit FAQ | IEEE Dashboard Admin" />
                <EditFAQPage />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | IEEE Dashboard Admin" />
                <Settings />
              </>
            }
          />
          <Route
            path="/trash"
            element={
              <>
                <PageTitle title="Trash | IEEE Dashboard Admin" />
                <TrashPage />
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
    </UserProvider>
  );
}

export default App;
