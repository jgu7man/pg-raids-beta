import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../../public/services/cache.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {

  roomId:string
  constructor (
    private _cache: CacheService
  ) { }

  ngOnInit(): void {
    
  }

}
