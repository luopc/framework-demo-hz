/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.service</p>
 * <p>文件名:UserDeptService.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-12 16:27
 * @todo 
 */
package com.cesgroup.demo.relevance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cesgroup.demo.relevance.dao.UserDeptDao;
import com.cesgroup.demo.relevance.entity.UserDept;

/**
 * 
 * @author huz
 * @date 2016-07-12
 * 
 */
@Service
@Transactional(readOnly = true)
public class UserDeptService {
	
	@Autowired
	private UserDeptDao dao;
	
	/**
	 * 根据用户和部门信息查询
	 */
	public List<UserDept> findUserDept(String userName, String deptName){
		return dao.findUserDept(userName, deptName);
	}
	
}
