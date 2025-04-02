import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MissiondetailsComponent } from './missiondetails/missiondetails.component';
import { MissionlistComponent } from './missionlist/missionlist.component';
import { MaterialModule } from './material.component';
import { HttpClientModule } from '@angular/common/http';
import { SpacexapiService } from './network/spacexapi.service';
import { MissionfilterComponent } from './missionfilter/missionfilter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MissiondetailsComponent,
    MissionlistComponent,
    MissionfilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [SpacexapiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
