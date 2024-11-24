import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Components/Boilerplate/Main/Main';
import StockDataGraph from './Components/Common/StockDataGraph/StockDataGraph';
import StockDataTable from './Components/Common/StockDataGraph/StockDataTable';
import Dashboard from './Components/Common/Dashboard/Dashboard';
import SignInComponent from './Components/Common/SignIn/SignIn'; // Import your LoginComponent

function App() {
    return (
        <Router>
            <Routes>
                {/* Login Route - Rendered independently */}
                <Route path="/login" element={<SignInComponent />} />

                {/* Other routes with the general wrapper */}
                <Route
                    path="/*"
                    element={
                        <div className="wrapper bg-black">
                            <div className="z-20">
                                <Routes>
                                    <Route path="/" element={<Main />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/graph" element={<StockDataGraph />} />
                                    <Route path="/table" element={<StockDataTable />} />
                                </Routes>
                            </div>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
