import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  templateUrl: './delete-room.component.html',
  styleUrls: ['./delete-room.component.scss']
})
export class DeleteRoomComponent implements OnInit {

  constructor (
    public dialog_: MatDialogRef<DeleteRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public roomId: string,
    public rooms_: RoomsService
  ) { }

  ngOnInit(): void {
  }

}
