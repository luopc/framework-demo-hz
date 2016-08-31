/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.framework.mybatis.associate.entity</p>
 * <p>文件名:OneToManyDept.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-08 16:41
 * @todo 
 */
package com.cesgroup.demo.relevance.entity;

import java.util.List;

import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.cesgroup.demo.base.entity.Dept;
import com.cesgroup.demo.base.entity.User;


/**
 * 一对多的部门
 * @author huz
 * @date 2016-07-08
 * 
 */
public class OneToManyDept extends Dept {
	private static final long serialVersionUID = 4038352227001968306L;
	
	@OneToMany
	@JoinColumn(name="dept_id")
	private List<User> users;

	/**
	 * @return the users
	 */
	public List<User> getUsers() {
		return users;
	}

	/**
	 * @param users the users to set
	 */
	public void setUsers(List<User> users) {
		this.users = users;
	}
	
}
