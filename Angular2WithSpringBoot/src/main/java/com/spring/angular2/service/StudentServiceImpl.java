package com.spring.angular2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.angular2.dao.IStudentDAO;
import com.spring.angular2.model.Student;

@Service
public class StudentServiceImpl implements IStudentService {

	@Autowired
	private IStudentDAO studentDao;
	
	@Override
	public boolean saveStudentInfo(Student student) {
		// TODO Auto-generated method stub
		if(studentDao.studentExist(student.getStudentName(), student.getEmail(), student.getMobile())){
			return false;
		}else{
			  studentDao.saveStudentInfo(student);
				return true;  
		}
     
	}

	@Override
	public List<Student> getStudents() {
		// TODO Auto-generated method stub
		return studentDao.getStudents();
	}

	@Override
	public Student getStudentById(int studentId) {
		// TODO Auto-generated method stub
		return studentDao.getStudentById(studentId);
	}

	@Override
	public void updateStudent(Student student) {
		// TODO Auto-generated method stub
		studentDao.updateStudent(student);
		
	}

	@Override
	public void deleteStudent(int studentId) {
		// TODO Auto-generated method stub
		studentDao.deleteStudent(studentId);
		
	}

}
