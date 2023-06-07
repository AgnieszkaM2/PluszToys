import './HomeApp.css';
import './Login.css';

import userImg from '../assests/icons8-customer-32.png';
import passImg from '../assests/icons8-password-key-24.png'
import React, {Component} from 'react';
import {useEffect, useState} from 'react';

export function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [stanowiska, setStanowiska] = useState([]);
    const [message, setMessage] = useState(false);
    const [id_pra, setId] = useState(0);
    const [lvl_dostepu, setLvl] = useState(0);
    const [imie, setImie] = useState("");
    const [credentials, setCredentials] = useState([]);


    useEffect(() => {
        getStanowisko();

        },[])
    
    useEffect(() => {

        if(credentials!==null) {
            credentials.map(s=> {
                let lvl=0;
                lvl=lvlDost(s.stanowiskostr);
                setLvl(lvl);
                setId(s.id_pra);
                setImie(username);
                console.log(imie);
                console.log(lvl_dostepu);
                console.log(id_pra);

                localStorage.setItem('userName', username);
                localStorage.setItem('userId', id_pra);
                localStorage.setItem('userLvl', lvl_dostepu);
                check();


            });
            
            
        }else {
            setMessage(true);
        };
        
        },[credentials])

    useEffect(() => {
        if(id_pra!==0) {
            localStorage.setItem('userName', imie);
            localStorage.setItem('userId', id_pra);
            localStorage.setItem('userLvl', lvl_dostepu);
            window.location.replace("/home_app");
        }

        },[id_pra])    

    async function getStanowisko() {
        return fetch('https://localhost:7223/api/stanowiskoCON/all', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setStanowiska(data);
                
            });
    }

    async function logIn(login, haslo) {
        return fetch('https://localhost:7223/api/pracownicyCON/login?login='+login+'&haslo='+haslo, {
            method: 'GET'
        })
            .then(response => response.json())
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const responseData = await logIn(username,password);
        
        setCredentials(responseData);

    }

    const check = async () => {

        if(credentials!==null) {
            credentials.map(s=> {
                let lvl=0;
                lvl=lvlDost(s.stanowiskostr);
                setLvl(lvl);
                setId(s.id_pra);
                setImie(username);
                console.log(imie);
                console.log(lvl_dostepu);
                console.log(id_pra);

                localStorage.setItem('userName', username);
                localStorage.setItem('userId', id_pra);
                localStorage.setItem('userLvl', lvl_dostepu);


            });
            
            
        }else {
            setMessage(true);
        };
    }



    function lvlDost(nr) {
        nr=Number(nr);
        var p=0;
        stanowiska.map(s=> {
            
            if(s.id_stanowisko==nr){
                p=s.lvl_dostepu;
            }
        });
        

        return p;
    }

    function refreshPage() {
        window.location.reload(false);
    }
        


    return (
        <>
            <div className='app-wrap'><h1 align='center'>Logowanie</h1>
    
                <div align='center'>
                <div className='form' align='center' style={{display: message ? 'none' : '',}}>
                    <div>
                        <img src={userImg} alt="" className='icon user' />
                        <input type="text" className='mainInputStyle input' placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div>
                        <img src={passImg} alt="" className='icon pass' />
                        <input type="password" className='mainInputStyle input' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className='mainInputStyle loginBtn' onClick={handleSubmit} >Login</button>
                </div>
                </div>
    
            </div>
            <div className='add-modal-overlay' style={{display: message ? 'block' : 'none',}}>
                    <div className='add-modal-container' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Błędny login lub hasło</h1>
                            <br />
                            <div>
                                <button type="button" id='reject' className='login-failed' onClick={() => refreshPage()}>Spróbuj ponownie</button>
                            </div>
                            
                        </div>

                    </div>

                </div>
    
            </>
    )
}



