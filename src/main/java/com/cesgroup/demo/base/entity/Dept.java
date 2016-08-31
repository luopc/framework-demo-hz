/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.entity</p>
 * <p>文件名:Dept.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-08 14:53
 * @todo 
 */
package com.cesgroup.demo.base.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.cesgroup.framework.mybatis.entity.StringIDEntity;

/**
 * 
 * @author huz
 * @date 2016-07-08
 * 
 */
@Entity
@Table(name="t_fw_dept")
public class Dept extends StringIDEntity {
	private static final long serialVersionUID = 4056219063501638281L;
	
	private String name;
	private String code;
	private String comments;
	private Integer orderNo;
	private String parentId;
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
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
	/**
	 * @return the comments
	 */
	public String getComments() {
		return comments;
	}
	/**
	 * @param comments the comments to set
	 */
	public void setComments(String comments) {
		this.comments = comments;
	}
	/**
	 * @return the orderNo
	 */
	public Integer getOrderNo() {
		return orderNo;
	}
	/**
	 * @param orderNo the orderNo to set
	 */
	public void setOrderNo(Integer orderNo) {
		this.orderNo = orderNo;
	}
	/**
	 * @return the parentId
	 */
	public String getParentId() {
		return parentId;
	}
	/**
	 * @param parentId the parentId to set
	 */
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	
}
