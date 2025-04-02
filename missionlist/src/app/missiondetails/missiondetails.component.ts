import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpacexapiService } from '../network/spacexapi.service';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css'],
})
export class MissiondetailsComponent implements OnInit {
  singleMission: any;
  flightNo: any;
  currentYear: number = new Date().getFullYear();

  constructor(
    private route: ActivatedRoute,
    private spacexapiService: SpacexapiService
  ) {}

  ngOnInit() {
    this.flightNo = this.route.snapshot.params['flight_number'];
    this.getSingleMission();
  }

  getSingleMission() {
    this.spacexapiService
      .getMissionDetail(this.flightNo)
      .subscribe((data: any) => {
        this.singleMission = data;
        console.log(this.singleMission);
      });
  }
}
