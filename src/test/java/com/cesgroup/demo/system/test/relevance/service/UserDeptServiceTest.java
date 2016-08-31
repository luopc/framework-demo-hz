/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.test.service</p>
 * <p>文件名:UserDeptServiceTest.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-12 16:35
 * @todo 
 */
package com.cesgroup.demo.system.test.relevance.service;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import com.cesgroup.demo.relevance.entity.UserDept;
import com.cesgroup.demo.relevance.service.UserDeptService;
import com.cesgroup.demo.system.test.ServiceTestCase;

/**
 * 
 * @author huz
 * @date 2016-07-12
 * 
 */
public class UserDeptServiceTest extends ServiceTestCase<UserDeptService> {
	
	@Test
	public void testFindUserDept(){
		List<UserDept> list = service.findUserDept("用户", "IT");
		Assert.assertNotEquals(list.size(), 0);
	}
}
