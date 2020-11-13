import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../../public/services/cache.service';
import { RoomModel } from '../../models/room.model';
import { PublicService } from '../../services/public.service';

@Component( {
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  room: RoomModel
  constructor (
    private _cache: CacheService,
    public public_: PublicService
  ) {
    
    this.room = this._cache.getDataKey('room-hosted')
   }

  ngOnInit(): void {
    console.log(this.validateTime);
  }

  get validateTime() {
    var today = new Date()
    let room = this._cache.getDataKey<RoomModel>('room-hosted')
    if (room) {
      var roomTime = new Date(room.match_hour)
      return today < roomTime ? true : false
    } else {
      return false
    }
  }
  
}
