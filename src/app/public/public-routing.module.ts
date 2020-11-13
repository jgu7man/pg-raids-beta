import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomModel } from './models/room.model';
import { RoomComponent } from './components/room/room.component';
import { RoomSubscribedComponent } from './components/room-subscribed/room-subscribed.component';
import { NoRoomComponent } from './components/no-room/no-room.component';


const routes: Routes = [
  {path: '', component: PublicComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full'},
    { path: 'list', component: RoomListComponent},
    { path: 'subs', component: RoomSubscribedComponent},
    { path: 'nueva', component: CreateRoomComponent },
    { path: 'sala/:id', component: RoomComponent},
    { path: '404', component: NoRoomComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
