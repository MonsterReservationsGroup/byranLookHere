import { Component, OnInit } from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import { fadeInOut } from '../../animations/fade-in-out';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

 this allows the guest to select a destination
********************/
const lorem = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae odio iste
    nihil labore quisquam blanditiis, voluptate nemo ex alias nulla repellat,
    atque id a nam, natus deleniti debitis maxime aperiam?`;
const footer = '$11';

const testCardTemplates = [
  {
    image:
      'https://www.flytap.com/-/media/Flytap/new-tap-pages/destinations/north-america/dominican-republic/punta-cana/Images-Landing-Page-Destinations-punta-cana/PUJ_PagDestino_JUN2021_HeroeBannerMobile_1024x553.jpg',
    lorem,
    destName: 'Punta Cana',
    footer,
  },
  {
    image:
      'https://i0.wp.com/bransontravel.com/wp-content/uploads/2020/09/aquarium.jpg',
    lorem,
    destName: 'Branson',
    footer,
  },
];

@Component({
  selector: 'rafa-destinations-page',
  templateUrl: './destinations-page.component.html',
  styleUrls: ['./destinations-page.component.scss'],
  animations: [fadeInOut],
})
export class DestinationsPageComponent implements OnInit {
  validate(date: Date) {
    return Math.random() > 0.9;
  }

  toggleDate(picker: any, dest: any) {
    this.state.selectedDestination = dest;
    console.log(this.state);
    if (this.tutorialShown) return;
    picker.toggle();
  }

  async toggleTutorialShown() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    this.tutorialShown = false;
  }

  moveToNext(e: Date) {
    this.state.selectedDate = e;
    this.timeline.next();
  }

  testOptions = [1, 1, 2, 1, 2, 1].map((c) => testCardTemplates[c - 1]);
  destinationPicked = false;
  tutorialShown = false;

  constructor(
    private state: services.StateService,
    private timeline: services.TimelineService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.tutorialShown = true;
    }, 300);
  }
}
