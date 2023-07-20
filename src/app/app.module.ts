import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './employe/add/add.component';
import { EditComponent } from './employe/edit/edit.component';
import { ListComponent } from './employe/list/list.component';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// import { ServicesComponent } from './service/services/services.component';

@NgModule({
  //Component
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    ListComponent
    // ServicesComponent
  ],
  //Modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule 
  ],
  //Services
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
