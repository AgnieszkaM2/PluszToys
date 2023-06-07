import './HomeApp.css';
import {AppNav} from './AppNav';
import ic1 from '../assests/icons8-plus-math-50.png';
import ic2 from '../assests/icons8-filter-50.png';
import ic3 from '../assests/icons8-timeline-week-48.png';
import ic4 from '../assests/icons8-time-machine-48.png';
import React, {Component} from 'react';

export class Zamowienia extends Component{
    constructor(props) {
        super(props);

        this.state = {
            orders: [], 
            id_zam: 0,
            nr_zam: 0,
            klient: "",
            insdate: "",
            stan_zam: "",
            stan: 0,

            orders_det: [],
            material: "",
            wypelnienie: "",
            oczy: "",
            ilosc: 0,
            typ_plusza: 0,
            wielkosc: "",

            isAddOrderDetModal:false

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

    getOrderDet() {

        fetch('https://localhost:7223/api/zamCON/all_zaml?nr_zam=' + this.state.id_zam, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ orders_det: data });
            });
    }

    addClick(id) {
        if(id==3)
            this.setState({isAddOrderDetModal: true});
        else if(id==4){
            this.setState({isAddOrderDetModal: false});
            this.setState({nr_zam:0, material: "", wypelnienie: "", oczy: "", ilosc: 0, typ_plusza: 0, wielkosc: ""});
            document.getElementById('add-select').value = null;
        }else if(id==5)
            this.setState({isEditOrderModal: true});
        else if(id==6){
            this.setState({isEditOrderModal: false});
            this.setState({nr_zam: 0, stan: 0});
            document.getElementById('add-select').value = null;
        } 
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
        this.setState({nr_zam: id});
        this.addClick(5);
    }

    editOrder() {

        fetch('https://localhost:7223/api/zamCON/update_ZamL?stan='+ this.state.stan +'&id_zam='+ this.state.nr_zam, {
            method: 'PUT'
        })
            .then(res => res.json());
            

        this.setState({nr_zam: 0, stan: 0});
        this.refreshPage();
    }

    refreshPage() {
        window.location.reload(false);
    }

    componentDidMount() {
        this.getOrders();
    }


    render() {
        var ind=0;
        const {
            orders, 
            id_zam,
            nr_zam,
            klient,
            insdate,
            stan_zam,
            stan,
            orders_det,
            material,
            wypelnienie,
            oczy,
            ilosc,
            typ_plusza,
            wielkosc,
            isAddOrderDetModal,
            isEditOrderModal
        } = this.state;
        return (
            <>
                <aside className='app-sidebar'>
                    <ul>
                        <li><button align="center" id='btn2' onClick={() => this.addClick(3)}><span><img src={ic1} alt=""/></span>Nowe zamówienie</button></li>
                        {/*<li><button align="center" id='btn2'><span><img src={ic2} alt=""/></span>Filtruj</button></li>
                        <li><button align="center" id='btn2'><span><img src={ic3} alt=""/></span>Filtruj wg. daty</button></li>
                        <li><button align="center" id='btn2'><span><img src={ic4} alt=""/></span>Zakończenie zamówienia</button></li>*/}
                    </ul>
                </aside>
                <AppNav />
                <div>
                    <div className='selecting'>
                    <label id='label1' htmlFor="stan"> &emsp;&emsp;Wybierz zamówienie które chcesz wyświetlić: </label>
                            <select className="modal-select" id='edit-select' defaultValue="null" onChange={(e) => this.setState({ id_zam: e.target.value })}>
                                 <option disabled value="null">Wybierz nr zamówienia</option>
                                {orders.map(s =>
                                     <option key={s.id_zam} value={s.id_zam}>
                                        {s.id_zam} 
                                     </option>)}
                            </select>
                        
                        <button type="button" id='accept' onClick={() => this.getOrderDet()}>Wyświetl</button>
                    </div>
                    <div>
                        <table className="table-data">
                        <thead id='head1'>
                            <tr>
                                <th>
                                    Id 
                                </th>
                                <th>
                                    Nr zamówienia
                                </th>
                                <th>
                                    Typ pluszaka
                                </th>
                                <th>
                                    Materiał
                                </th>
                                <th>
                                    Wypełnienie
                                </th>
                                <th>
                                    Oczy
                                </th>
                                <th>
                                    Wielkość
                                </th>
                                <th>
                                    Ilość
                                </th>
                                <th>
                                    Stan
                                </th>
                                <th>
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody id='body1'>
                            {orders_det?.map(o =>
                                <tr key={o.nr_zam}>
                                    <td>{ind+=1}</td>
                                    <td>{o.nr_zam}</td>
                                    <td>{o.typ_plusza}</td>
                                    <td>{o.material}</td>
                                    <td>{o.wypelnienie}</td>
                                    <td>{o.oczy}</td>
                                    <td>{o.wielkosc}</td>
                                    <td>{o.ilosc}</td>
                                    <td>{o.stan_line}</td>
                                    <td><button type="button"
                                            className="edit-button"
                                            onClick={() => this.editClick(o.nr_zam)}>Edytuj stan
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>
                <div className='add-modal-overlay-z' style={{display: isAddOrderDetModal ? 'block' : 'none',}}>
                    <div className='add-modal-container-z' align="center">
                        <div className='add-modal'>
                            <h1 className='mod-title'>Dodaj zamówienie</h1>
                            <div>
                            <label htmlFor="nr">Nr zamówienia: </label><br /><br />
                            <input type="number" className='modal-input-number' placeholder="Nr zamówienia" value={nr_zam} onChange={(e) => this.setState({ nr_zam: e.target.value })}/>
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
