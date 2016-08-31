/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.dao</p>
 * <p>文件名:UserDeptProvider.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-12 16:10
 * @todo 
 */
package com.cesgroup.demo.relevance.dao;

import java.util.Map;

/**
 * 
 * @author huz
 * @date 2016-07-12
 * 
 */
public class UserDeptProvider {
	
	
	public String findUserDeptByProvider(Map<String, Object> params){
		return "select u.*,d.name dept_name,d.code from t_fw_user u,t_fw_dept d"
				+ " where u.dept_id=d.id"
				+ " and u.name like #{0, typeHandler=com.cesgroup.framework.mybatis.mapper.handler.LikeTypeHandler}"
				+ " and d.name like #{1, typeHandler=com.cesgroup.framework.mybatis.mapper.handler.LikeTypeHandler}";
	}
}
