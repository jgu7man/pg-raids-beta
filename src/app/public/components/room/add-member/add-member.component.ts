import { Component, OnInit } from '@angular/core';
import { RoomMember } from '../../../models/room.model';
import { RoomsService } from '../../../services/rooms.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  lists: RoomList[] = [
    {value: 'placed', display: 'Presenciales'},
    {value: 'remote', display: 'Remotos'},
    {value: 'invited', display: 'Invitados'}
  ]

  memberAdded: MemberAdded = {
    player: {nickname: '', pg_code: ''},
    list: 'placed'
  }

  constructor (
    public dialog_: MatDialogRef<AddMemberComponent>,
    public rooms_: RoomsService
  ) { }

  ngOnInit(): void {
  }

  capture() {
    this.memberAdded.player.pg_code = this.memberAdded.player.pg_code.replace(/\s/g, '')
    this.dialog_.close(this.memberAdded)
  }
  

}

export interface MemberAdded {
  player: RoomMember,
  list: "placed" | "remote" | "invited"
}

interface RoomList {
  value: string,
  display: string
}