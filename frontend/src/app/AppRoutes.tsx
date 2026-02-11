import { Routes, Route, Navigate } from "react-router";
import AppLayout from "./AppLayout";


export default function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<div>Home placeholder</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}