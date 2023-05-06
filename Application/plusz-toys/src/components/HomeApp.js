import './HomeApp.css';
import {AppNav} from './AppNav';
import ic1 from '../assests/icons8-time-machine-48.png';

export function HomeApp() {
    return (
        <>
            <aside className='app-sidebar'>
                    <ul>
                        <li><button align="center" id='btn2'><span><img src={ic1} alt=""/></span>Czas pracy</button></li>
                    </ul>
                </aside>
                <AppNav />
                <hr /> 
                <div>
                    
                    <h2 align="center" >Użytkownik : .....</h2>
                </div> 
        </>

        
    )
}