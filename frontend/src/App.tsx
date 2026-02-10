import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { AppProvider, useApp } from './contexts/AppContext';
import { ToastProvider } from './components/ui/toast';
import { router } from './routes';
import { mockShifts, mockCommitments, mockConflicts } from './utils/mockData';

const AppInitializer = () => {
  const { setShifts, setCommitments, setConflicts } = useApp();
  
  useEffect(() => {
    // Load mock data on mount
    setShifts(mockShifts);
    setCommitments(mockCommitments);
    setConflicts(mockConflicts);
  }, [setShifts, setCommitments, setConflicts]);
  
  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <AppInitializer />
      </ToastProvider>
    </AppProvider>
  );
}

export default App;