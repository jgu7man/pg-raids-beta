import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RoomModel, RoomMember } from '../models/room.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { CacheService } from '../../public/services/cache.service';
import { AlertService } from '../../public/services/alert.service';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  
  roomList: Observable<RoomModel[]>
  constructor (
    private fs: AngularFirestore,
    private router: Router,
    private _cache: CacheService,
    private _alerts: AlertService
  ) {
    this.get()
   }

  async addRoom( room: RoomModel ) {
    await this.fs.collection( 'rooms' ).ref
      .doc( room.id ).set( { ...room } )
      .then( () => {
        this.router.navigate( [ 'sala', room.id ] )
      } )
    this._cache.updateData( 'room-hosted', room )
    
  }

  get() {
    this.roomList = this.fs.collection<RoomModel>('rooms').valueChanges()
      .pipe(
        map(rooms => {
          return rooms.map((room: RoomModel) => {
            room.match_hour = new Date(room.match_hour['seconds'] * 1000)
            let expired = this.checkExpired(room.match_hour)
            
            if (expired) {
              console.log('sala expirada');
              this.fs.collection('rooms').ref.doc(room.id).delete()
              this._cache.deleteDataKey('room-hosted')
            } else {
              return room
            }

          })
        }),
        switchMap(list => {
          return list.length > 0 ? of<RoomModel[]>(list) : of<RoomModel[]>([])
      }))
  }

  async getRoom(id: string) {
    let doc = await this.fs.collection( 'rooms' ).ref.doc( id ).get()
    
    if ( doc.exists ) {
      let room = doc.data() as RoomModel
      room.match_hour = new Date(doc.data().match_hour['seconds']*1000)
      let expired = this.checkExpired(room.match_hour)
      
      if (expired) {console.log('Sala expirada');}
      return expired ? null : room
    
    } else {
      return null
    }
  }

  checkExpired(match: Date) {
    var today = new Date()
    let afterMatch = new Date(
      match.getFullYear(),
      match.getMonth(),
      match.getDate(),
      match.getHours(),
      match.getMinutes() + 10,
    )

    
    return afterMatch < today ? true : false
  }


  updateRoom(room: RoomModel) {
    this.fs.collection('rooms').ref.doc(room.id).set({...room}, {merge: true})
  }


  addMember(list: 'placed' | 'remote' | 'invited', room: RoomModel, player?:RoomMember) {

      player = player ? player : this._cache.getDataKey('player')

      let memberList: RoomMember[] = room[`${list}_members`]
      memberList.push(player)

    this.updateRoom(room)
    
    if (list == 'invited') {
      this._alerts.sendMessageAlert('Toca el nombre del usuario que te va a invitar para copiar su código y ve al juego para enviarle una solicitud de amistad.')
    } else {
      
      this._alerts.sendFloatNotification('Agregado')
    }


  }



  deleteRoom(roomId:string) {
    this.fs.collection('rooms').ref.doc(roomId).delete()
    this._cache.deleteDataKey('room-hosted')
    this.router.navigate(['/'])
  }

}
