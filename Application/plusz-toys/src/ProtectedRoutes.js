import { Outlet } from "react-router-dom";
import { Login } from "./components/Login";

const auth = () => {
    let id=0;
    id=localStorage.getItem('userId');
    if(id!=="none"){
        id=Number(id);
    }
    
    const user = {
        userId: 0,
        loggedIn: false
    };
    if(id!==0 && id!=="none") {
        user.userId=id;
        user.loggedIn=true;
    }


    return user && user.loggedIn;
}

export const ProtectedRoutes = () => {
    const isAuth = auth();
    return isAuth ? <Outlet /> : <Login />;
}
