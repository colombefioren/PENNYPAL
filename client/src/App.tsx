import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <SpeedInsights />
      <Analytics />
      <Routes>
        <Route path="/incomes" element={<h1>Income Page</h1>} />
        <Route path="/" element={<h1>Heyyyy there</h1>} />
      </Routes>
    </>
  );
}

export default App;
