import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import {StudentFormService} from './student-form.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-form',
  templateUrl: `./student-form.component.html`,
  styleUrls: [`./student-form.component.css`],
})
export class StudentFormComponent implements OnInit {

  //studentObj = new Student(1, 'Anji Reddy', 'veera.alamuri@gmail.com', 9000887145);
  allStudents: Student[];
  statusCode: number;
  studentIdToUpdate = null;
  processValidation = false;
  requestProcessing = false;
  submitted = false;
  //data: string;

  //Create form group
  studentForm = new FormGroup({
    studentName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),

  });

  constructor(private studentFormService: StudentFormService,
    private builder:FormBuilder) { 
   console.log("starting..");
  }

  
  ngOnInit(): void {
    this.getAllStudents();
  }

  onSubmit(){
    this.processValidation = true;
    this.submitted = true;

    if(this.studentForm.invalid){
      return; //validation failed exist from method
    }

    this.preProcessConfigurations() 
    let studentName = this.studentForm.get('studentName').value.trim();
    let email = this.studentForm.get('email').value.trim();
    let mobile = this.studentForm.get('mobile').value;
    
    if(this.studentIdToUpdate === null){
      //Handle create student
     let student = new Student(null, studentName, email, mobile);

     this.studentFormService.saveStudentInfo(student)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.preProcessConfigurations();
        this.getAllStudents();
        this. backToCreateStudent();
      },
      errorCode => this.statusCode = errorCode);
  }else{
    //Handle update student 
    let student = new Student(this.studentIdToUpdate, studentName, email, mobile);

    this.studentFormService.updateStudentInfo(student)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllStudents();
          this.backToCreateStudent();
        })
  }
}

//Load student by ID to Edit
loadStudentToEdit(studentId: string){
  this.preProcessConfigurations();
  this.studentFormService.getStudentById(studentId)
      .subscribe(student => {
        this.studentIdToUpdate = student.studentId;
        this.studentForm.setValue({studentName: student.studentName, email: student.email, mobile: student.mobile});
        this.processValidation=true;
        this.requestProcessing=false;
      },
      errorCode => this.statusCode = errorCode);
}

//delete student
deleteStudent(studentId: string) {
  this.preProcessConfigurations();
  this.studentFormService.deleteStudentById(studentId)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllStudents();
        this.backToCreateStudent();
      })
}

  //Fetch all students
  getAllStudents() {
    this.studentFormService.getAllStudents()
        .subscribe(
          data => this.allStudents = data,
          errorCode => this.statusCode = errorCode);

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
