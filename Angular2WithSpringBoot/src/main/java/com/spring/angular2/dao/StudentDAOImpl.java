package com.spring.angular2.dao;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.spring.angular2.model.Student;

@Transactional
@Repository
public class StudentDAOImpl implements IStudentDAO {

	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public void saveStudentInfo(Student student) {
		// TODO Auto-generated method stub
	      entityManager.persist(student);	
	}

	@Override
	public List<Student> getStudents() {
		// TODO Auto-generated method stub
		String hql="from Student as s ORDER BY s.studentId ASC";
		@SuppressWarnings("unchecked")
		List<Student> resultList = (List<Student>) entityManager.createQuery(hql).getResultList();
		return resultList;
	}

	@Override
	public Student getStudentById(int studentId) {
		// TODO Auto-generated method stub
		return entityManager.find(Student.class, studentId);
	}

	@Override
	public void updateStudent(Student student) {
		// TODO Auto-generated method stub
		
		Student std=getStudentById(student.getStudentId());
		std.setStudentName(student.getStudentName());
		std.setEmail(student.getEmail());
		std.setMobile(student.getMobile());
		entityManager.flush();
		
	}

	@Override
	public void deleteStudent(int studentId) {
		// TODO Auto-generated method stub
		entityManager.remove(getStudentById(studentId));
	}

	@Override
	public boolean studentExist(String studentName, String email, BigInteger mobile) {
		// TODO Auto-generated method stub
		String hql= "from Student as s where s.studentName = ? and s.email = ? and s.mobile = ? ";
		int count = entityManager.createQuery(hql).setParameter(1, studentName).setParameter(2, email).setParameter(3, mobile).getResultList().size();
		return count>0 ? true : false;
	}

}
