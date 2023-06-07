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
            isAddLogsModal:false,
            isFilterName:false,
            isFilterStan:false,
            isFilterLvl:false,
            nameFilter:"",
            stanFilter:0,
            lvlFilter:0,
            filtered:[]


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
        console.log("ogolne: "+name);
        if(this.state.logi!==null){
            this.state.logi.map(l=> {
            
                if(l.imie==name){
                    p=l.wyplata;
                }
            });
        }
        
        

        return p;

    }

    getHours(nr, pay) {
        nr=Number(nr);
        var h=0;
        var p=0;
        this.state.stanowiska.map(s=> {
            
            if(s.id_stanowisko==nr && (s.pensja!==0 && s.pensja!==null)){
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

    filterName() {
        const filtered = this.state.employees.filter(employee => {
            return (employee.imie).includes(this.state.nameFilter);
            
        });
        this.setState({employees:filtered});
        this.setState({isFilterName:false});
    }
    filterStan() {
        const filtered = this.state.employees.filter(employee => {
            return employee.stanowiskostr == this.state.stanFilter;
            
        });
        this.setState({employees:filtered});
        this.setState({isFilterStan:false});

    }
    filterLvl() {
        const filtered = this.state.employees.filter(employee => {
            return this.lvlDost(employee.stanowiskostr) == this.state.lvlFilter;
            
        });
        this.setState({employees:filtered});
        this.setState({isFilterLvl:false});
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
        var formattedName="";
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
            isAddLogsModal,
            isFilterName,
            isFilterStan,
            isFilterLvl,
            nameFilter,
            stanFilter,
            lvlFilter
        } = this.state;
        return (
            <>
                <aside className='app-sidebar'>
                    <ul>
                        <li><button type="button" align="center" id='btn2' onClick={() => this.addClick(1)}><span><img src={ic1} alt=""/></span>Dodaj pracownika</button></li>
                        <li><button align="center" id='btn2' onClick={()=>this.setState({isFilterName:true})}><span><img src={ic2} alt=""/></span>Filtruj wg. imienia</button></li>
                        <li><button align="center" id='btn2' onClick={()=>this.setState({isFilterStan:true})}><span><img src={ic2} alt=""/></span>Filtruj wg. stanowiska</button></li>
                        <li><button align="center" id='btn2' onClick={()=>this.setState({isFilterLvl:true})}><span><img src={ic2} alt=""/></span>Filtruj wg. poziomu dostępu</button></li>
                        <li><button align="center" id='btn2' onClick={()=>this.refreshList()}><span><img src={ic2} alt=""/></span>Resetuj filtry</button></li>
                        <li><button align="center" id='btn2' onClick={() => this.addClick(3)}><span><img src={ic1} alt=""/></span>Dodaj stanowisko</button></li>
                    </ul>
                </aside>
                <AppNav />
                <div>
                <table className="table-data">
                    <thead id='head'>
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
                            <th>
                                
                            </th>
                            <th>
                                
                            </th>
                            <th>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody id='body'>
                        {employees.map(emp =>
                            <tr key={emp.id_pra}>
                                <td>{ind+=1}</td>
                                <td>{formattedName=this.nameFormat(emp.imie)}</td>
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
                            <label htmlFor="nazwa">Wprowadź imię i nazwisko pracownika: </label><br /><br />
                            <input type="text" className='modal-input-text' placeholder="ImięNazwisko" value={imie} onChange={this.changeEmployeeName} />
                            </div><br />
                            <div className='selecting2'>
                            <select className="modal-select" id='add-select' defaultValue="null" onChange={this.changeEmployeeStan}>
                                 <option disabled value="null">Wybierz stanowisko</option>
                                {stanowiska.map(s =>
                                     <option key={s.id_stanowisko} value={s.id_stanowisko}>
                                        {s.nazwa} 
                                     </option>)}
                             </select>
                            </div>
                            <br />
                            <button type="button" id='accept' onClick={() => this.addEmployee()}>Dodaj</button>

                            <button type="button" id='reject' onClick={() => this.addClick(2)}>Anuluj</button>
                        </div>

                    </div>

                </div>
                <div className='add-modal-overlay' style={{display: isStanModal ? 'block' : 'none',}}>
                    <div className='add-modal-container' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Dodaj stanowisko</h1>
                            <div>
                            <label htmlFor="nazwa">Wprowadź nazwę stanowiska: </label><br /><br />
                            <input type="text" className='modal-input-text' placeholder="Nazwa" value={nazwa} onChange={this.changeStanowisko}/>
                            </div>
                            <div>
                            <label htmlFor="stawka">Wprowadź stawkę godzinową dla stanowiska: </label><br /><br />
                            <input type="number" className='modal-input-number' placeholder="Stawka" value={pensja} onChange={this.changePay}/>
                            </div>
                            <div>
                            <label htmlFor="lvl">Wprowadź poziom dostępu stanowiska: </label><br /><br />
                            <input type="number" className='modal-input-number' placeholder="Poziom dostępu" value={lvl_dostepu} onChange={this.changeLvl}/>
                            </div>
                            <br />
                            <button type="button" id='accept' onClick={() => this.addStanowisko()}>Dodaj</button>

                            <button type="button" id='reject' onClick={() => this.addClick(4)}>Anuluj</button>
                        </div>

                    </div>

                </div>
                <div className='add-modal-overlay' style={{display: isEditModal ? 'block' : 'none',}}>
                    <div className='add-modal-container' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Zmień stanowisko pracownika</h1>
                            <div className='selecting2'>
                            <label htmlFor="stan">Wybór nowego stanowiska: </label><br /><br />
                            <select className="modal-select" id='edit-select' defaultValue="null" onChange={this.changeEmployeeStan}>
                                 <option disabled value="null">Wybierz stanowisko</option>
                                {stanowiska.map(s =>
                                     <option key={s.id_stanowisko} value={s.id_stanowisko}>
                                        {s.nazwa} 
                                     </option>)}
                             </select>
                            </div>
                            <br />
                            <button type="button" id='accept' onClick={() => this.editEmployee()}>Zapisz</button>
                            <button type="button" id='reject' onClick={() => this.addClick(6)}>Anuluj</button>
                        </div>

                    </div>

                </div>
                <div className='add-modal-overlay' style={{display: isAddLogsModal ? 'block' : 'none',}}>
                    <div className='add-modal-container' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Dodaj godziny pracy pracownika dla danego miesiąca</h1>
                            <div>
                            <label htmlFor="log">Wprowadź ilość godzin, którą chcesz dodać: </label><br /><br />
                            <input type="number" className='modal-input-number' placeholder="Godziny" value={hours} onChange={(e) => this.setState({ hours: e.target.value })}/>
                            </div>
                            <br />
                            <button type="button" id='accept' onClick={() => this.addLogs()}>Dodaj</button>
                            <button type="button" id='reject' onClick={() => this.addClick(8)}>Anuluj</button>
                        </div>

                    </div>

                </div>
                <div className='add-modal-overlay' style={{display: isFilterName ? 'block' : 'none',}}>
                    <div className='add-modal-container' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Filtruj</h1>
                            <div>
                            <label htmlFor="nazwa">Wprowadź imię: </label><br /><br />
                            <input type="text" className='modal-input-text' placeholder="ImięNazwisko" value={nameFilter} onChange={(e) => this.setState({ nameFilter: e.target.value })} />
                            </div>
                            <br />
                            <button type="button" id='accept' onClick={() => this.filterName()}>Filtruj</button>

                            <button type="button" id='reject' onClick={() => this.setState({isFilterName:false})}>Anuluj</button>
                        </div>

                    </div>

                </div>
                <div className='add-modal-overlay' style={{display: isFilterStan ? 'block' : 'none',}}>
                    <div className='add-modal-container' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Filtruj</h1>
                            <div className='selecting2'>
                            <select className="modal-select" id='add-select' defaultValue="null" onChange={(e) => this.setState({ stanFilter: e.target.value })}>
                                 <option disabled value="null">Wybierz stanowisko</option>
                                {stanowiska.map(s =>
                                     <option key={s.id_stanowisko} value={s.id_stanowisko}>
                                        {s.nazwa} 
                                     </option>)}
                             </select>
                            </div>
                            <br />
                            <button type="button" id='accept' onClick={() => this.filterStan()}>Filtruj</button>

                            <button type="button" id='reject' onClick={() => this.setState({isFilterStan:false})}>Anuluj</button>
                        </div>

                    </div>

                </div>
                <div className='add-modal-overlay' style={{display: isFilterLvl ? 'block' : 'none',}}>
                    <div className='add-modal-container' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Filtruj</h1>
                            <div>
                            <label htmlFor="log">Wprowadź poziom dostępu: </label><br /><br />
                            <input type="number" className='modal-input-number' placeholder="Poziom" value={lvlFilter} onChange={(e) => this.setState({ lvlFilter: e.target.value })}/>
                            </div>
                            <br />
                            <button type="button" id='accept' onClick={() => this.filterLvl()}>Filtruj</button>

                            <button type="button" id='reject' onClick={() => this.setState({isFilterLvl:false})}>Anuluj</button>
                        </div>

                    </div>

                </div>
                
            </>
        );
    }
    
}