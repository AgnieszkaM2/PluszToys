import './HomeApp.css';
import {AppNav} from './AppNav';
import ic1 from '../assests/icons8-plus-math-50.png';
import ic2 from '../assests/icons8-filter-50.png';
import ic3 from '../assests/icons8-timeline-week-48.png';
import React, {Component} from 'react';

export class Sprzedaz extends Component{
    constructor(props) {
        super(props);

        this.state = {
            orders: [], 
            id_zam: 0,
            klient: "",
            insdate: "",
            stan_zam: "",
            stan: 0,
            nr_zam:0,

            material: "",
            wypelnienie: "",
            oczy: "",
            ilosc: 0,
            typ_plusza: 0,
            wielkosc: "",

            isAddOrderModal:false,
            isAddOrderDetModal:false,
            isEditOrderModal: false

        }
    }

    getOrders() {

        fetch('https://localhost:7223/api/zamCON/all_zam', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ orders: data });
            });
    }

    getType(typ) {
        var pluszak=0;
        switch(typ) {
            case "Kot":
                pluszak=1;
                break;
            case "Pies":
                pluszak=2;
                break;
            case "Słoń":
                pluszak=3;
                break;
            case "Miś":
                pluszak=4;
                break;
            default:
                pluszak=1;
                break;
        }

        return pluszak;

    }

    getStan(str) {
        var stan=0;
        switch(str) {
            case "start":
                stan=1;
                break;
            case "w trakcie":
                stan=2;
                break;
            case "koniec":
                stan=3;
                break;
            case "anulowane":
                stan=4;
                break;
            default:
                stan=1;
                break;
        }

        return stan;

    }

    addClick(id) {
        if(id==1)
            this.setState({isAddOrderModal: true});
        else if(id==2){
            this.setState({isAddOrderModal: false});
            this.setState({klient: ""});
        }else if(id==3){
            var nr=this.getNextId();
            this.setState({nr_zam: nr});
            this.setState({isAddOrderDetModal: true});
        }else if(id==4){
            this.setState({isAddOrderDetModal: false});
            this.setState({nr_zam:0, material: "", wypelnienie: "", oczy: "", ilosc: 0, typ_plusza: 0, wielkosc: ""});
            this.refreshPage();
        }else if(id==5)
            this.setState({isEditOrderModal: true});
        else if(id==6){
            this.setState({isEditOrderModal: false});
            this.setState({id_zam: 0, stan: 0});
            document.getElementById('add-select').value = null;
        } 
    }

    getNextId() {
        var id=0;
        this.state.orders.map(o=> {
            id=o.id_zam;
        });
        
        id+=1;
        return id;
    }

    addOrder() {
        fetch('https://localhost:7223/api/zamCON/klient?klient='+ this.state.klient , {
            method: 'POST'
        })
            .then(res => res.json());
            

        this.setState({klient: ""});
        this.addClick(2);
        this.addClick(3);
    }

    addOrderDet() {

        fetch('https://localhost:7223/api/zamCON/zamline?nr_zam='+ this.state.nr_zam +'&material='+ this.state.material +'&wypelnienie='+ this.state.wypelnienie +'&oczy='+ this.state.oczy +'&ilosc='+ this.state.ilosc +'&typ_plusza='+ this.state.typ_plusza +'&wielkosc='+ this.state.wielkosc, {
            method: 'POST'
        })
            .then(res => res.json());
            

        this.setState({nr_zam:0, material: "", wypelnienie: "", oczy: "", ilosc: 0, typ_plusza: 0, wielkosc: ""});
        this.refreshPage();
    }

    editClick(id) {
        this.setState({id_zam: id});
        this.addClick(5);
    }

    editOrder() {

        fetch('https://localhost:7223/api/zamCON/update_Zam?stan='+ this.state.stan +'&id_zam='+ this.state.id_zam, {
            method: 'PUT'
        })
            .then(res => res.json());
            

        this.setState({id_zam: 0, stan: 0});
        this.refreshPage();
    }

    refreshPage() {
        window.location.reload(false);
    }

    componentDidMount() {
        this.getOrders();
    }


    render() {
        var numer;
        const {
            orders, 
            id_zam,
            klient,
            insdate,
            stan_zam,
            stan,
            material,
            wypelnienie,
            oczy,
            ilosc,
            typ_plusza,
            wielkosc,
            isAddOrderModal,
            isAddOrderDetModal,
            isEditOrderModal
        } = this.state;
        return (
            <>
                <aside className='app-sidebar'>
                    <ul>
                        <li><button align="center" id='btn2' onClick={() => this.addClick(1)}><span><img src={ic1} alt=""/></span>Nowa sprzedaż</button></li>
                        <li><button align="center" id='btn2' ><span><img src={ic2} alt=""/></span>Filtruj</button></li>
                        <li><button align="center" id='btn2'><span><img src={ic3} alt=""/></span>Filtruj wg. daty</button></li>
                    </ul>
                </aside>
                <AppNav />
                <div>
                <table className="table-data">
                    <thead id='head1'>
                        <tr>
                            <th>
                                Id 
                            </th>
                            <th>
                                Klient
                            </th>
                            <th>
                                Data przyjęcia
                            </th>
                            <th>
                                Stan zamówienia
                            </th>
                            <th>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody id='body1'>
                        {orders.map(o =>
                            <tr key={o.id_zam}>
                                <td>{o.id_zam}</td>
                                <td>{o.klient}</td>
                                <td>{o.insdate=(o.insdate.slice(0, 19)).replace("T"," ")} </td>
                                <td>{o.stan_zam} </td>
                                <td><button type="button"
                                        className="edit-button"
                                        onClick={() => this.editClick(o.id_zam)}> Edytuj stan
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
                <div className='add-modal-overlay' style={{display: isAddOrderModal ? 'block' : 'none',}}>
                    <div className='add-modal-container' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Dodaj sprzedaż</h1>
                            <div>
                            <label htmlFor="nr">Nowy klient: </label><br /><br />
                            <input type="text" className='modal-input-text' placeholder="Klient" value={klient} onChange={(e) => this.setState({ klient: e.target.value })} />
                            </div>
                            <br />
                            <button type="button" id='accept' onClick={() => this.addOrder()}>Dodaj</button>
                            <button type="button" id='reject' onClick={() => this.addClick(2)}>Anuluj</button>
                        </div>

                    </div>

                </div>
                <div className='add-modal-overlay-z' style={{display: isAddOrderDetModal ? 'block' : 'none',}}>
                    <div className='add-modal-container-z' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Dodaj zamówienie</h1>
                            <div>
                            <label htmlFor="nr">Nr zamówienia: </label><br /><br />
                            <input type="number" className='modal-input-number' disabled placeholder="Nr zamówienia" value={numer=this.getNextId()}/>
                            </div>
                            <div>
                            <label htmlFor="mat">Materiał: </label><br /><br />
                            <input type="text" className='modal-input-text' placeholder="Materiał" value={material} onChange={(e) => this.setState({ material: e.target.value })} />
                            </div>
                            <div>
                            <label htmlFor="wyp">Wypełnienie: </label><br /><br />
                            <input type="text" className='modal-input-text' placeholder="Wypełnienie" value={wypelnienie} onChange={(e) => this.setState({ wypelnienie: e.target.value })} />
                            </div>
                            <div>
                            <label htmlFor="oczy">Oczy: </label><br /><br />
                            <input type="text" className='modal-input-text' placeholder="Oczy" value={oczy} onChange={(e) => this.setState({ oczy: e.target.value })} />
                            </div>
                            <div>
                            <label htmlFor="ilosc">Ilość: </label><br /><br />
                            <input type="number" className='modal-input-number' placeholder="Ilość" value={ilosc} onChange={(e) => this.setState({ ilosc: e.target.value })}/>
                            </div>
                            <br />
                            <div className='selecting2'>
                                <select className="modal-select" id='add-select' defaultValue="null" onChange={(e) => this.setState({ typ_plusza: e.target.value })}>
                                    <option disabled value="null">Wybierz typ</option>
                                    <option value="1">Kot</option>
                                    <option value="2">Pies</option>
                                    <option value="3">Słoń</option>
                                    <option value="4">Miś</option>
                                </select>
                            </div>
                            <br />
                            <div className='selecting2'>
                                <select className="modal-select" id='add-select' defaultValue="null" onChange={(e) => this.setState({ wielkosc: e.target.value })}>
                                    <option disabled value="null">Wybierz rozmiar</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="2XL">2XL</option>
                                    <option value="3XL">3XL</option>
                                    <option value="4XL">4XL</option>
                                </select>
                            </div>
                            <br />
                            <button type="button" id='accept' onClick={() => this.addOrderDet()}>Dodaj</button>
                            <button type="button" id='reject' onClick={() => this.addClick(4)}>Anuluj</button>
                        </div>

                    </div>

                </div>
                <div className='add-modal-overlay' style={{display: isEditOrderModal ? 'block' : 'none',}}>
                    <div className='add-modal-container' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Zmień stan zamówienia</h1>
                           
                            <div className='selecting2'>
                            <select className="modal-select" id='add-select' defaultValue="null" onChange={(e) => this.setState({ stan: e.target.value })}>
                                 <option disabled value="null">Wybierz stan</option>
                                 <option value="1">start</option>
                                 <option value="2">w trakcie</option>
                                 <option value="3">koniec</option>
                                 <option value="4">anulowane</option>
                             </select>
                            </div>
                            <br />
                            <button type="button" id='accept' onClick={() => this.editOrder()}>Zapisz</button>
                            <button type="button" id='reject' onClick={() => this.addClick(6)}>Anuluj</button>
                        </div>

                    </div>

                </div>
            </>
        )
    }
}

