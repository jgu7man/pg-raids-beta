import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MembersService } from './services/members.service';
import { CacheService } from '../public/services/cache.service';
import { GetNicknameComponent } from './components/get-nickname/get-nickname.component';
import {MatDrawer} from '@angular/material/sidenav';
import { PublicService } from './services/public.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  @ViewChild('sideMenu') sideMenu: MatDrawer

  constructor (
    private _cache: CacheService,
    private _dialog: MatDialog,
    private _public: PublicService
  ) {
    this._cache.storage = 'local'
   }

  ngOnInit(): void {
    let player = this._cache.getDataKey( 'player' )
    if ( !player )
      this._dialog.open( GetNicknameComponent, {
        disableClose: true,
        minWidth: 300
      })
    
    this._public.menuTrigger
      .pipe(distinctUntilChanged())
      .subscribe(change => {
        if (change) {
          this.sideMenu.open()
        } else {
          this.sideMenu.close()
        }
      })
    
  }

}
