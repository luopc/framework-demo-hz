/*******************************************************************************
 * Copyright (c) 2005, 2014 springside.github.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 *******************************************************************************/
package com.cesgroup.demo.login.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * LoginController负责打开登录页面(GET请求)和登录出错页面(POST请求)，
 * 
 * 真正登录的POST请求由Filter完成,
 * 
 */
@Controller
@RequestMapping(value = "/login")
public class LoginController {
	
	public static final String USERNAME_PARAM = "username";
	
	/**
	 * 登录页面跳转
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET)
	public String login(Model model) {
		model.addAttribute("loginFlag", "1");
		return "login/login";
	}

	/**
	 * 登录失败跳转
	 * @param userName
	 * @param model
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	public String fail(@RequestParam(USERNAME_PARAM) String userName, Model model) {
		model.addAttribute(USERNAME_PARAM, userName);
		return "login/login";
	}
}
