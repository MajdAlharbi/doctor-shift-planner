import { ReactNode } from "react";

type Props = { children: ReactNode };

export default function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="h-16 border-b bg-white flex items-center px-6">
        <h1 className="text-lg font-semibold">DoctorShift Planner</h1>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}