// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./scenes/login/Login";
import Signup from "./scenes/signup/Signup";

import Listflat from "./scenes/listaflat/Listflat";
import LandingPage from "./scenes/Landing Page/Landingpage";

import Home from "./scenes/home/Home";
import Hotel from "./scenes/hotel/Hotel";
import List from "./scenes/list/List";

import { LocationContextProvider } from "./Context/LocationContext";
import Tweets from "./components/Tweets/Tweets";
import Profile from "./scenes/profile/Profile";

function App() {
    return (
        <div className="Apps">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/listflat" element={<Listflat />} />

                    {/* <Route path="/geolocation" element={<GeoAPI />} /> */}

                    <Route path="/landingPage" element={<LandingPage />} />

                    <Route path="/home" element={<Home />} />

                    <Route path="/tweets" element={<Tweets />} />

                    <Route path="/hotels" element={<List />} />
                    <Route path="/hotels/:id" element={<Hotel />} />
                    <Route path="/Profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
