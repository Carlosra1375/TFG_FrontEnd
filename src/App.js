import React, {useState, useEffect} from "react";
//import {Button, Alert} from "react-bootstrap";
import SignInSignUp from "./page/SignInSignUp";
import {ToastContainer} from "react-toastify";
import {AuthContext} from "./utils/contexts";
import {isUserLogedApi} from "./api/auth";
import Routing from "./routes/Routing";

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    setUser(isUserLogedApi());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin]);

  if (!loadUser) return null;

  return(
    <AuthContext.Provider value={user}>
        {user ? (<Routing setRefreshCheckLogin={setRefreshCheckLogin}/>) : (<SignInSignUp setRefreshCheckLogin={setRefreshCheckLogin}/>)}

        <ToastContainer position="top-right" autoClose={5000} hideProgressBar 
        newestOnTop={false} closeOnClick rtl={false}
        pauseOnVisibilityChange draggable pauseOnHover/>
    </AuthContext.Provider>
  );
}


