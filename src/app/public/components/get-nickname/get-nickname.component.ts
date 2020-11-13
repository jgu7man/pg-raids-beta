import { Component, OnInit } from '@angular/core';
import { RoomMember } from '../../models/room.model';
import { CacheService } from '../../../public/services/cache.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Loading } from '../../../public/services/loading.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  templateUrl: './get-nickname.component.html',
  styleUrls: ['./get-nickname.component.scss']
})
export class GetNicknameComponent implements OnInit {


  getData: boolean = true
  member: RoomMember = {
    nickname: '', pg_code: ''
  }

  
  
  constructor (
    private _cache: CacheService,
    private _dialog: MatDialogRef<GetNicknameComponent>,
    private loading: Loading,
    private fs: AngularFirestore
  ) { }

  async ngOnInit() {
    let player = this._cache.getDataKey<RoomMember>('player')
    if(player) this.member = player
  }

  async onSave() {
    this.member.pg_code = this.member.pg_code.replace(/\s/g, '')

    this._cache.updateData('player', this.member)
    
    this.getData = false
    await this.loading.waitFor( 2000 )
    this._dialog.close()
    
    // Save on firestore
    let playersRef = this.fs.collection('players').ref
      playersRef.where('pg_code', '==', this.member.pg_code)
      .get().then(docs => {
        if (docs.size < 1) { playersRef.add({...this.member})}
      })
    
  }

}
