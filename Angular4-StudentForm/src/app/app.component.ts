import { Component } from '@angular/core';
import {StudentFormComponent} from './student-form/student-form.component';
import { FlashMessagesService, IFlashMessageOptions } from '../flash-messages/flash-messages.service';

@Component({
  selector: 'app-root',
  template: '<app-student-form>loading...</app-student-form>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
