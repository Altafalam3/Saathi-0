// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./scenes/login/Login";
import Signup from "./scenes/signup/Signup";
import Shorts from "./components/Reels/Reels";
import Listflat from "./scenes/listaflat/Listflat";
import MatchedUsers from "./scenes/matchedUsers/MatchedUsers";
import Tabs from "./components/tabs/Tabs";
import Home from "./scenes/home/Home";
import Hotel from "./scenes/hotel/Hotel";
import List from "./scenes/list/List";

import { LocationContextProvider } from "./Context/LocationContext";
import Tweets from "./components/Tweets/Tweets";
import Dashboard from "./scenes/dashboard/Dashboard";
import PostFlat from "./scenes/postflat/PostFlat";

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

                    <Route path="/home" element={<Home />} />

                    <Route path="/tweets" element={<Tweets />} />
                    <Route path="/shorts" element={<Shorts />} />

                    <Route path="/hotels" element={<List />} />
                    <Route path="/hotels/:id" element={<Hotel />} />
                    <Route path="/MatchedUsers" element={<MatchedUsers />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/postflat" element={<PostFlat/>} />
                    <Route path="/Tabs" element={<Tabs />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
