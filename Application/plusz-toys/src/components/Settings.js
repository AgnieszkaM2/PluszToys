import './HomeApp.css';
import {useEffect, useState} from 'react';






export function Settings() {
    const [userId, setId] = useState();
    const [newPass, setNewPass] = useState();
    const [oldPass, setOldPass] = useState();
    const [isModal, setModal] = useState(false);

    const logOut = () =>{
        localStorage.setItem('userName', "none");
        localStorage.setItem('userId', "none");
        localStorage.setItem('userLvl', "none");
        window.location.replace("/");
    }

    useEffect(() => {
        details();

        },[])

    function details() {
        let id=0;
        id=localStorage.getItem('userId');
        id=Number(id);
        setId(id);
    }

    function updatePass() {
        fetch('https://localhost:7223/api/pracownicyCON/update_password?id='+userId+'&starehaslo='+oldPass+'&nowehaslo='+newPass, {
            method: 'PUT'
        })
            .then(response => {
                if(response.ok) {
                    alert("Hasło zmienione poprawnie. Zaloguj się ponownie");
                    localStorage.setItem('userName', "none");
                    localStorage.setItem('userId', "none");
                    localStorage.setItem('userLvl', "none");
                    window.location.replace("/login");

                }else{
                    alert("Błąd przy zmianie hasła. Spróbuj ponownie");
                    refreshPage();
                }
            })
    }

    function changePass() {
        if((userId!=="none" && (newPass!==null)&& (oldPass!==null))) {
            updatePass();
        }else{
            alert("Błędne dane");
        }

    }

    function refreshPage() {
        window.location.reload(false);
    }


    return (
        <>
            <div className='app-wrap'>
              <h1 align="center">Ustawienia</h1> 
              <br />
              <div align="center">
                 <button id='reject' onClick={()=>logOut()}>Wyloguj</button>
              </div> 
              <br />
              <hr />
              <br />
              <div align="center">
              <button id='accept' onClick={()=>setModal(true)}>Zmień hasło</button>
              </div>
              <div className='add-modal-overlay' style={{display: isModal ? 'block' : 'none',}}>
                    <div className='add-modal-container' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Zmień hasło</h1>
                            <div>
                            <label htmlFor="nazwa">Stare hasło: </label><br /><br />
                            <input type="password" className='modal-input-text' placeholder="Stare hasło" value={oldPass} onChange={(e) => setOldPass(e.target.value)} />
                            </div>
                            <div>
                            <label htmlFor="nazwa">Nowe hasło: </label><br /><br />
                            <input type="password" className='modal-input-text' placeholder="Nowe hasło" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                            </div>
                            <br />
                            <button type="button" id='accept' onClick={() => changePass()}>Zmień</button>

                            <button type="button" id='reject' onClick={()=>setModal(false)}>Anuluj</button>
                        </div>

                    </div>

                </div>
            </div>
            
        </>
    )
}