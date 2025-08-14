import { Route, Routes, BrowserRouter } from "react-router";
import { Provider } from "react-redux";

import { reduxStore } from "./store/store";
import LocalizationWrapper from "./LocalizationWrapper";
import { SocketProvider } from "@components/socket/SocketProvider";

// import Dashboard from "./Pages/Dashboard";
import InquiryPage from "./Pages/inquiry";
import InquiryDetailPage from "./Pages/inquiry-detail";

function App() {
  return (
    <BrowserRouter>
      <Provider store={reduxStore}>
        <LocalizationWrapper>
          <SocketProvider>
            <Routes>
              {/* <Route index element={<Dashboard />} /> */}
              <Route index element={<InquiryPage />} />
              <Route path="/inquiry" element={<InquiryPage />} />
              <Route path="/inquiry/:id" element={<InquiryDetailPage />} />
            </Routes>
          </SocketProvider>
        </LocalizationWrapper>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
