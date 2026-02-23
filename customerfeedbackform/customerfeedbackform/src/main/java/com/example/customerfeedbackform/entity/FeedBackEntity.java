package com.example.customerfeedbackform.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;

@Entity
@Data
public class FeedBackEntity {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String message;

	    private int rating;

	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    private UserEntity user;
	    

	    private LocalDateTime createdAt;

	    private LocalDateTime updatedAt;

	    @PrePersist
	    public void onCreate() {
	        this.createdAt = LocalDateTime.now();
	    }

	    @PreUpdate
	    public void onUpdate() {
	        this.updatedAt = LocalDateTime.now();
	    }

}
