package com.example.demo.dto;


import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResponseDTO<T> {
	
	// HTTP 응답으로 사용하게될 DTO
	
	private String error;
	private String test;
	private List<T> data;
}
