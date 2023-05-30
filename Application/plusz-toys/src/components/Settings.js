import './HomeApp.css';

const logOut = () =>{
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userlvl');
    window.location.replace("/home");
}

export function Settings() {
    return (
        <>
            <div className='app-wrap'>
              <h1 align="center">Ustawienia</h1> 
              <div align="center">
                 <button id='reject' onClick={() => logOut}>Wyloguj</button>
              </div> 
            </div>
            
        </>
    )
}