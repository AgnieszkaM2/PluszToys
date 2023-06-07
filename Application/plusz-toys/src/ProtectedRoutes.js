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


    return user;
}

export const ProtectedRoutes = () => {
    const isAuth = auth();
    return isAuth.loggedIn ? <Outlet /> : <Login />;
}

/*
Poziomy dostępu:
1-3 - pracownik zwykły - dostęp: magazyn, zamówienia, strony główne, ustawienia;
4-5 - pracownik biurowy - dostęp: magazyn, zamówienia, sprzedaż, zakupy, strony główne, ustawienia;
6 - hr - dostęp: kadry, strony główne, ustawienia;
7 i wzwyż - kierownicy/administratorzy - dostęp: bez ograniczeń;
*/
