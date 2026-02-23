package com.example.customerfeedbackform.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class AdminFeedbackDto {
	

    private Long feedbackId;
    private String userName;
    private String message;
    private int rating;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
