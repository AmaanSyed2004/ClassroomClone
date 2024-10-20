import Home from "./pages/Home";
import "./App.css";
import Auth from "./pages/Auth";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Join from "./pages/Join";
import Class from "./pages/Class";
import ProtectedRouteTeacher from "./components/ProtectedRouteTeacher";
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
            <Route index element={<div>Teacher</div>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
