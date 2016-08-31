/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.framework.mybatis.associate.entity</p>
 * <p>文件名:ManyToOneUser.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-08 16:38
 * @todo 
 */
package com.cesgroup.demo.relevance.entity;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.cesgroup.demo.base.entity.Dept;
import com.cesgroup.demo.base.entity.User;


/**
 * 多对一关联的用户
 * @author huz
 * @date 2016-07-08
 * 
 */
public class ManyToOneUser extends User {
	
	private static final long serialVersionUID = 6946104691119346937L;
	
	@ManyToOne
    @JoinColumn(name="dept_id")  
	private Dept dept;
	
	/**
	 * 
	 * @return
	 * @see com.cesgroup.demo.system.entity.User#getDeptId()
	 */
	@Override
	@Transient
	public String getDeptId() {
		return super.getDeptId();
	}

	/**
	 * @return the dept
	 */
	public Dept getDept() {
		return dept;
	}

	/**
	 * @param dept the dept to set
	 */
	public void setDept(Dept dept) {
		this.dept = dept;
	}
	
	
}
