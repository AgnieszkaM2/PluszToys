import './HomeApp.css';
import {AppNav} from './AppNav';
import ic1 from '../assests/icons8-plus-math-50.png';
import ic2 from '../assests/icons8-filter-50.png';
import ic3 from '../assests/icons8-timeline-week-48.png';

export function ZakupyDostawy() {
    return (
        <>
            <aside className='app-sidebar'>
                <ul>
                    <li><button align="center" id='btn2'><span><img src={ic1} alt=""/></span>Nowy zakup</button></li>
                    <li><button align="center" id='btn2'><span><img src={ic1} alt=""/></span>Nowa dostawa</button></li>
                    <li><button align="center" id='btn2'><span><img src={ic2} alt=""/></span>Filtruj zakupy</button></li>
                    <li><button align="center" id='btn2'><span><img src={ic2} alt=""/></span>Filtruj dostawy</button></li>
                    <li><button align="center" id='btn2'><span><img src={ic3} alt=""/></span>Filtruj wg. daty zakupy</button></li>
                    <li><button align="center" id='btn2'><span><img src={ic3} alt=""/></span>Filtruj wg. daty dostawy</button></li>
                </ul>
            </aside>
            <AppNav />
            <div></div>
        </>
    )
}