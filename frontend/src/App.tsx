import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { AppProvider, useApp } from "./contexts/AppContext";
import { ToastProvider } from "./components/ui/toast";
import { router } from "./routes";
import { mockShifts, mockCommitments, mockConflicts } from "./utils/mockData";

const AppInitializer = () => {
  const { setShifts, setCommitments, setConflicts } = useApp();

  useEffect(() => {
    setShifts(mockShifts);
    setCommitments(mockCommitments);
    setConflicts(mockConflicts);
  }, [setShifts, setCommitments, setConflicts]);

  return <RouterProvider router={router} />;
};

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <AppInitializer />
      </ToastProvider>
    </AppProvider>
  );
}