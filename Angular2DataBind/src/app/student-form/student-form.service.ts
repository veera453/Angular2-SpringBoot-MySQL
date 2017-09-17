import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import {Student} from '../student';

@Injectable()
export class StudentFormService {

	//URLs from CRUD operations
	studentUrl="http://localhost:8080/saveStudentInfo";
  allStudentsUrl="http://localhost:8080/allStudents";
  studentByIdUrl= "http://localhost:8080/getStudentById";
  studentUpdateUrl = "http://localhost:8080/updateStudent";
  studentDeleteUrl = "http://localhost:8080/deleteStudent/{id}";

  constructor(private http: Http) { }

  //Get student by ID
  getStudentById(studentId: string): Observable<Student>{
       let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
       let cpParams = new URLSearchParams();
       cpParams.set('id', studentId);
       let option = new RequestOptions({headers: cpHeaders, params: cpParams});
       return this.http.get(this.studentByIdUrl, option)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  //Save student information
  saveStudentInfo(student: Student):Observable<number>{
  	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  	return this.http.post(this.studentUrl, student)
  	          .map(success => success.status)
  	          .catch(this.handleError);

  }

  //update student information
  updateStudentInfo(student: Student): Observable<number>{
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });

    return this.http.put(this.studentUpdateUrl, student)
           .map(success => success.status)
              .catch(this.handleError);
  }

  //Delete student 
  deleteStudentById(studentId: string): Observable<number>{
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', studentId);      
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });

    return this.http.delete(this.studentDeleteUrl, cpParams)
               .map(success => success.status)
               .catch(this.handleError);
  }

  //get all studnets
  getAllStudents():Observable<Student[]>{
     return this.http.get(this.allStudentsUrl)
            .map(this.extractData)
            .catch(this.handleError);
  }


  private extractData(res: Response) {
	let body = res.json();
        return body;
    }
  private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }

}
