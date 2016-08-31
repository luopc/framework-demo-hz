/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.framework.mybatis.base.dao</p>
 * <p>文件名:DeptMapper.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-08 14:59
 * @todo 
 */
package com.cesgroup.demo.base.dao;

import java.util.List;

import com.cesgroup.demo.base.entity.Dept;
import com.cesgroup.framework.mybatis.dao.BaseDao;

/**
 * 部门Mapper
 * @author huz
 * @date 2016-07-08
 * 
 */
public interface DeptMapper extends BaseDao<Dept, String> {
	
	/**
	 * 批量新增
	 * @param records
	 * @return
	 */
	int insertBatch(List<Dept> records);
	
	/**
	 * 主键查询
	 * @param idList
	 * @return
	 */
	List<Dept> findByIdIn(List<String> idList);
	
	/**
	 * 主键查询
	 * @param idList
	 * @return
	 */
	List<Dept> findByIdInAndNameLikeAndParentIdIn(List<String> idList, String name, List<String> parentIdList);
}
