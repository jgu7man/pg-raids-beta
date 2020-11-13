import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../../public/services/cache.service';
import { RoomModel } from '../../models/room.model';
import { RoomsService } from '../../services/rooms.service';

@Component({
  templateUrl: './room-subscribed.component.html',
  styleUrls: ['./room-subscribed.component.scss']
})
export class RoomSubscribedComponent implements OnInit {

  roomList: RoomModel[] = []
  roomsSubscribed: string[]

  constructor (
    private _cache: CacheService,
    private _rooms: RoomsService
  ) { }

  ngOnInit(): void {
    this.getRooms()
  }

  getRooms() {
    this.roomsSubscribed = this._cache.getDataKey('rooms-subscribed')
    if (this.roomsSubscribed) {

      this.roomsSubscribed.forEach(async (roomId, index) => {
        let room = await this._rooms.getRoom(roomId)
        if (room) {this.roomList.push(room)}
        else {this.roomsSubscribed.splice(index, 1)}
      })

    } 
  }

}
