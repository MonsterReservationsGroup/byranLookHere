import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

this component displays a small blurb along with a centered offset image giving a nice layering effect
takes as input an imageUrl and a title
takes the body as ng content

********************/

@Component({
  selector: 'rafa-image-offset-card',
  templateUrl: './image-offset-card.component.html',
  styleUrls: ['./image-offset-card.component.scss'],
})
export class ImageOffsetCardComponent implements AfterViewInit {
  @Input('title') title = '';
  @Input('image') image = '';
  @ViewChild('placeholder') placeholder: any = null as any;
  loaded = false;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    const img = document.createElement('img');
    this.http.get(this.image, { responseType: 'blob' }).subscribe(
      (data) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          img.src = reader.result as string;
          img.classList.add('text-box__image');
          this.placeholder.nativeElement.appendChild(img);
          this.loaded = true;
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
