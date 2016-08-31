/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.test.dao</p>
 * <p>文件名:UserDeptDaoTest.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-12 15:49
 * @todo 
 */
package com.cesgroup.demo.system.test.relevance.dao;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import com.cesgroup.demo.relevance.dao.UserDeptDao;
import com.cesgroup.demo.relevance.entity.UserDept;
import com.cesgroup.demo.system.test.MapperTestCase;

/**
 * 
 * @author huz
 * @date 2016-07-12
 * 
 */
public class UserDeptDaoTest extends MapperTestCase<UserDeptDao> {
	
	@Test
	public void testFindUserDept(){
		List<UserDept> list = mapper.findUserDept("用户", "IT");
		Assert.assertNotEquals(list.size(), 0);
	}
	

	@Test
	public void testFindUserDeptBySql(){
		List<UserDept> list = mapper.findUserDeptBySql("用户", "IT");
		Assert.assertNotEquals(list.size(), 0);
	}

	@Test
	public void testFindUserDeptByProvider(){
		List<UserDept> list = mapper.findUserDeptByProvider("用户", "IT");
		Assert.assertNotEquals(list.size(), 0);
	}
}
