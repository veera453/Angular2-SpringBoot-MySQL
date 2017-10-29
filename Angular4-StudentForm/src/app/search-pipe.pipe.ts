import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'studentName'
})
export class SearchPipePipe implements PipeTransform {

	transform(studentNames: any, searchText?: any): any {
		if (searchText == null) return studentNames;

		return studentNames.filter(function(category) {
			return category.studentName.toLowerCase().indexOf(searchText) > -1;
		})
	}
}
