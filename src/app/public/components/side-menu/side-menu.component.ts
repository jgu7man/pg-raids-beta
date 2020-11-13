import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../services/public.service';
import { RoomMember } from '../../models/room.model';
import { CacheService } from '../../../public/services/cache.service';
import { GetNicknameComponent } from '../get-nickname/get-nickname.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  
  constructor (
    public public_: PublicService,
    private _cache: CacheService,
    private _dialog: MatDialog
  ) {
    
   }

  ngOnInit(): void {
    
  }

  get player(): RoomMember{
    let player = this._cache.getDataKey<RoomMember>('player')
    return player ? player :
    { nickname: '', pg_code: '' }
  }

  editPlayer() {
    var dialog = this._dialog.open(GetNicknameComponent, {
      minWidth:300
    })
  }

}
