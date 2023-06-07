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
import { ProtectedRoutes } from './ProtectedRoutes';
import { RouteHR } from './RouteHR';
import { RouteRegular } from './RouteRegular';
import { RouteOffice } from './RouteOffice';
import { RouteAdmin } from './RouteAdmin';
import { Layout } from './Layout';

function App() {
  return (
    <>
    <MainNav />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/login" element={<HomeApp />} />
          <Route path="/home_app" element={<HomeApp />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<RouteHR />}>
            <Route path="/kadry" element={<Kadry />} />
          </Route>
          <Route path="/" element={<RouteOffice />}>
            <Route path="/sprzedaz" element={<Sprzedaz />} />
            <Route path="/zakupy" element={<ZakupyDostawy />} />
          </Route>
          <Route path="/" element={<RouteRegular />}>
            <Route path="/magazyn" element={<Magazyn />} />
            <Route path="/zamowienia" element={<Zamowienia />} />
          </Route>
        </Route>
      </Route>
    </Routes>

    </>
  );
}

export default App;
