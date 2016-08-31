/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.test.web</p>
 * <p>文件名:UserDeptController.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-12 16:43
 * @todo 
 */
package com.cesgroup.demo.relevance.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cesgroup.demo.relevance.entity.UserDept;
import com.cesgroup.demo.relevance.service.UserDeptService;
import com.cesgroup.framework.base.annotation.Logger;
import com.cesgroup.framework.springmvc.web.BaseController;

/**
 * 
 * @author huz
 * @date 2016-07-12
 * 
 */
@Controller
@RequestMapping("/userdept")
public class UserDeptController extends BaseController {
	@Autowired
	private UserDeptService service;
	
	@RequestMapping("/search")
	@Logger(action="查询", logger="用户名包含${username}，部门名包含${deptname}")
	public String search(String username, String deptname, Model model){
		List<UserDept> list = service.findUserDept(username, deptname);
		model.addAttribute("list", list);
		return "list";
	}
}
