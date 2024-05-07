import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Global } from './context/GlobalState';
import Navigation from './components/Navigation';
import TodoComponent from './components/TodoComponent';
import PlaceholderPage from './components/PlaceholderPage';
import LogComponent from './components/LogComponent';

export default function App() {
    return (
        <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
                <Global Root={() => (
                    <>
                        <Navigation />
                        <Routes>
                            <Route path="/" element={<PlaceholderPage />} />
                            <Route path="/todos" element={<TodoComponent />} />
                            <Route path="/about" element={<PlaceholderPage headline="About Page" />} />
                            <Route path="/contact" element={<PlaceholderPage headline="Contact Page" />} />
                            <Route path="/logs" element={<LogComponent/>}/>
                        </Routes>
                    </>
                )} />
            </Box>
        </BrowserRouter>
    );
}
