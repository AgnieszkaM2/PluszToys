import './Home.css';
import { Link } from 'react-router-dom';
import ic1 from '../assests/icons8-camera-48.png';
import ic2 from '../assests/icons8-video-call-30.png';
import ic3 from '../assests/icons8-map-pin-50.png';
import ic4 from '../assests/icons8-settings-48.png';
import toys from '../assests/toys.jpg';

export function Home() {
    return (
        <>
            <aside className='home-sidebar'>
                <ul>
                    <li><button align="center" id='btn1'><span><img src={ic1} alt=""/></span>Instagram</button></li>
                    <li><button align="center" id='btn1'><span><img src={ic2} alt=""/></span>Youtube</button></li>
                    <li><button align="center" id='btn1'><span><img src={ic3} alt=""/></span>Adres</button></li>
                    <li><button align="center" id='btn1'><span><img src={ic4} alt=""/></span><Link to="/home_app">Aplikacja</Link></button></li>
                </ul>
            </aside>
            <div align="center">
                <div className='main-home-wrap'>
                    <div id='text-main'>
                        <h1>Plusz Toys</h1>

                    </div>
                    <div id='img-main'>
                        
                    </div>

                </div>
            </div>
            
        </>
    )
}
