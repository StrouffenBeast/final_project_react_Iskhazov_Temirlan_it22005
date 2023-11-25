import './App.css';
import Data from "./components/Data/Data";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/Error/ErrorFallback";
import AddData from "./components/AddData/AddData";
import SearchAndFilter from "./components/SearchAndFilter/SearchAndFilter";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ListPc from "./components/PC/ListPc";
import AddPc from "./components/AddPC/AddPc";

const App = () => {

    return (

        <div className="App">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Router>
                <Navbar />
                <main>
                    <Routes>
                            <Route path="/" element={<Data />} />
                            <Route path="/add-data" element={<AddData />} />
                            <Route path="/search-data" element={<SearchAndFilter />} />
                            <Route path="/pc" element={<ListPc />} />
                            <Route path="/add-pc" element={<AddPc />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
            </ErrorBoundary>
        </div>
    );
}

export default App;