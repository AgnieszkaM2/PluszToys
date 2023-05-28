import { Routes, Route } from 'react-router-dom';
import React, {Component} from 'react';
import './App.css';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { HomeApp } from './components/HomeApp';
import { Kadry } from './components/Kadry';
import { Magazyn } from './components/Magazyn';
import { Sprzedaz } from './components/Sprzedaz';
import { ZakupyDostawy } from './components/ZakupyDostawy';
import { Zamowienia } from './components/Zamowienia';
import { Settings } from './components/Settings';
import { MainNav } from './components/MainNav';

class App extends Component {
  render() {
    return (
      <>
      <MainNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home_app" element={<HomeApp />} />
        <Route path="/kadry" element={<Kadry />} />
        <Route path="/magazyn" element={<Magazyn />} />
        <Route path="/sprzedaz" element={<Sprzedaz />} />
        <Route path="/zakupy" element={<ZakupyDostawy />} />
        <Route path="/zamowienia" element={<Zamowienia />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
  
      </>
    );
  }
  
}

export default App;
