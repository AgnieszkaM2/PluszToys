import { Link } from 'react-router-dom';
import '../App.css';
import userImg from '../assests/icons8-customer-48.png';
import settingImg from '../assests/icons8-settings-48.png';


export function MainNav() {
    return (
        <>
            <nav className='main-nav-bar'>
                <div className='app-name'>
                    <Link to ="/"><h1 id='app-name'>PluszToys</h1></Link>
                </div>
                <div className='rest-nav'>
                    <Link to ="/login" id='login-img'><img src={userImg} alt=""/></Link>
                    <Link to ="/settings" id='settings-img'><img src={settingImg} alt="" id='settings-img' /></Link>
                </div>
                
            </nav>
        </>
    )
}