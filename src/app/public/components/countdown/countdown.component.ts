import { Component, Input, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  timer$: Observable<any>
  now = new Date().getTime()
  @Input() future
  constructor() { }

  ngOnInit(): void {
    this.timer$ = timer(0, 1000).pipe(
      scan(acc => --acc, this.secondsToMatch()),
      takeWhile(x => x >= 0)
    )
  }


  secondsToMatch() {
    var delta = (this.future - this.now) / 1000;
    console.log(delta);
    return Math.ceil(delta)
  }

}
