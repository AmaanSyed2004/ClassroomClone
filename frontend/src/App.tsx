import Home from "./pages/Home";
import "./App.css";
import Auth from "./pages/Auth";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Join from "./pages/Join";
import Class from "./pages/Class";
import HomePage from "./pages/Teacher/HomePage";
import ProtectedRouteTeacher from "./components/ProtectedRouteTeacher";
import CreateClass from "./pages/Teacher/CreateClass";
import ClassTeacher from "./pages/Teacher/ClassTeacher";
import Invite from "./pages/Teacher/Invite";
function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<ProtectedRoute />}>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/home/join" element={<Join />} />
                <Route path="/home/course/:id" element={<Class/>} />
            </Route>
          </Route>
          <Route path="/HomePage" element={<ProtectedRouteTeacher />}>
            <Route element={<Layout/>}>
              <Route index element={<HomePage/>}/>
              <Route path="/HomePage/course/:id" element={<ClassTeacher/>} />
              <Route path="/HomePage/create" element={<CreateClass/>} />
              <Route path="/HomePage/invite" element={<Invite/>} />
            </Route>  
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
