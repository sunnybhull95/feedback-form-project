package com.example.customerfeedbackform.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.customerfeedbackform.entity.UserEntity;

public interface UserRepo extends  JpaRepository<UserEntity, Long> {
	
	Optional<UserEntity> findByEmail(String email);

}
