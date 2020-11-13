import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  menuTrigger: Subject<boolean> = new Subject()

  constructor () {}
  
  

}
