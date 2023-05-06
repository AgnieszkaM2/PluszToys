import { Link } from 'react-router-dom';
import '../App.css';


export function AppNav() {
    return (
        <>
            <nav className='app-nav-bar'>
                <ul>
                    <li><Link to ="/kadry">KADRY</Link></li>
                    <li><Link to ="/magazyn">MAGAZYN</Link></li>
                    <li><Link to ="/zamowienia">ZAMÓWIENIA</Link></li>
                    <li><Link to ="/sprzedaz">SPRZEDAŻ</Link></li>
                    <li><Link to ="/zakupy">ZAKUPY I DOSTAWY</Link></li>
                </ul>
            </nav>
        </>
    )
}