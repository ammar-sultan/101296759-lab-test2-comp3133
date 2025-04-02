import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mission } from '../models/missions';
import { SpacexapiService } from '../network/spacexapi.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
})
export class MissionlistComponent implements OnInit {
  listMission: Mission[] = [];
  paginatedMissions: Mission[] = [];
  pageSize: number = 9;
  pageIndex: number = 0;
  currentYear: number = new Date().getFullYear();

  constructor(
    private spacexapiService: SpacexapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spacexapiService.getAllList().subscribe((data: Mission[]): void => {
      this.listMission = data;
      this.updatePagination();
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMissions = this.listMission.slice(startIndex, endIndex);
  }
}
