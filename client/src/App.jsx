import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Components/Boilerplate/Main/Main';
import StockDataGraph from './Components/Common/StockDataGraph/StockDataGraph';
import StockDataTable from './Components/Common/StockDataGraph/StockDataTable';
import Dashboard from './Components/Common/Dashboard/Dashboard';
import SignInComponent from './Components/Common/SignIn/SignIn';

function App() {
    // State to manage authentication (replace with your logic if needed)
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return (
        <Router>
            <Routes>

                {/* Login Route */}
                <Route
                    path="/"
                    element={
                        <SignInComponent
                            onLogin={() => setIsAuthenticated(true)} // Example: Set user as authenticated
                        />
                    }
                />

                {/* Protect other routes */}
                <Route
                    path="/*"
                    element={
                        isAuthenticated ? (
                            <div className="wrapper">
                                <div className="z-20">
                                    <Routes>
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/graph" element={<StockDataGraph />} />
                                        <Route path="/table" element={<StockDataTable />} />
                                        <Route path="/main" element={<Main />} />
                                    </Routes>
                                </div>
                            </div>
                        ) : (
                            <div className='flex bg-black text-white justify-center items-center h-screen'>
                                <h1 className='font-semibold text-[4rem]'>
                                    Need To Login
                                </h1>
                            </div>
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
