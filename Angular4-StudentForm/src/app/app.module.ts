import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlashMessagesModule } from '../flash-messages/flash-messages.module';
import { AppComponent } from './app.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentFormService } from './student-form/student-form.service';
import { SearchComponent } from './student-form/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentFormComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FlashMessagesModule,
  ],
  providers: [StudentFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
