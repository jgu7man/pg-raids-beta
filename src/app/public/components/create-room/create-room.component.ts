import { Component, OnInit } from '@angular/core';
import { RoomModel, RoomMember } from '../../models/room.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from '../../../public/services/alert.service';
import { Router } from '@angular/router';
import { CacheService } from '../../../public/services/cache.service';
import { TextService } from '../../../public/services/gdev-text.service';
import { RoomsService } from '../../services/rooms.service';
import { GetNicknameComponent } from '../get-nickname/get-nickname.component';

@Component({
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  
  room: RoomModel
  host: RoomMember
  
  constructor (
    private fs: AngularFirestore,
    private _alerts: AlertService,
    private router: Router,
    private _cache: CacheService,
    public text_: TextService,
    private _rooms: RoomsService,
    private _dialog: MatDialog
  ) {
    this.host = this._cache.getDataKey( 'player' )
    this.room = new RoomModel( '', '', '', this.now(0,20), this.host, '', [], [], [] )
   }

  ngOnInit(): void {
  }

  now( h?, m?, set?: boolean, ) {
    let t = new Date()
    return new Date(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      set ? h : t.getHours() + h,
      set ? m : t.getMinutes() + m,
    )
  }

  stringNow() {
    let t = new Date()
    return `${ t.getFullYear() }${ t.getMonth()+1 }${ t.getDate() }${ t.getHours() }${ t.getMinutes() }`
  }


  formatTime(date: Date) {
    return this.text_.stringifyTime(date)
  }

  setTime(matchTime) {
    // console.log( matchTime );
    var hour = matchTime.split( ':' )[ 0 ]
    var min = matchTime.split( ':' )[ 1 ]

    this.room.match_hour = this.now(hour, min, true)
  }

  

  async onSubmit() {
    
    const roomId = this.stringNow()
    this.room.id = roomId
    var lapse = this.now( 0, 15)
    var over = this.now(0,120)
    
    Object.keys( this.room ).forEach( key => { if ( this.room[ key ] == undefined ) delete this.room[ key ] } ) 

    if ( lapse > this.room.match_hour ) {
      this._alerts.sendMessageAlert( 'Debes darle un tiempo mínimo de 15 minutos para que se junten los participantes' )
      
    } else if ( over < this.room.match_hour ) {
      this._alerts.sendMessageAlert( 'No es posible agendar una incursión que no existe aún' )

    } else if ( !this.host ) {
      
      this._dialog.open( GetNicknameComponent, {
        minWidth: 300,
        disableClose: true
      } ).afterClosed().subscribe( () => {
        this.room.host = this._cache.getDataKey( 'player' )
        if ( this.room.host ) {
          this._rooms.addRoom( this.room )
        } else {
          this._alerts.sendMessageAlert('Faltaron tus datos para poder crear la sala. Inténtalo de nuevo')
        }
      })

    } else {
           
      
      this._rooms.addRoom(this.room)
      
    }

  }

}
