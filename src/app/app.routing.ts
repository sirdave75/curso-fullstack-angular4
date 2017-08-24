import {Component, ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import {LoginComponent } from './components/login/login.component';
import {RegisterComponent } from './components/register/register.component';
import {UserEditComponent } from './components/register/user-edit.component';

import {DefaultComponent } from './components/default/default.component';
import { ErrorComponent } from './components/error/error.component';


const appRoutes: Routes = [
    {path: '', component : DefaultComponent},
    {path: 'index', component : DefaultComponent},
    {path: 'login', component : LoginComponent},
    {path: 'login/:id', component : LoginComponent},
    {path: 'register', component : RegisterComponent},
    {path: 'user-edit', component : UserEditComponent},
    {path: '**', component : ErrorComponent}
];

export  const appRoutingProviders: any[] = []; //para cargar el array de rutas
export  const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); //para cargar el array de rutas