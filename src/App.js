import React from 'react';
import AppContextProvider from './context/contextProvider';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import * as ClientComponents from './components/client';
import * as AdminComponents from './components/admin';
import * as ClientPages from "./pages/client";
import * as AdminPages from "./pages/admin";

import "./styles/global.css";
import { ScrollToTopRouter } from './components/common';

function App() {
    return (
        <AppContextProvider>
            <BrowserRouter>
                <ScrollToTopRouter />
                <Routes >
                    <Route path='/admin' element={<AdminComponents.Layout />}>
                        <Route path="/admin"  element={<Navigate replace to="/admin/organizers"/>} />
                        <Route path="/admin/organizers" element={<AdminPages.OrganizersPage />} />
                        <Route path="/admin/organizers/:organizerId" element={<AdminPages.SingleOrganizerPage />} />
                        <Route path="/admin/organizers/:organizerId/festivals/:festivalId" element={<AdminPages.SingleFestivalPage />} />
                        <Route path="/admin/festivals/create-festival" element={<AdminPages.CreateFestivalPage />} />
                        <Route path="/admin/users" element={<AdminPages.UsersPage />} />
                        <Route path="/admin/users/:userId" element={<AdminPages.SingleUserPage />} />
                        <Route path="/admin/*" element={<AdminPages.Error404 />} />
                    </Route>
                    <Route path='/' element={<ClientComponents.Layout />}>
                        <Route path="/" element={<ClientPages.Homepage />} />
                        <Route path="/organizers/:organizerId" element={<ClientPages.OrganizerPage />} />
                        <Route path="/organizers/:organizerId/festivals/:festivalId" element={<ClientPages.FestivalPage />} />
                        <Route path="/error" element={<ClientPages.ErrorPage />} />
                        <Route path="*" element={<ClientPages.Error404 />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppContextProvider>
    );
}

export default App;