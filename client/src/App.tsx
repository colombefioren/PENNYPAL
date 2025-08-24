import { Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./ui";
import { IncomesPage } from "./pages/IncomesPage";

function App() {
  return (
    <ToastProvider
      max={4}
      dense={false}
      pauseOnHover={true}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/incomes" replace />} />
          <Route path="/incomes" element={<IncomesPage />} />
        </Routes>
      </div>
    </ToastProvider>
  );
}

export default App;
