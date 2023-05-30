import './HomeApp.css';
import {AppNav} from './AppNav';
import ic1 from '../assests/icons8-time-machine-48.png';
import React, {Component} from 'react';

export class HomeApp extends Component{
    constructor(props) {
        super(props);

        this.state = {
            employeeId:0,
            employeeName:"",
            employeeLvl:0,

            hours: 0,
            isAddLogsModal:false

        }
    }

    nameFormat(name) {
        var n = name;
        if(name!=null){
            if (((name.split(/(?=[A-Z])/)).length>0)) {
                n= name.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1).join(" ");
            }
        }


        return n;
    }

    getDetails() {
        let name;
        let id=0;
        let lvl=0;
        name=localStorage.getItem('userNamee');
        id=localStorage.getItem('userIdd');
        lvl=localStorage.getItem('userLvll');
        name=this.nameFormat(name);
        id=Number(id);
        lvl=Number(lvl);
        this.setState({ employeeName: name });
        this.setState({ employeeId: id });
        this.setState({ employeeLvl: lvl });
    }

    addLogs() {
        fetch('https://localhost:7223/api/logipracyCON/ins_godziny?id='+ this.state.employeeId +'&godziny='+ this.state.hours, {
            method: 'PUT'
        })
            .then(res => res.json());
            

        this.setState({hours:0});
        this.addClick(2);
    }

    addClick(id) {
        if(id==1)
            this.setState({isAddLogsModal: true});
        else if(id==2){
            this.setState({isAddLogsModal: false});
            this.setState({hours:0});
        }
    }

    componentDidMount() {
        this.getDetails();
    }

    render() {
        const {
            employeeId,
            employeeName,
            employeeLvl,

            hours,
            isAddLogsModal
        } = this.state;
        return (
            <>
                <aside className='app-sidebar'>
                        <ul>
                            <li><button align="center" id='btn2' onClick={() => this.addClick(1)}><span><img src={ic1} alt=""/></span>Czas pracy</button></li>
                        </ul>
                    </aside>
                    <AppNav />
                    <hr /> 
                    <div>
                        
                        <h2 align="center" >Użytkownik : {employeeName}</h2>
                    </div> 
                    <div className='add-modal-overlay' style={{display: isAddLogsModal ? 'block' : 'none',}}>
                    <div className='add-modal-container' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Dodaj swoje godziny pracy</h1>
                            <div>
                            <label htmlFor="log">Wprowadź ilość godzin, którą chcesz dodać: </label><br /><br />
                            <input type="number" className='modal-input-number' placeholder="Godziny" value={hours} onChange={(e) => this.setState({ hours: e.target.value })}/>
                            </div>
                            <br />
                            <button type="button" id='accept' onClick={() => this.addLogs()}>Dodaj</button>
                            <button type="button" id='reject' onClick={() => this.addClick(2)}>Anuluj</button>
                        </div>

                    </div>

                </div>
            </>
    
            
        )
    }
}
