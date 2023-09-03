//import "./App.css";
import Home from "./pages/Home.jsx";
import "semantic-ui-css/semantic.min.css";
import StockInfo from "./pages/StockInfo.jsx";
import SearchBar from "./components/SearchBar.jsx";
import { Container } from "semantic-ui-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./Test.jsx";
function App() {
  return (
    <>
      <Container>
        <SearchBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="stockinfo/:symbol" element={<StockInfo />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
