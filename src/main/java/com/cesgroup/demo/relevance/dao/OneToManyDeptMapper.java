/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.framework.mybatis.associate.dao</p>
 * <p>文件名:OneToManyDeptMapper.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-08 16:42
 * @todo 
 */
package com.cesgroup.demo.relevance.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.cesgroup.demo.relevance.entity.OneToManyDept;
import com.cesgroup.framework.mybatis.dao.BaseDao;

/**
 * 一对多查询
 * @author huz
 * @date 2016-07-08
 * 注意：在一对多情况下，分页是不准确的，因此不建议使用分页查询
 */
public interface OneToManyDeptMapper extends BaseDao<OneToManyDept, String> {
	
	/**
	 * 一对多动态查询，可以用$标示关联对象属性
	 */
	public List<OneToManyDept> findByNameLikeUsers$LoginNameLike(String name, String loginName);
	
	
	public Page<OneToManyDept> selectAllOneToManyDept(Pageable pageable);
}
