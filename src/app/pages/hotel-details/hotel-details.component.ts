import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

this page displays the hotel details
********************/

interface HotelData_ {
  hotelName: string;
  description: string;
  nights: number;
  hotelPictures: Array<string>;
  detailDescription: string;
  roomType: string;
  detailItems: HotelDetail_[];
}

interface HotelDetail_ {
  photoUrl: string;
  title: string;
  blurb: string;
  reviewTag?: string;
}

@Component({
  selector: 'rafa-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
})
export class HotelDetailsComponent implements OnInit {
  testData: HotelData_ = {
    hotelName: 'the funky monkey lodge',
    roomType: '1 Br Condo',
    nights: 3,

    description:
      'Funky Monkey Lodge is located in the lovely beach town of Santa Teresa in Costa Rica. Only 200 m from the white sand beach and set back from the main road, on a gorgeous jungle property. The ideal place to relax, eat amazing food, meet new friends and enjoy some peace surrounded by nature.',
    hotelPictures: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    detailDescription: 'amenities',
    detailItems: [
      {
        photoUrl: '../../../assets/Hotel Amenities/Spa.jpg',
        title: 'Spa',
        blurb:
          "Have you been feeling stressed lately? Let's head over to the spa for some relaxation time. Our world-famous service will help take your worries away!",
        reviewTag: 'elfsight-app-7b888fe5-2cd0-46e1-bf81-d42493c44782 ',
      },
      {
        photoUrl: '../../../assets/Hotel Amenities/breakfast.webp',
        title: 'Free Breakfast',
        blurb:
          'The perfect way to start off your day! You deserve it, so come on in and enjoy a delicious breakfast on us',

        reviewTag: 'elfsight-app-7b888fe5-2cd0-46e1-bf81-d42493c44782 ',
      },
      {
        photoUrl: '../../../assets/Hotel Amenities/gym.jpg',
        title: 'On-site Gym',
        blurb:
          ' The onsite gym is the perfect place to get your sweat game on. There are plenty of machines and open spaces with no distractions, so you can focus solely on those gains!',

        reviewTag: 'elfsight-app-7b888fe5-2cd0-46e1-bf81-d42493c44782 ',
      },
      {
        photoUrl: '../../../assets/Hotel Amenities/pool.jpeg',
        title: 'Pool',
        blurb:
          'The refreshing pool and cool drinks are exactly what you need on a hot day. Soak your feet in the water while enjoying that ice-cold beverage!',
        reviewTag: 'elfsight-app-7b888fe5-2cd0-46e1-bf81-d42493c44782 ',
      },
      {
        photoUrl: '../../../assets/Hotel Amenities/wifi.jpg',
        title: 'Free Wifi',
        blurb:
          'World-class connectivity. Free high speed WiFi to connect, stream and game the world is your oyster',
        reviewTag: 'elfsight-app-7b888fe5-2cd0-46e1-bf81-d42493c44782 ',
      },
    ],
  };
  images: GalleryItem[] = [];
  thumbPosition = 'left' as any;
  isFluid = false;

  constructor(private state: services.StateService) {}

  resizeGallery() {
    const windowWidth = window.innerWidth;
    console.log(windowWidth);
    if (windowWidth < 1000) {
      this.thumbPosition = 'bottom';
      this.isFluid = true;
    } else {
      this.thumbPosition = 'left';
      this.isFluid = false;
    }
  }

  ngOnInit(): void {
    console.log(this.testData);
    const dest = this.state.selectedDestination;
    const date = this.state.selectedDate;
    this.testData.nights = date.availableRoomTypes[0].minNights;
    this.testData.roomType = date.availableRoomTypes[0].roomType;
    console.log({ dest, date });
    // make responsive
    this.resizeGallery();
    window.onresize = this.resizeGallery.bind(this);
    // turn the test object pictures into gallery items
    this.images = this.testData.hotelPictures.map((_src) => {
      let src = `../../../assets/Hotel Amenities/fm${_src}.jpeg`;
      return new ImageItem({ src, thumb: src });
    });
  }
}
