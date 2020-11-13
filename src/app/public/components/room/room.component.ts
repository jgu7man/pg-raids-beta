import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomModel, RoomMember, InvitedMember } from '../../models/room.model';
import { RoomsService } from '../../services/rooms.service';
import { CacheService } from '../../../public/services/cache.service';
import { AlertService } from '../../../public/services/alert.service';
import { AddMemberComponent, MemberAdded } from './add-member/add-member.component';
import { DeleteRoomComponent } from './delete-room/delete-room.component';
import { ShareRoomComponent } from './share-room/share-room.component';
import {Clipboard} from '@angular/cdk/clipboard';
import { SeoService, SEOCONFIG } from '../../../public/services/gdev-seo.service';

@Component({
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  room: RoomModel
  host: RoomMember = {
    nickname:'', pg_code:''
  }

  now = new Date().getTime()
  future

  timer$: Observable<any>
  
  constructor (
    private _route: ActivatedRoute,
    private _rooms: RoomsService,
    private _cache: CacheService,
    private _dialog: MatDialog,
    private _alerts: AlertService,
    private _clipboard: Clipboard,
    private router: Router,
    private _seo: SeoService
  ) {
    this.room = new RoomModel( '', '', '', new Date, this.host, '', [], [], [] )
    this.room.id = this._route.snapshot.params[ 'id' ]
   }

  async ngOnInit() {
    this.room = await this._rooms.getRoom(this.room.id)
    
    if (!this.room) {this.router.navigate(['/404'])}
    else {this.future = this.room.match_hour  }
  }

  setSeo() {
    var seoConfig: SEOCONFIG = {
      title: `¡Vamos por ${this.room.poke_name}!`,
      description: `PG RAIDS: Organiza incrsuiones de Pokemon GO con tus amigos`
    }
    this._seo.generarTags(seoConfig)
  }

  validateMembers(list: "placed" | "remote" | "invited", member?: RoomMember) {
    let localMembers = this.room.placed_members.length + this.room.remote_members.length
    let invitedLimit = localMembers * 5

    if (this.room.remote_members.length > 9 && list == 'remote') {
      return this._alerts.sendMessageAlert('No puede haber más de 8 remotos en una sala')
    
    } else if (invitedLimit < this.room.invited_members.length && list == 'invited') {
      return this._alerts.sendMessageAlert('No puede haber más invitados de los que pueden ser invitados por los presenciales')
    
    } else if (localMembers + this.room.invited_members.length > 20) {
      return this._alerts.sendMessageAlert('La sala está llena, intenta en otra')
    
    } else {

      let roomsSubscribed:string[] = this._cache.getDataKey('rooms-subscribed')
      if (roomsSubscribed) {
        let roomStored = roomsSubscribed.findIndex(r => r == this.room.id)
        if (roomStored < 0) { roomsSubscribed.push(this.room.id) }
      }
      else {roomsSubscribed = [this.room.id]}
      this._cache.updateData('rooms-subscribed', roomsSubscribed)

      return this._rooms.addMember(list, this.room, member ? member : null)
    }
  }

  
  openAddMember() {
    var addMemberDialog = this._dialog.open(AddMemberComponent, {
      width: '350px'
    })

    addMemberDialog.afterClosed().subscribe((result: MemberAdded) => {
      if (result) { this.validateMembers(result.list, result.player) }
    })
  }

  aceptRequest(invited) {
    let acept: RoomMember = this._cache.getDataKey('player')
    let aceptInvites: number = 0
    let inviteds: InvitedMember[] = this.room.invited_members
    inviteds.forEach(invi => {
      if (invi.by && invi.by == acept.nickname) { aceptInvites += 1}
    })

    if (aceptInvites < 5) {
      
      let inviIndex = inviteds.findIndex(i => i.pg_code == invited)
      this.room.invited_members[inviIndex].by = acept.nickname
      this._rooms.updateRoom(this.room)

    } else {

      this._alerts.sendMessageAlert('No puedes invitar a más de 5 jugadores')
    }

  }

  openShareDialog() {
    var dialog = this._dialog.open(ShareRoomComponent, {
      minWidth: 350
    })
  }

  clipPlayerCode(code: string) {
    code = code.replace(/\s/g, '')
    this._clipboard.copy(code)
    this._alerts.sendFloatNotification('Código de juagador copiado')
  }
  

  deleteMember(list: 'placed' | 'remote' | 'invited') {
    let player:RoomMember = this._cache.getDataKey('player')
    let memberList: RoomMember[] = this.room[`${list}_members`]
    
    let playerIndex = memberList.findIndex(m => m.pg_code == player.pg_code);
    
    memberList.splice(playerIndex, 1)
    this._rooms.updateRoom(this.room)
  }

  

  isHost() {
    let player: RoomMember = this._cache.getDataKey('player')
    if (player) {
      return this.room.host.pg_code == player.pg_code ? true : false
    } else {
      return false
    }
  }


  eliminarSala() {
    this._dialog.open(DeleteRoomComponent, {
      minWidth: 300,
      data:this.room.id
    })
  }

}
