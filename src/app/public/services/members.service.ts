import { Injectable } from '@angular/core';
import { CacheService } from '../../public/services/cache.service';
import { Loading } from '../../public/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { GetNicknameComponent } from '../components/get-nickname/get-nickname.component';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor (
    private _cache: CacheService,
    private loading: Loading,
    private _dialog: MatDialog
  ) {
    // this.checkMember()
   }

  get currentMemember() {
    let member = this._cache.getDataKey( 'member' )
    console.log(member);
    return member
  }

  checkMember() {
    this.loading.getCurrentActivatedRoute().subscribe( (res) => {
      console.log(res);
      if ( !this.currentMemember ) 
        this._dialog.open( GetNicknameComponent, {
          minWidth: 300
        })
    } )
  }
}
