
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/home";
// import Login from "./pages/login";
// import Register from "./pages/register";

// function AppRoutes(){
//     return(
//         <BrowserRouter>
       
//             <Routes>
//                 <Route path="/" element={<Login/>}></Route>
//                 <Route path="home" element={<Home />}></Route>
//                 <Route path="register" element={<Register />}></Route>
//             </Routes>
          
//         </BrowserRouter>
//     )
// }

// export default AppRoutes;


import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

function AppRoutes() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if user is authenticated and has a token
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!authenticated ? <Login setAuthenticated={setAuthenticated} /> : <Home />}
        ></Route>
        <Route path="register" element={<Register />} />
        <Route
          path="home"
          element={authenticated ? <Home /> : <Link to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
