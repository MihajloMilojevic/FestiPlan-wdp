import React from 'react';
import AppContextProvider from './context/contextProvider';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import * as ClientComponents from './components/client';
import * as AdminComponents from './components/admin';
import * as ClientPages from "./pages/client";
import * as AdminPages from "./pages/admin";

import "./styles/global.css";

function App() {
    return (
        <AppContextProvider>
            <BrowserRouter>
                <Routes >
                    <Route path='/admin' element={<AdminComponents.Layout />}>
                        <Route path="/admin"  element={<Navigate replace to="/admin/organizers"/>} />
                        <Route path="/admin/organizers" element={<AdminPages.OrganizersPage />} />
                        <Route path="/admin/materijaliorganizers/:id" element={<AdminPages.SingleOrganizerPage />} />
                        <Route path="/admin/festivals/:id" element={<AdminPages.SingleFestivalPage />} />
                        <Route path="/admin/festivals/create-festival" element={<AdminPages.CreateFestivalPage />} />
                        <Route path="/admin/users" element={<AdminPages.UsersPage />} />
                        <Route path="/admin/users/:id" element={<AdminPages.SingleUserPage />} />
                        <Route path="/admin/*" element={<AdminPages.Error404 />} />
                    </Route>
                    <Route path='/' element={<ClientComponents.Layout />}>
                        <Route path="/" element={<ClientPages.Homepage />} />
                        <Route path="/organizers/:id" element={<ClientPages.OrganizerPage />} />
                        <Route path="/festivals/:id" element={<ClientPages.FestivalPage />} />
                        <Route path="*" element={<ClientPages.Error404 />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppContextProvider>
    );
}

export default App;