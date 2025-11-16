import { Routes, Route, Navigate } from "react-router";
import AppShell from "./layout/AppShell";


import DocView from "./pages/DocView";
import { Dashboard } from "./pages/Dashboard";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<SearchPage />} />
        {/* <Route path="/doc/:id" element={<DocView />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
