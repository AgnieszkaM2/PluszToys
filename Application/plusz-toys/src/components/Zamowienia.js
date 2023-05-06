import './HomeApp.css';
import {AppNav} from './AppNav';
import ic1 from '../assests/icons8-plus-math-50.png';
import ic2 from '../assests/icons8-filter-50.png';
import ic3 from '../assests/icons8-timeline-week-48.png';
import ic4 from '../assests/icons8-time-machine-48.png';

export function Zamowienia() {
    return (
        <>
            <aside className='app-sidebar'>
                <ul>
                    <li><button align="center" id='btn2'><span><img src={ic1} alt=""/></span>Nowe zamówienie</button></li>
                    <li><button align="center" id='btn2'><span><img src={ic2} alt=""/></span>Filtruj</button></li>
                    <li><button align="center" id='btn2'><span><img src={ic3} alt=""/></span>Filtruj wg. daty</button></li>
                    <li><button align="center" id='btn2'><span><img src={ic4} alt=""/></span>Zakończenie zamówienia</button></li>
                </ul>
            </aside>
            <AppNav />
            <div></div>
        </>
    )
}