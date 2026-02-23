package com.example.customerfeedbackform.dto;

import lombok.Data;

@Data
public class FeedBackDto {
	
	private Long userId;
    private String message;
    private int rating;

}
