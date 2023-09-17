//import "./App.css";
import Home from "./pages/Home.jsx";
import "semantic-ui-css/semantic.min.css";
import StockInfo from "./pages/StockInfo.jsx";
import SearchBar from "./components/SearchBar.jsx";
import { Container, Divider } from "semantic-ui-react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Test from "./Test.jsx";
function App() {
  return (
    <>
      <Container className=" mt-6">
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <div>
                  <SearchBar />
                  <Outlet />
                </div>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="stockinfo/:symbol" element={<Test />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
