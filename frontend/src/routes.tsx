import { createBrowserRouter,Outlet } from "react-router-dom";
import { Dashboard } from './features/dashboard/DashboardPage';
import { ShiftsManagement } from './components/ShiftsManagement';
import { WeeklyCalendar } from './components/WeeklyCalendar';
import { Commitments } from './components/Commitments';
import { RecoveryRules } from './components/RecoveryRules';
import { ConflictResolution } from './components/ConflictResolution';
import { ProfileSettings } from './components/ProfileSettings';
import { NotFound } from './components/NotFound';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header />
      <main className="pb-4">
        <Outlet/>
      </main>
      <BottomNav />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "shifts", element: <ShiftsManagement /> },
      { path: "calendar", element: <WeeklyCalendar /> },
      { path: "commitments", element: <Commitments /> },
      { path: "recovery", element: <RecoveryRules /> },
      { path: "conflicts", element: <ConflictResolution /> },
      { path: "profile", element: <ProfileSettings /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);