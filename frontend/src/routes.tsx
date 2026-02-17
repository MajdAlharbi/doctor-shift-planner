import { createBrowserRouter,Outlet } from "react-router-dom";
import { Dashboard } from './features/dashboard/DashboardPage';
import { ShiftsManagement } from "./features/shifts/ShiftsPage";
import { WeeklyCalendar } from "./features/calendar/CalendarPage";
import { Commitments } from "./features/commitments/CommitmentsPage";
import { RecoveryRules } from "./features/recovery/RecoveryPage";
import { ConflictResolution } from "./features/conflicts/ConflictsPage";
import { ProfileSettings } from "./features/profile/ProfilePage";
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