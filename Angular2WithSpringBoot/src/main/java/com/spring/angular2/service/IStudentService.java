package com.spring.angular2.service;

import java.util.List;

import com.spring.angular2.model.Student;

public interface IStudentService {
	public Student getStudentById(int studentId);
	public List<Student> getStudents();
	public boolean saveStudentInfo(Student student);
	public void updateStudent(Student student);
	public void deleteStudent(int studentId);

}
