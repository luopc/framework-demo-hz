/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.dao</p>
 * <p>文件名:ManyToOneUserMapper.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-09 11:53
 * @todo 
 */
package com.cesgroup.demo.relevance.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.cesgroup.demo.relevance.entity.ManyToOneUser;
import com.cesgroup.framework.mybatis.dao.BaseDao;

/**
 * 多对一查询
 * @author huz
 * @date 2016-07-09
 * 
 */
public interface ManyToOneUserMapper extends BaseDao<ManyToOneUser, String> {
	
	/**
	 * 多对一动态分页查询，可以用$标示关联对象属性
	 * 按用户名和部门名查询
	 */
	public Page<ManyToOneUser> findByNameLikeAndDept$NameLike(String userName, String deptName, Pageable pageable);
	
}
