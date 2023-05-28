import './HomeApp.css';
import {AppNav} from './AppNav';
import ic1 from '../assests/icons8-plus-math-50.png';
import ic2 from '../assests/icons8-filter-50.png';
import ic3 from '../assests/icons8-timeline-week-48.png';
import ic4 from '../assests/icons8-time-machine-48.png';
import React, {Component} from 'react';

export class Kadry extends Component{
    constructor(props) {
        super(props);

        this.state = {
            employees: [], 
            id_pra: 0,
            data_zatr: "",
            imie: "",
            stanowiskostr: "",

            stanowiska: [],
            id_stanowisko: 0,
            nazwa:"",
            pensja:0,
            lvl_dostepu: 0,

            logi: [],
            wyplata: ""

        }
    }

    nameFormat(name) {
        var n = name;
        if ((name.split(/(?=[A-Z])/)).length>0) {
            n= name.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1).join(" ");
        }


        return n;
    }

    refreshList() {

        fetch('https://localhost:7223/api/pracownicyCON/all', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ employees: data });
            });
    }
    

    addEmployee() {

    }

    getStanowisko() {
        fetch('https://localhost:7223/api/stanowiskoCON/all', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ stanowiska: data });
            });
    }

    stanowisko(nr) {
        nr=Number(nr);
        var st="";
        this.state.stanowiska.map(s=> {
            
            if(s.id_stanowisko==nr){
                st=s.nazwa;
            }
        });
        

        return st;
    }

    pensjaZasad(nr) {
        nr=Number(nr);
        var p=0;
        this.state.stanowiska.map(s=> {
            
            if(s.id_stanowisko==nr){
                p=s.pensja;
            }
        });
        

        return p;
    }

    lvlDost(nr) {
        nr=Number(nr);
        var p=0;
        this.state.stanowiska.map(s=> {
            
            if(s.id_stanowisko==nr){
                p=s.lvl_dostepu;
            }
        });
        

        return p;
    }

    getPay(name) {
        var p=0;
        this.state.logi.map(l=> {
            
            if(l.imie===name){
                p=l.wyplata;
            }
        });
        

        return p;

    }

    getHours(nr, pay) {
        nr=Number(nr);
        var h=0;
        var p=0;
        this.state.stanowiska.map(s=> {
            
            if(s.id_stanowisko==nr){
                p=s.pensja;
                h=(pay/p);
                h=Math.round(h);
            }
        });
        

        return h;
    }

    getLogs() {
        const d = new Date();
        let month = d.getMonth()+1;

        fetch('https://localhost:7223/api/logipracyCON?miesiec=' + month, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ logi: data });
            console.log(data);
        });
    }

    componentDidMount() {
        this.refreshList();
        this.getStanowisko();
        this.getLogs();
    }

    render() {
        var pensja;
        var godziny;
        var stanowisko;
        var wyplata;
        var lvl;
        const {
            employees,
            id_pra,
            data_zatr,
            imie,
            stanowiskostr,
            stanowiska,
            nazwa,
            id_stanowisko
        } = this.state;
        return (
            <>
                <aside className='app-sidebar'>
                    <ul>
                        <li><button align="center" id='btn2'><span><img src={ic1} alt=""/></span>Dodaj pracownika</button></li>
                        <li><button align="center" id='btn2'><span><img src={ic2} alt=""/></span>Filtruj</button></li>
                        <li><button align="center" id='btn2'><span><img src={ic3} alt=""/></span>Filtruj wg. daty</button></li>
                        <li><button align="center" id='btn2'><span><img src={ic4} alt=""/></span>Zakończenie kontraktu</button></li>
                    </ul>
                </aside>
                <AppNav />
                <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Id Pracownika
                            </th>
                            <th>
                                Imie Nazwisko
                            </th>
                            <th>
                                Stanowisko
                            </th>
                            <th>
                                Data zatrudnienia
                            </th>
                            <th>
                                Stawka zasadnicza <br/>(godzinowa)
                            </th>
                            <th>
                                Poziom dostępu
                            </th>
                            <th>
                                Wypłata <br/>(obecny miesiąc)
                            </th>
                            <th>
                                Godziny pracy <br/>(obecny miesiąc)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp =>
                            <tr key={emp.id_pra}>
                                <td>{emp.id_pra}</td>
                                <td>{emp.imie=this.nameFormat(emp.imie)}</td>
                                <td>{stanowisko=this.stanowisko(emp.stanowiskostr)} </td>
                                <td>{emp.data_zatr = emp.data_zatr.slice(0, 10)}</td>
                                <td>{pensja=this.pensjaZasad(emp.stanowiskostr)} </td>
                                <td>{lvl=this.lvlDost(emp.stanowiskostr)} </td>
                                <td>{wyplata=this.getPay(emp.imie)} </td>
                                <td>{godziny=this.getHours(emp.stanowiskostr, wyplata)} </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
                
            </>
        );
    }
    
}