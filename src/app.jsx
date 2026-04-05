import React from "react";
import { AppProvider } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Income from "./pages/Incomes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";


const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/income" element={<Income />} />
          </Routes>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;