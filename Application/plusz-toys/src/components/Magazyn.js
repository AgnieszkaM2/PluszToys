import './HomeApp.css';
import {AppNav} from './AppNav';
import ic1 from '../assests/icons8-plus-math-50.png';
import ic2 from '../assests/icons8-filter-50.png';
import ic3 from '../assests/icons8-time-machine-48.png';

export function Magazyn() {
    return (
        <>
            <aside className='app-sidebar'>
                <ul>
                    <li><button align="center" id='btn2'><span><img src={ic1} alt=""/></span>Nowy materiał</button></li>
                    <li><button align="center" id='btn2'><span><img src={ic2} alt=""/></span>Filtruj</button></li>
                    <li><button align="center" id='btn2'><span><img src={ic3} alt=""/></span>Zakończenie ważności</button></li>
                </ul>
            </aside>
            <AppNav />
            <div></div>
        </>
    )
}