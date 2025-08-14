import { Route, Routes } from "react-router";
import Dashboard from "./Pages/Dashboard";
import InquiryPage from "./Pages/inquiry";
import InquiryDetailPage from "./Pages/inquiry-detail";

function App() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/inquiry" element={<InquiryPage />} />
      <Route path="/inquiry/:id" element={<InquiryDetailPage />} />
    </Routes>
  );
}

export default App;
