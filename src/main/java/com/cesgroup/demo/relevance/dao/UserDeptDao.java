/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.dao</p>
 * <p>文件名:UserDeptDao.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-12 15:43
 * @todo 
 */
package com.cesgroup.demo.relevance.dao;

import java.util.List;

import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

import com.cesgroup.demo.relevance.entity.UserDept;
import com.cesgroup.framework.base.dao.IBaseDao;

/**
 * 
 * @author huz
 * @date 2016-07-12
 * 
 */
public interface UserDeptDao extends IBaseDao<UserDept>{
	/**
	 * 根据用户和部门信息查询
	 */
	List<UserDept> findUserDept(String userName, String deptName);
	
	/**
	 * 根据用户和部门信息查询
	 */
	@Select("select u.*,d.name dept_name,d.code from t_fw_user u,t_fw_dept d"
		+ " where u.dept_id=d.id"
		+ " and u.name like #{0, typeHandler=com.cesgroup.framework.mybatis.mapper.handler.LikeTypeHandler}"
		+ " and d.name like #{1, typeHandler=com.cesgroup.framework.mybatis.mapper.handler.LikeTypeHandler}")
	List<UserDept> findUserDeptBySql(String userName, String deptName);
	

	/**
	 * 根据用户和部门信息查询
	 */
	@SelectProvider(type = UserDeptProvider.class, method = "findUserDeptByProvider")
	List<UserDept> findUserDeptByProvider(String userName, String deptName);
}
