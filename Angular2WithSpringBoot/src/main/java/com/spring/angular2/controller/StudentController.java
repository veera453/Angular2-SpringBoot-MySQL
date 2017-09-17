package com.spring.angular2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.angular2.model.Student;
import com.spring.angular2.service.IStudentService;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class StudentController {
	
	@Autowired
	private IStudentService studentService;
	
	@RequestMapping(value="/getStudentById", method=RequestMethod.GET)
	public ResponseEntity<Student> getStudentById(@RequestParam("id")  String id){
		Student student = studentService.getStudentById(Integer.parseInt(id));
		return new ResponseEntity<Student>(student, HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/saveStudentInfo", method=RequestMethod.POST )
	public ResponseEntity<Student> saveStudentInfo(@RequestBody Student student){
		boolean flag = studentService.saveStudentInfo(student);
		
		if(flag == false){
			return new ResponseEntity<Student>(student, HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<Student>(student, HttpStatus.OK);
	}
	
	@RequestMapping(value="/allStudents", method=RequestMethod.GET)
	public ResponseEntity<List<Student>> getAllStudents(){
		List<Student> list= studentService.getStudents();
		return new ResponseEntity<List<Student>>(list, HttpStatus.OK);
	}
	
	@RequestMapping(value="/updateStudent", method= RequestMethod.PUT)
	public  ResponseEntity<Student> updateStudentInfo(@RequestBody Student student){
        studentService.updateStudent(student);
        return new ResponseEntity<Student>(student, HttpStatus.OK);
	}
	
	@RequestMapping(value="/deleteStudent", method= RequestMethod.GET)
	public ResponseEntity<Void>  deleteStudent(@RequestParam("id") String id){
		studentService.deleteStudent(Integer.parseInt(id));
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

}
