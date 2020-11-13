import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { FirebaseModule } from './../firebase.module';
import {ShareModule} from 'ngx-sharebuttons';
import {NgxMaskModule, IConfig} from 'ngx-mask'

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

import { PublicComponent } from './public.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PublicRoutingModule } from './public-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomComponent } from './components/room/room.component';
import { GetNicknameComponent } from './components/get-nickname/get-nickname.component';
import { AddMemberComponent } from './components/room/add-member/add-member.component';
import { DeleteRoomComponent } from './components/room/delete-room/delete-room.component';
import { ShareRoomComponent } from './components/room/share-room/share-room.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { RoomSubscribedComponent } from './components/room-subscribed/room-subscribed.component';
import { NoRoomComponent } from './components/no-room/no-room.component';
import { AlertaPopupComponent } from './components/alerts/alerta-popup/alerta-popup.component';
import { ErrorPopupComponent } from './components/alerts/error-popup/error-popup.component';


@NgModule({
  declarations: [
    PublicComponent,
    CreateRoomComponent,
    ToolbarComponent,
    RoomListComponent,
    RoomComponent,
    GetNicknameComponent,
    AddMemberComponent,
    DeleteRoomComponent,
    ShareRoomComponent,
    CountdownComponent,
    SideMenuComponent,
    BottomBarComponent,
    RoomSubscribedComponent,
    NoRoomComponent,
    AlertaPopupComponent,
    ErrorPopupComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    CommonModule,
    MaterialModule,
    FirebaseModule,
    NgxMaterialTimepickerModule,
    ShareModule,
    NgxMaskModule.forRoot(),
  ],
  entryComponents: [
    GetNicknameComponent,
    AddMemberComponent,
    DeleteRoomComponent,
    ShareRoomComponent,
  ],
})
export class PublicModule {}
