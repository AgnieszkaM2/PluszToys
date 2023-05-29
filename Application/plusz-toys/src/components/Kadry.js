import './HomeApp.css';
import {AppNav} from './AppNav';
import ic1 from '../assests/icons8-plus-math-50.png';
import ic2 from '../assests/icons8-filter-50.png';
import ic3 from '../assests/icons8-timeline-week-48.png';
import ic4 from '../assests/icons8-time-machine-48.png';
import React, {Component} from 'react';
import {useState} from 'react';

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
            wyplata: "",

            hours: 0,
            isAddModal:false,
            isStanModal:false,
            isEditModal:false,
            isAddLogsModal:false

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
    
    changeEmployeeName = (e) => {
        this.setState({ imie: e.target.value });
    }
    changeEmployeeStan = (e) => {
        console.log("select value: "+ e.target.value);
        console.log("prev value: "+ this.state.id_stanowisko);
        this.setState({ id_stanowisko: e.target.value });
    }
    changeStanowisko = (e) => {
        this.setState({ nazwa: e.target.value });
    }
    changePay = (e) => {
        this.setState({ pensja: e.target.value });
    }
    changeLvl = (e) => {
        this.setState({ lvl_dostepu: e.target.value });
    }

    refreshPage() {
        window.location.reload(false);
    }

    addEmployee() {
        fetch('https://localhost:7223/api/pracownicyCON/nowy_pracownik?login='+ this.state.imie +'&stanowisko='+ this.state.id_stanowisko, {
            method: 'PUT'
        })
            .then(res => res.json());
            

        this.setState({imie: "", id_stanowisko:0});
        this.refreshPage();
    }

    editEmployee() {
        fetch('https://localhost:7223/api/pracownicyCON/zmiana_stanowisko '+ this.state.id_pra +'?stanowisko='+ this.state.id_stanowisko, {
            method: 'PUT'
        })
            .then(res => res.json());
            

        this.setState({id_pra: 0, id_stanowisko:0});
        this.refreshPage();
    }

    addLogs() {
        fetch('https://localhost:7223/api/logipracyCON/ins_godziny?id='+ this.state.id_pra +'&godziny='+ this.state.hours, {
            method: 'PUT'
        })
            .then(res => res.json());
            

        this.setState({id_pra: 0, hours:0});
        this.refreshPage();
    }

    addStanowisko() {
        fetch('https://localhost:7223/api/stanowiskoCON/'+ this.state.nazwa +'_'+ this.state.pensja +'_'+ this.state.lvl_dostepu, {
            method: 'PUT'
        })
            .then(res => res.json());
            

        this.setState({nazwa: "", pensja: 0, lvl_dostepu: 0});
        this.refreshPage();
    }

    deleteClick(id) {
        if (window.confirm('Czy na pewno chcesz usunąć pracownika?')) {
            fetch('https://localhost:7223/api/pracownicyCON/zwolnienie' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json());

            
            this.refreshPage();    
        }
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
        
        if(st===""){
            st="Niezdefiniowane";
        }
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
            
            if(s.id_stanowisko==nr && (s.pensja!=0 && s.pensja!=null)){
                p=s.pensja;
                h=(pay/p);
                h=Math.round(h);
            }
        });
        

        return h;
    }

    editClick(id) {
        this.addClick(5);
        this.setState({ id_pra: id });
    }

    logClick(id) {
        this.addClick(7);
        this.setState({ id_pra: id });
    }

    addClick(id) {
        if(id==1)
            this.setState({isAddModal: true});
        else if(id==2){
            this.setState({isAddModal: false});
            this.setState({imie: "", id_stanowisko:0});
            document.getElementById('add-select').value = null;
        }else if(id==3)
            this.setState({isStanModal: true});
        else if(id==4){
            this.setState({isStanModal: false});
            this.setState({nazwa: "", pensja: 0, lvl_dostepu: 0});
        }else if(id==5)
            this.setState({isEditModal: true});
        else if(id==6){
            this.setState({isEditModal: false});
            this.setState({id_pra: 0, id_stanowisko:0});
            document.getElementById('edit-select').value = null;
        }else if(id==7)
            this.setState({isAddLogsModal: true});
        else if(id==8){
            this.setState({isAddLogsModal: false});
            this.setState({id_pra: 0, hours:0});
        }   
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
        });
    }

    componentDidMount() {
        this.refreshList();
        this.getStanowisko();
        this.getLogs();
    }

    render() {
        var stawka;
        var godziny;
        var stanowisko;
        var wyplata;
        var lvl;
        var ind=0;
        const {
            employees,
            id_pra,
            data_zatr,
            imie,
            stanowiskostr,
            stanowiska,
            nazwa,
            pensja,
            lvl_dostepu,
            id_stanowisko,
            hours,
            isAddModal,
            isStanModal,
            isEditModal,
            isAddLogsModal
        } = this.state;
        return (
            <>
                <aside className='app-sidebar'>
                    <ul>
                        <li><button type="button" align="center" id='btn2' onClick={() => this.addClick(1)}><span><img src={ic1} alt=""/></span>Dodaj pracownika</button></li>
                        <li><button align="center" id='btn2'><span><img src={ic2} alt=""/></span>Filtruj</button></li>
                        <li><button align="center" id='btn2'><span><img src={ic3} alt=""/></span>Filtruj wg. daty</button></li>
                        <li><button align="center" id='btn2' onClick={() => this.addClick(3)}><span><img src={ic1} alt=""/></span>Dodaj stanowisko</button></li>
                    </ul>
                </aside>
                <AppNav />
                <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Id 
                            </th>
                            <th>
                                Imię, <br />Nazwisko
                            </th>
                            <th>
                                Stanowisko
                            </th>
                            <th>
                                Data <br />zatrudnienia
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
                                <td>{ind+=1}</td>
                                <td>{emp.imie=this.nameFormat(emp.imie)}</td>
                                <td>{stanowisko=this.stanowisko(emp.stanowiskostr)} </td>
                                <td>{emp.data_zatr = emp.data_zatr.slice(0, 10)}</td>
                                <td>{stawka=this.pensjaZasad(emp.stanowiskostr)} </td>
                                <td>{lvl=this.lvlDost(emp.stanowiskostr)} </td>
                                <td>{wyplata=this.getPay(emp.imie)} </td>
                                <td>{godziny=this.getHours(emp.stanowiskostr, wyplata)} </td>
                                <td><button type="button"
                                        className="delete-button"
                                        onClick={() => this.deleteClick(emp.id_pra)}>Usuń
                                    </button>
                                </td>
                                <td><button type="button"
                                        className="edit-button"
                                        onClick={() => this.editClick(emp.id_pra)}>Edytuj stanowisko
                                        
                                    </button>
                                </td>
                                <td><button type="button"
                                        className="edit-button"
                                        onClick={() => this.logClick(emp.id_pra)}>Dodaj godziny
                                        
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
                <div className='add-modal-overlay' style={{display: isAddModal ? 'block' : 'none',}}>
                    <div className='add-modal-container' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Dodaj pracownika</h1>
                            <div>
                            <input type="text" className='modal-input-text' placeholder="ImięNazwisko" value={imie} onChange={this.changeEmployeeName} />
                            </div>
                            <div>
                            <select className="modal-select" id='add-select' defaultValue="null" onChange={this.changeEmployeeStan}>
                                 <option disabled value="null">Wybierz stanowisko</option>
                                {stanowiska.map(s =>
                                     <option key={s.id_stanowisko} value={s.id_stanowisko}>
                                        {s.nazwa} 
                                     </option>)}
                             </select>
                            </div>
                            <br />
                            <button type="button" onClick={() => this.addEmployee()}>Dodaj</button>
                            <br />
                            <button type="button" onClick={() => this.addClick(2)}>Anuluj</button>
                        </div>

                    </div>

                </div>
                <div className='stan-modal-overlay' style={{display: isStanModal ? 'block' : 'none',}}>
                    <div className='stan-modal-container' align="center">
                        <div className='stan-modal'>
                            <h1 className='mod-title'>Dodaj stanowisko</h1>
                            <div>
                            <label htmlFor="nazwa">Wprowadź nazwę stanowiska: </label>
                            <input type="text" className='modal-input-text' placeholder="Nazwa" value={nazwa} onChange={this.changeStanowisko}/>
                            </div>
                            <div>
                            <label htmlFor="stawka">Wprowadź stawkę godzinową dla stanowiska: </label>
                            <input type="number" className='modal-input-number' placeholder="Stawka" value={pensja} onChange={this.changePay}/>
                            </div>
                            <div>
                            <label htmlFor="lvl">Wprowadź poziom dostępu stanowiska: </label>
                            <input type="number" className='modal-input-number' placeholder="Poziom dostępu" value={lvl_dostepu} onChange={this.changeLvl}/>
                            </div>
                            <br />
                            <button type="button" onClick={() => this.addStanowisko()}>Dodaj</button>
                            <br />
                            <button type="button" onClick={() => this.addClick(4)}>Anuluj</button>
                        </div>

                    </div>

                </div>
                <div className='edit-modal-overlay' style={{display: isEditModal ? 'block' : 'none',}}>
                    <div className='edit-modal-container' align="center">
                        <div className='edit-modal'>
                            <h1 className='mod-title'>Zmień stanowisko pracownika</h1>
                            <div>
                            <label htmlFor="stan">Wybór nowego stanowiska: </label>
                            <select className="modal-select" id='edit-select' defaultValue="null" onChange={this.changeEmployeeStan}>
                                 <option disabled value="null">Wybierz stanowisko</option>
                                {stanowiska.map(s =>
                                     <option key={s.id_stanowisko} value={s.id_stanowisko}>
                                        {s.nazwa} 
                                     </option>)}
                             </select>
                            </div>
                            <br />
                            <button type="button" onClick={() => this.editEmployee()}>Zapisz</button>
                            <br />
                            <button type="button" onClick={() => this.addClick(6)}>Anuluj</button>
                        </div>

                    </div>

                </div>
                <div className='add-modal-overlay' style={{display: isAddLogsModal ? 'block' : 'none',}}>
                    <div className='add-modal-container' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Dodaj godziny pracy pracownika dla danego miesiąca</h1>
                            <div>
                            <label htmlFor="log">Wprowadź ilość godzin, którą chcesz dodać: </label><br />
                            <input type="number" className='modal-input-number' placeholder="Godziny" value={hours} onChange={(e) => this.setState({ hours: e.target.value })}/>
                            </div>
                            <br />
                            <button type="button" onClick={() => this.addLogs()}>Dodaj</button>
                            <br />
                            <button type="button" onClick={() => this.addClick(8)}>Anuluj</button>
                        </div>

                    </div>

                </div>
                
            </>
        );
    }
    
}