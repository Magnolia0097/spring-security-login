package com.example.demo.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.TodoEntity;

@Repository
public interface TodoRepository extends JpaRepository<TodoEntity, String> {
	
	// = SELECT * FROM Todo WHERE userId = '{userId}' 와 같은 효과
	List<TodoEntity> findByUserId(String userId);
	
	// 복잡한 쿼리문은
	// @Query 문을 통해 지정 가능, 아래는 그 예시
	// @Query("select * from TodoEntity t where t.userId = ?1")
	
	
	
	
}
