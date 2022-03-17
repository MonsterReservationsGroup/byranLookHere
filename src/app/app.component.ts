import { transition, trigger, useAnimation } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import Hammer from 'hammerjs';
import { rotateCubeToLeft, rotateCubeToRight } from 'ngx-router-animations';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { TimelineService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slide', [
      transition(
        'landingcomponent => qualificationspagecomponent',
        useAnimation(rotateCubeToLeft)
      ),
      transition(
        'qualificationspagecomponent => destinationspagecomponent',
        useAnimation(rotateCubeToLeft)
      ),
      transition(
        'destinationspagecomponent => checkoutcomponent',
        useAnimation(rotateCubeToLeft)
      ),
      transition(
        'qualificationspagecomponent => landingcomponent',
        useAnimation(rotateCubeToRight)
      ),
      transition(
        'destinationspagecomponent => qualificationspagecomponent',
        useAnimation(rotateCubeToRight)
      ),
      transition(
        'checkoutcomponent => destinationspagecomponent',
        useAnimation(rotateCubeToRight)
      ),

      // transition('* => left', useAnimation(rotateCubeToRight)),
    ]),
  ],
})
export class AppComponent implements AfterViewInit {
  title = 'Ssa';
  trigger = 'right';
  constructor(
    private el: ElementRef,
    private timeline: TimelineService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {}
  ngAfterViewInit() {
    this.configureSwipe().subscribe(async (ev) => {
      if (ev.offsetDirection === 4) {
        //back
        this.trigger = 'right';
        this.timeline.back();
      } else if (ev.offsetDirection === 2) {
        //next
        this.trigger = 'left';
        this.timeline.next();
      }
    });
  }

  fireHelpModal() {
    Swal.fire({
      title: 'Help',
      icon: 'info',
      html: `
      <p>
        <b>Swipe left</b> to go to the next page.
      </p>
      <p>
        <b>Swipe right</b> to go to the previous page.
      </p>
      <p>
        <b>Tap</b> to select.
      </p>
      `,
      showCloseButton: true,
      showConfirmButton: false,
    });
  }

  getState(outlet: any) {
    const state = outlet.activatedRouteData.state;
    return state;
  }

  // turn hammer output into an observable
  private configureSwipe(debounceTime = 1000) {
    const output = new Subject<HammerInput>();
    this.initalizeHammer('swipe', output.next.bind(output), debounceTime);
    return output.asObservable();
  }

  //configure hammerjs
  private initalizeHammer(
    eventType: string,
    cb: (ev: HammerInput) => void,
    debounceTime: number
  ) {
    const mc = new Hammer.Manager(this.el.nativeElement);

    const swipe = new Hammer.Swipe();
    mc.add(swipe);

    mc.get('swipe').set({
      direction: Hammer.DIRECTION_HORIZONTAL,
      threshold: 0,
      enable: true,
      velocity: 0.1,
    });

    let enabled = true;
    mc.on(eventType, (ev) => {
      if (!enabled) return;
      if (ev.offsetDirection === 4 || ev.offsetDirection === 2) {
        cb(ev);
        enabled = false;
        setTimeout(() => {
          enabled = true;
        }, debounceTime);
      }
    });

    return mc;
  }
}
