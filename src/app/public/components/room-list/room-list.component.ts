import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../../models/room.model';
import { RoomsService } from '../../services/rooms.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { CacheService } from '../../../public/services/cache.service';

@Component({
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  rooms: RoomModel

  constructor (
    public room_: RoomsService,
    private fs: AngularFirestore,
    private _cache: CacheService
  ) { }

  ngOnInit(): void {
    // this.room_.roomList.subscribe(rooms => {
    //   rooms.forEach( async room => {
    //     let expired = await this.room_.checkExpired(room.match_hour)
        
    //     if (expired) {

    //       console.log('sala expirada');
    //       this.fs.collection('rooms').ref.doc(room.id).delete()
    //       this._cache.deleteDataKey('room-hosted')
    //     }
    //   })
    // })
  }

  

}
