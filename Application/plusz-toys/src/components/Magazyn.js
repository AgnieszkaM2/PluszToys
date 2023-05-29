import './HomeApp.css';
import {AppNav} from './AppNav';
import ic1 from '../assests/icons8-plus-math-50.png';
import ic2 from '../assests/icons8-filter-50.png';
import ic3 from '../assests/icons8-time-machine-48.png';
import React, {Component} from 'react';


export class Magazyn extends Component{
    constructor(props) {
        super(props);

        this.state = {
            products: [], 
            id_p: 0,
            nazwa_p: "",
            type_p: "",

            types: [],
            id_t: 0,
            type_t:"",

            isAddModal:false

        }
    }

    getProducts() {

        fetch('https://localhost:7223/api/produktCON/produkt', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
            });
    }

    getTypes() {
        fetch('https://localhost:7223/api/produktCON/type_desc', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ types: data });
            });
    }

    changeProductName = (e) => {
        this.setState({ nazwa_p: e.target.value });
    }
    changeProductType = (e) => {
        this.setState({ id_t: e.target.value });
    }

    refreshPage() {
        window.location.reload(false);
    }

    addProduct() {
        fetch('https://localhost:7223/api/produktCON/nowy_produkt?nazwa='+ this.state.nazwa_p +'&type='+ this.state.id_t, {
            method: 'PUT'
        })
            .then(res => res.json());
            

        this.setState({nazwa_p: "", id_t:0});
        this.refreshPage();
    }

    deleteClick(id) {
        if (window.confirm('Czy na pewno chcesz usunąć produkt?')) {
            fetch('https://localhost:7223/api/produktCON/del_produkt?id=' + id, {
                method: 'DELETE'
            })
                .then(res => res.json());

            
            this.refreshPage();    
        }
    }

    addClick(id) {
        if(id==1)
            this.setState({isAddModal: true});
        else if(id==2){
            this.setState({isAddModal: false});
            this.setState({nazwa_p: "", id_t:0});
            document.getElementById('add-select').value = null;
        }
    }

    componentDidMount() {
        this.getProducts();
        this.getTypes();
    }


    render(){
        var ind=0;
        const {
            products,
            id_p,
            nazwa_p,
            type_p,
            types,
            id_t,
            type_t,
            isAddModal
        } = this.state;
        return (
            <>
                <aside className='app-sidebar'>
                    <ul>
                        <li><button align="center" id='btn2' onClick={() => this.addClick(1)}><span><img src={ic1} alt=""/></span>Nowy produkt</button></li>
                        <li><button align="center" id='btn2'><span><img src={ic2} alt=""/></span>Filtruj</button></li>
                        <li><button align="center" id='btn2'><span><img src={ic3} alt=""/></span>Zakończenie ważności</button></li>
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
                                Nazwa produktu
                            </th>
                            <th>
                                Typ produktu
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(prod =>
                            <tr key={prod.Id}>
                                <td>{ind+=1}</td>
                                <td>{prod.nazwa}</td>
                                <td>{prod.type} </td>
                                <td><button type="button"
                                        className="delete-button"
                                        onClick={() => this.deleteClick(prod.Id)}>Usuń
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
                            <h1 className='mod-title'>Dodaj produkt</h1>
                            <div>
                            <input type="text" className='modal-input-text' placeholder="Nazwa produktu" value={nazwa_p} onChange={(e) => this.setState({ nazwa_p: e.target.value })} />
                            </div>
                            <div>
                            <select className="modal-select" id='add-select' defaultValue="null" onChange={this.changeProductType}>
                                 <option disabled value="null">Wybierz typ</option>
                                {types.map(t =>
                                     <option key={t.Id} value={t.Id}>
                                        {t.type} 
                                     </option>)}
                             </select>
                            </div>
                            <br />
                            <button type="button" onClick={() => this.addProduct()}>Dodaj</button>
                            <br />
                            <button type="button" onClick={() => this.addClick(2)}>Anuluj</button>
                        </div>

                    </div>

                </div>
            </>
        )
    }
}
