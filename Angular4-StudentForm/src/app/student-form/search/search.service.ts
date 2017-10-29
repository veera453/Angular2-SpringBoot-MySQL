import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';


import { Student } from '../../student';


@Injectable()
export class SearchService {
     
	constructor(private http: Http) { }

	search(term: string): Observable<Student[]> {
		return this.http
			.get(`http://localhost:8080/allStudents/students/?studentName=${term}`)
			.map(response => response.json().data as Student[]);
	}

}
