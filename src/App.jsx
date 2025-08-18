import { Route, Routes, BrowserRouter } from "react-router";
import { Provider } from "react-redux";

import { reduxStore } from "./store/store";
import LocalizationWrapper from "./LocalizationWrapper";
import { SocketProvider } from "@components/socket/SocketProvider";

import InquiryPage from "./Pages/inquiry";
import InquiryDetailPage from "./Pages/inquiry-detail";

function App() {
  return (
    <Provider store={reduxStore}>
      <LocalizationWrapper>
        <SocketProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<InquiryPage />} />
              <Route index path="/inquiry" element={<InquiryPage />} />
              <Route path="/inquiry/:id" element={<InquiryDetailPage />} />
            </Routes>
          </BrowserRouter>
        </SocketProvider>
      </LocalizationWrapper>
    </Provider>
  );
}

export default App;
