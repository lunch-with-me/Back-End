import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { MessageComponent } from './components/message/message.component';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { ChatService } from "./services/chat.service";
import { ActiveListComponent } from './components/active-list/active-list.component';
import { MapComponent } from './components/map/map.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'map', component: MapComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'chat', canActivate: [AuthGuard], children: [
    { path: ':chatWith', component: ChatRoomComponent },
    { path: '**', redirectTo: '/chat/chat-room', pathMatch: 'full' }
  ] },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ChatRoomComponent,
    MessageComponent,
    ActiveListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIMpYY2k6FMyXAK9T-t1677iXCUHan2h8'
    }),
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    ChatService,
    ApiService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
