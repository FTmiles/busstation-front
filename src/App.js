import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/home/Home.js";
import Trip from "pages/trip/Trip.js";
import Layout from "pages/layout/Layout.js";
import NoPage from "pages/nopage/NoPage.js";
import AdminPanel from "pages/adminPanel/AdminPanel.js";
import PublicHolidayManager from "pages/adminPanel/PublicHolidayManager";
import AdminWelcome from "pages/adminPanel/AdminWelcome";
import YearlyRules from "pages/adminPanel/YearlyRules";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="trip/:tripId" element={<Trip />} />

          <Route path="*" element={<NoPage />} />
          <Route path="/date/:date" element={<Home />} />
          <Route path="admin-panel" element={<AdminPanel />}>
            <Route index element={<AdminWelcome />} />

             <Route path="holidays" element={<PublicHolidayManager />} />
             <Route path="yearly-rules" element={<YearlyRules />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
