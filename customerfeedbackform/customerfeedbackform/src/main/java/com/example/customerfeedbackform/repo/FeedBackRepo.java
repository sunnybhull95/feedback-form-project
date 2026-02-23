package com.example.customerfeedbackform.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.customerfeedbackform.entity.FeedBackEntity;

public interface FeedBackRepo extends JpaRepository<FeedBackEntity, Long> {
	
	Optional<FeedBackEntity> findByUserId(Long userId);

}
