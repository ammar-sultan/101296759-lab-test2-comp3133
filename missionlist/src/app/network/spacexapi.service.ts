import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpacexapiService {
  private baseUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getAllList(): any {
    return this.http.get(`${this.baseUrl}?`);
  }

  getMissionFilter(year: string): any {
    return this.http.get(`${this.baseUrl}?launch_year=${year}`);
  }

  getSuccessLaunch(launch_success: boolean): any {
    return this.http.get(`${this.baseUrl}?launch_success=${launch_success}`);
  }

  getSuccessLanding(landing_intent: boolean): any {
    return this.http.get(`${this.baseUrl}?landing_intent=${landing_intent}`);
  }

  getMissionDetail(flightNo: any): any {
    return this.http.get(`${this.baseUrl}/${flightNo}`);
  }
}
