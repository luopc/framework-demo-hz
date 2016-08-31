/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.entity</p>
 * <p>文件名:TestLongEntity.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-20 13:47
 * @todo 
 */
package com.cesgroup.demo.system.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.cesgroup.framework.mybatis.entity.LongIDEntity;

/**
 * 
 * @author huz
 * @date 2016-07-20
 * 
 */
@Entity
@Table(name="t_fw_test")
public class TestLongEntity extends LongIDEntity {
	private static final long serialVersionUID = 488193369743795114L;
	private String name;

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
	
	
}
