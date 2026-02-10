import { createBrowserRouter } from 'react-router';
import { Dashboard } from './components/Dashboard';
import { ShiftsManagement } from './components/ShiftsManagement';
import { WeeklyCalendar } from './components/WeeklyCalendar';
import { Commitments } from './components/Commitments';
import { RecoveryRules } from './components/RecoveryRules';
import { ConflictResolution } from './components/ConflictResolution';
import { ProfileSettings } from './components/ProfileSettings';
import { NotFound } from './components/NotFound';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header />
      <main className="pb-4">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: '/shifts',
    element: (
      <Layout>
        <ShiftsManagement />
      </Layout>
    ),
  },
  {
    path: '/calendar',
    element: (
      <Layout>
        <WeeklyCalendar />
      </Layout>
    ),
  },
  {
    path: '/commitments',
    element: (
      <Layout>
        <Commitments />
      </Layout>
    ),
  },
  {
    path: '/recovery',
    element: (
      <Layout>
        <RecoveryRules />
      </Layout>
    ),
  },
  {
    path: '/conflicts',
    element: (
      <Layout>
        <ConflictResolution />
      </Layout>
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <ProfileSettings />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
]);