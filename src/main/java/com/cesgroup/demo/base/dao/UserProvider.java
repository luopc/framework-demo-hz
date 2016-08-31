/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.framework.mybatis.base.dao</p>
 * <p>文件名:UserProvider.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-07 15:25
 * @todo 
 */
package com.cesgroup.demo.base.dao;

import java.util.Map;

import com.cesgroup.framework.mybatis.mapper.handler.LikeTypeHandler;

/**
 * 
 * @author huz
 * @date 2016-07-07
 * 
 */
public class UserProvider {
	
	/**
	 * 
	 * @see com.cesgroup.demo.system.dao.UserMapper#findByProvider(String,String)
	 */
	public String findByProvider(Map<String, Object> params){
		return "select * from t_fw_user where name like #{name,typeHandler="
				+ LikeTypeHandler.class.getCanonicalName()+"}"
				+ " and login_name like #{param2,typeHandler="
				+ LikeTypeHandler.class.getCanonicalName()+"}";
	}
	
	/**
	 * 
	 * @see com.cesgroup.demo.system.dao.UserMapper#findPageByProvider(String,String,Pageable)
	 */
	public String findPageByProvider(Map<String, Object> params){
		return "select * from t_fw_user where name like #{name,typeHandler="
				+ LikeTypeHandler.class.getCanonicalName()+"}"
				+ " and login_name like #{param2,typeHandler="
				+ LikeTypeHandler.class.getCanonicalName()+"}";
	}
}
