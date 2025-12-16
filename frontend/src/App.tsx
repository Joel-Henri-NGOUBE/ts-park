import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import LogIn from "./Pages/Login/LogIn";
import Home from "./Pages/Home/Home";
import Challenge from "./Pages/Challenge/Challenge";
import Room from "./Pages/Room/Room";
import PrivateRoute from "./Components/PrivateRoutes";
import Admin from "./Pages/Admin/Admin";
import Utilisateurs from "./Pages/Admin/Utilisateurs";
import Exercice from "./Pages/Exercice/Exercice";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/" element={<Home />} />
      <Route path="/challenge" element={<Challenge />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/utilisateurs" element={<Utilisateurs />} />
      <Route path="/admin/exercices" element={<Exercice />} />
      <Route element={<PrivateRoute />}>
        <Route path="/addrooms" element={<Room />} />

        {/* <Route path="/rooms/:id" element={<AddOrSetOffer />}/> */}
        {/* </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
