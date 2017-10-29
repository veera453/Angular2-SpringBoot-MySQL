import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {StudentFormService} from './student-form.service';
import { Student } from '../student';

import { FlashMessagesService, IFlashMessageOptions } from '../../flash-messages/flash-messages.service';



@Component({
  selector: 'app-student-form',
  templateUrl: `./student-form.component.html`,
  styleUrls: [`./student-form.component.css`],
})

export class StudentFormComponent implements OnInit{

  //studentObj = new Student(1, 'Anji Reddy', 'veera.alamuri@gmail.com', 9000887145);
  allStudents: Student[];
  statusCode: number;
  studentIdToUpdate = null;
  processValidation = false;
  requestProcessing = false;
  submitted = false;
  //data: string;

  messageText: string;
  messageClass: string;
  messageTimeout: number;

  selectedRow: Number;
  setClickedRow: Function;

  readonly defaultMessage = '';
  readonly defaultClass = 'alert-success';

  readonly classList: string[] = [
    'alert-success',
    'alert-danger',
  ];

  createFlashMessage(messageText) {
    const message = messageText;
    const options: IFlashMessageOptions = {
      classes: [
        'alert',
        this.messageClass,
      ],
    };

    if (this.messageTimeout) {
      options.timeout = this.messageTimeout;
    }

    this.flashMessages.show(message, options);
  }

  //Create form group
  studentForm = new FormGroup({
    studentName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
    email: new FormControl(null, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')),
    mobile: new FormControl(null, [Validators.pattern('^[1-9][0-9]{9}$')]),
  });

  constructor(private studentFormService: StudentFormService,
    private flashMessages: FlashMessagesService) { 
   console.log("starting..");
   this.setClickedRow = function(index) {
     this.selectedRow = index;
   }
  }

  
  ngOnInit(): void {
    //this.messageClass = this.classList[0];
      this.getAllStudents();
  }

  onSubmit(){
    this.processValidation = true;
    this.submitted = true;

    if(this.studentForm.invalid){
      return; //validation failed exist from method
    }

    this.preProcessConfigurations() 
    let studentName = this.studentForm.get('studentName').value;
    let email = this.studentForm.get('email').value;
    let mobile = this.studentForm.get('mobile').value;
    
    if (this.studentIdToUpdate === null) {
      //Handle create student
      let student = new Student(null, studentName, email, mobile);

      this.studentFormService.saveStudentInfo(student)
        .subscribe(successCode => {
          this.statusCode = successCode;
          if (this.statusCode == 201) {
            this.messageClass = this.classList[0];
          this.createFlashMessage('Student Saved Successfully.');
          } 
          //this.preProcessConfigurations();
          this.getAllStudents();
          this.backToCreateStudent();
        },
        errorCode => {
          this.statusCode = errorCode;
          if (this.statusCode == 409) {
            this.messageClass = this.classList[1];
            this.createFlashMessage('Student alredy exist!');
          } else {
            this.messageClass = this.classList[1];
            this.createFlashMessage('Internal server error.');
          }
        });


    } else {
      //Handle update student 
      let student = new Student(this.studentIdToUpdate, studentName, email, mobile);

      this.studentFormService.updateStudentInfo(student)
        .subscribe(successCode => {
          this.statusCode = successCode;
          if (successCode == 200) {
            this.messageClass = this.classList[0];
            this.createFlashMessage('Student updated Successfully.');
          }
          this.getAllStudents();
          this.backToCreateStudent();
        },
        errorCode => { 
          this.statusCode = errorCode;
          this.messageClass = this.classList[1];
          this.createFlashMessage('internal server error');
          });
     }
}

//Load student by ID to Edit
  loadStudentToEdit(student: Student[], selectedRow: string) {
  this.preProcessConfigurations();
  this.studentFormService.getStudentById(student[selectedRow].studentId)
      .subscribe(student => {
        this.studentIdToUpdate = student.studentId;
        this.studentForm.setValue({studentName: student.studentName, email: student.email, mobile: student.mobile});
        this.processValidation=true;
        this.requestProcessing=false;
      },
      errorCode => this.statusCode = errorCode);
}

//delete student
  deleteStudent(student: Student[], selectedRow: string) {
  this.preProcessConfigurations();
  this.studentFormService.deleteStudentById(student[selectedRow].studentId)
      .subscribe(successCode => {
        this.statusCode = successCode;
        if (successCode == 204) {
          this.messageClass = this.classList[0];
          this.createFlashMessage('Student deleted Successfully.');
        }
        this.getAllStudents();
        this.backToCreateStudent();
    },
    errorCode => { 
      this.statusCode = errorCode
      this.messageClass = this.classList[1];
        this.createFlashMessage('internal server error');
      })
}

  //Fetch all students
  getAllStudents() {
    this.studentFormService.getAllStudents()
        .subscribe(
          data => this.allStudents = data,
          errorCode => {
            this.statusCode = errorCode;
          this.messageClass = this.classList[1];
          this.createFlashMessage('internal server error');
          });
     }

  //update

   preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;   
   }

   //Go back from update to create
   backToCreateStudent() {
          this.studentIdToUpdate = null;
          this.studentForm.reset();    
        this.processValidation = false;
   }

}
