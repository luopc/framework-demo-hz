/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.framework.mybatis.base.dao</p>
 * <p>文件名:UserMapper.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-07 14:39
 * @todo 
 */
package com.cesgroup.demo.base.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.cesgroup.demo.base.entity.User;
import com.cesgroup.framework.mybatis.dao.BaseDao;

/**
 * 用户Mapper
 * @author huz
 * @date 2016-07-07
 * 
 */
public interface UserMapper extends BaseDao<User, String>{
	
	/**
	 * 
	 * @param entity
	 * @see com.cesgroup.framework.mybatis.dao.BaseCRUDDao#insert(com.cesgroup.framework.base.entity.BaseEntity)
	 */
	public void insert(List<User> entitys);
	
	
	/**
	 * 
	 * @param entity
	 * @see com.cesgroup.framework.mybatis.dao.BaseCRUDDao#insert(com.cesgroup.framework.base.entity.BaseEntity)
	 */
	public void insertList(List<User> entitys);

	/**
	 * 根据用户名查询用户并按注册日期排序.
	 */
	public List<User> findByNameOrderByRegisterDateAsc(String name);
	
	/**
	 * 根据用户名及登录名模糊搜索用户.
	 */
	public List<User> findByNameLikeAndLoginNameLike(String name,String loginName);
	
	/**
	 * 根据用户名模糊分页搜索用户.
	 */
	public Page<User> findByNameLike(String name, Pageable pageable);
	
	/**
	 * 根据登录名获取用户.
	 */
	public User findByLoginName(String loginName);
	
	/**
	 * 使用SQL查询
	 */
	@Select("select * from t_fw_user where login_name like #{loginName}")
	public List<User> findBySql(String loginName);
	
	/**
	 * 使用Provider查询
	 */
	@SelectProvider(type = UserProvider.class, method = "findByProvider")
	public List<User> findByProvider(@Param("name") String name, String loginName);
	
	/**
	 * 使用xml配置查询
	 */
	public List<User> findByXml(String name, String loginName);

	/**
	 * 使用SQL分页查询
	 */
	@Select("select * from t_fw_user where login_name like #{loginName}")
	public Page<User> findPageBySql(String loginName, Pageable pageable);
	
	/**
	 * 使用SQL分页查询
	 */
	@Select("select * from t_fw_user where login_name like '%user%'")
	public Page<User> findPageByLoginNameBySql(Pageable pageable);
	
	/**
	 * 使用Provider分页查询
	 */
	@SelectProvider(type = UserProvider.class, method = "findPageByProvider")
	public Page<User> findPageByProvider(@Param("name") String name, String loginName, Pageable pageable);
	
	/**
	 * 使用xml配置分页查询
	 */
	public Page<User> findPageByXml(String name, String loginName, Pageable pageable);
}
