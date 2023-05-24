import "./App.css";
import Rate from "./Components/Rate";
import Addrate from "./Components/Addrate";
import Images from "./Components/Images";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./Components/RequireAuth";
import PersistLogin from "./Components/PersistLogin";
import Layout from "./Components/Layout";
import Missing from "./Components/Missing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes*/}
        <Route path="/" element={<Rate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes*/}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/addrate" element={<Addrate />} />
            <Route path="/images" element={<Images />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
