//import "./App.css";
import Home from "./pages/Home.jsx";
import "semantic-ui-css/semantic.min.css";
import StockInfo from "./pages/StockInfo.jsx";
import SearchBar from "./components/SearchBar.jsx";
import { Container, Search } from "semantic-ui-react";
function App() {
  return (
    <>
      <Container>
        <SearchBar />
        <div>
          <StockInfo />
        </div>
        <div>
          <h1>Hello</h1>
        </div>
      </Container>
    </>
  );
}

export default App;
