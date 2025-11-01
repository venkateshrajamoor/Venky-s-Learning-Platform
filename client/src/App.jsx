import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css"
import About from "./pages/About";
import Service from "./pages/Service";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import Error from "./pages/Error";
import  Logout  from "./pages/Logout";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminUsers from "./pages/AdminUsers";
import AdminContacts from "./pages/AdminContacts";
import AdminServices from "./pages/AdminServices";
import AdminUserUpdate from "./pages/AdminUserUpdate";
import AdminSUpdate from "./pages/AdminSUpdate";
import CourseDetails from "./pages/CourseDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <HashRouter>
    {location.pathname === "/" && <Navbar />}
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/service" element={<Service />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Error />} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/admin" element={<AdminLayout/>}>
        <Route path="users" element={<AdminUsers/>}/>
        <Route path="contacts" element={<AdminContacts/>}/>
        <Route path="services" element={<AdminServices/>}/>
        <Route path="users/update/:id" element={<AdminUserUpdate />} />
        <Route path="services/update/:id" element={<AdminSUpdate />} />
      </Route>
    </Routes>
    <ToastContainer
       position="top-right"      // ✅ show toast at top-right
        autoClose={3000}          // auto close in 3s
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"           // colored theme allows custom bg
        toastClassName="custom-toast" 
      />
    <Footer/>
  </HashRouter>

);

export default App;
