/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.entity</p>
 * <p>文件名:UserDept.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-12 15:41
 * @todo 
 */
package com.cesgroup.demo.relevance.entity;

import com.cesgroup.demo.base.entity.User;

/**
 * 
 * @author huz
 * @date 2016-07-12
 * 
 */
public class UserDept extends User {
	private static final long serialVersionUID = -1424155757706153880L;
	
	/** Dept.name */
	private String deptName;
	/** Dept.code */
	private String code;
	/**
	 * @return the deptName
	 */
	public String getDeptName() {
		return deptName;
	}
	/**
	 * @param deptName the deptName to set
	 */
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	/**
	 * @return the code
	 */
	public String getCode() {
		return code;
	}
	/**
	 * @param code the code to set
	 */
	public void setCode(String code) {
		this.code = code;
	}
	
	
}
