import { Component, OnInit } from '@angular/core';

//import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { SearchService } from './search.service';
import { Student } from '../../student';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [SearchService],
  styles: []
})
export class SearchComponent implements OnInit {
  students: Observable<Student[]>;
  private searchTerms = new Subject<string>();

  constructor( private searchService: SearchService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.students = this.searchTerms
                        .debounceTime(300)        // wait 300ms after each keystroke before considering the term
                        .distinctUntilChanged()   // ignore if next search term is same as previous
                        .switchMap(term => term   // switch to new observable each time the term changes
                        // return the http search observable
                        ? this.searchService.search(term)
                        // or the observable of empty heroes if there was no search term
                        : Observable.of<Student[]>([]))
                        .catch(error => {
                        // TODO: add real error handling
                         console.log(error);
                        return Observable.of<Student[]>([]);
      });
  }

  gotoDetail(student: Student): void {
    let link = ['/detail', student];
    //this.router.navigate(link);
  }

}
