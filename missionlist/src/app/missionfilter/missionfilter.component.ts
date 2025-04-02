import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mission } from '../models/missions';
import { SpacexapiService } from '../network/spacexapi.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-missionfilter',
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css'],
})
export class MissionfilterComponent implements OnInit {
  launchYears = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
  ];
  launchYearSelectedIndex: any;
  currentYear: number = new Date().getFullYear();

  // Pagination properties
  pageSize: number = 9;
  pageIndex: number = 0;
  paginatedMissions: Mission[] = [];

  // Mission lists
  listMission: Mission[] = [];
  originalMissions: Mission[] = [];

  // Search term
  searchTerm: string = '';

  constructor(
    private spacexapiService: SpacexapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spacexapiService.getAllList().subscribe((data: Mission[]): void => {
      this.originalMissions = data;
      this.listMission = data;
      this.updatePagination();
    });
  }

  // Update pagination slice
  updatePagination(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMissions = this.listMission.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagination();
  }

  getAll(): any {
    this.spacexapiService.getAllList().subscribe(
      (data: any) => {
        this.originalMissions = data;
        this.listMission = data;
        this.updatePagination();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  missionFilter(index: number, year: string): any {
    this.getFilteredLaunches(year);
    this.launchYearSelectedIndex = index;
  }

  getFilteredLaunches(year: string): any {
    this.spacexapiService.getMissionFilter(year).subscribe(
      (data: any) => {
        this.listMission = data;
        // Update the original missions too so that search works on filtered data
        this.originalMissions = data;
        this.pageIndex = 0;
        this.updatePagination();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  successLaunchFilter(value: boolean): any {
    this.getSuccessLaunch(value);
  }

  getSuccessLaunch(value: boolean): any {
    this.spacexapiService.getSuccessLaunch(value).subscribe(
      (data: any) => {
        this.listMission = data;
        this.originalMissions = data;
        this.pageIndex = 0;
        this.updatePagination();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  successLandingFilter(value: boolean): any {
    this.getSuccessLanding(value);
  }

  getSuccessLanding(value: boolean): any {
    this.spacexapiService.getSuccessLanding(value).subscribe(
      (data: any) => {
        this.listMission = data;
        this.originalMissions = data;
        this.pageIndex = 0;
        this.updatePagination();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  removeFilter(): void {
    this.searchTerm = '';
    this.getAll();
    this.launchYearSelectedIndex = null;
  }

  // Helper method to support both array and number formats for mission_id
  public getMissionIds(data: any): string {
    if (Array.isArray(data.mission_id)) {
      return data.mission_id.length > 0
        ? data.mission_id.join(', ')
        : 'Not found :(';
    } else {
      return data.mission_id ? data.mission_id.toString() : 'Not found :(';
    }
  }

  // Search functionality to filter missions by mission_name
  public searchMissions(): void {
    if (this.searchTerm.trim() === '') {
      // If search is empty, revert to the full list
      this.listMission = this.originalMissions;
    } else {
      this.listMission = this.originalMissions.filter((mission: Mission) =>
        mission.mission_name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    }
    this.pageIndex = 0;
    this.updatePagination();
  }
}
