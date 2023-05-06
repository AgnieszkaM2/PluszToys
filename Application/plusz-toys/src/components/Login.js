import './HomeApp.css';
import './Login.css';

import userImg from '../assests/icons8-customer-32.png';
import passImg from '../assests/icons8-password-key-24.png'

export function Login() {
    return (
        <><div className='app-wrap'><h1 align='center'>Logowanie</h1>

            <div align='center'>
            <form className='form' align='center'>
                <div>
                    <img src={userImg} alt="" className='icon user' />
                    <input type="email" className='mainInputStyle input' placeholder="Email or Username" />
                </div>
                <div>
                    <img src={passImg} alt="" className='icon pass' />
                    <input type="password" className='mainInputStyle input' placeholder="Password" />
                </div>
                <button className='mainInputStyle loginBtn'>Login</button>
            </form>
            </div>

        </div>

        </>

    )
}