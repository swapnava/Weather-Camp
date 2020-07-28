package com.virtusa.project;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ApplicationController {

	@RequestMapping("/")
	public String login() {
		return "/WEB-INF/views/login.jsp";
	}
	
	@RequestMapping("/index")
	public String index() {
		return "/static/index.html";
	}
}