import { Outlet } from "react-router-dom";
import { HomeApp } from "./components/HomeApp";

const accessing = () => {
    let lvl=0;
    lvl=localStorage.getItem('userLvl');
    if(lvl!=="none"){
        lvl=Number(lvl);
    }
    
    const user = {
        userLvl: 0,
        access: false
    };
    if(lvl>=7) {
        user.userLvl=lvl;
        user.access=true;
    }


    return user && user.access;
}

export const RouteAdmin = () => {
    const isAccessing = accessing();
    return isAccessing ? <Outlet /> : <HomeApp />;
}