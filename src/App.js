import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Chat from "./pages/Chat";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import SetAvatar from "./pages/SetAvatar";
import HomePage from "./pages/HomePage";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {createContext, useState} from "react";
export const ThemeContext = createContext(null);

function App() {

    return (
            <BrowserRouter>
                <Provider store={store}>
                    <Routes>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/" element={<HomePage/>}/>
                    </Routes>
                </Provider>
            </BrowserRouter>
    );
}

export default App;
