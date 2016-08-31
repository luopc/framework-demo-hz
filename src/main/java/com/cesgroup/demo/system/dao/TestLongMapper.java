/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.dao</p>
 * <p>文件名:TestLongMapper.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-20 13:48
 * @todo 
 */
package com.cesgroup.demo.system.dao;

import java.util.List;

import com.cesgroup.demo.system.entity.TestLongEntity;
import com.cesgroup.framework.mybatis.dao.BaseDao;

/**
 * 
 * @author huz
 * @date 2016-07-20
 * 
 */
public interface TestLongMapper extends BaseDao<TestLongEntity, Long> {

	public void insert(List<TestLongEntity> entitys);
	
	public void insertList(List<TestLongEntity> entitys);
}
