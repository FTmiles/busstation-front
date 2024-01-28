import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trip from "./pages/Trip.js";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage.js";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="trip/:tripId" element={<Trip />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
