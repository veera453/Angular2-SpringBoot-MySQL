package com.spring.angular2.dao;

import java.math.BigInteger;
import java.util.List;

import com.spring.angular2.model.Student;

public interface IStudentDAO {
          
	      public Student getStudentById(int studentId);
	      public List<Student> getStudents();
	      public void saveStudentInfo(Student student);
	      public void updateStudent(Student student);
	      public void deleteStudent(int studentId);
	      public boolean studentExist(String studentName, String email, BigInteger mobile);
}
