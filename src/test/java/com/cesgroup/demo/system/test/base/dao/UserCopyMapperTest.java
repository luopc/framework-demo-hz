/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.test.base.dao</p>
 * <p>文件名:UserCopyMapperTest.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-08-23 13:56
 * @todo 
 */
package com.cesgroup.demo.system.test.base.dao;

import static org.junit.Assert.fail;

import java.util.Date;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import com.cesgroup.demo.base.dao.UserCopyMapper;
import com.cesgroup.demo.base.entity.Dept;
import com.cesgroup.demo.base.entity.UserCopy;
import com.cesgroup.demo.system.test.MapperTestCase;
import com.cesgroup.framework.commons.CesStringUtils;
import com.cesgroup.framework.mybatis.utils.ExampleSpecification;

/**
 * 
 * @author huz
 * @date 2016-08-23
 * 
 */
public class UserCopyMapperTest extends MapperTestCase<UserCopyMapper> {
	
	/**
	 * 创建用户
	 * @param loginName
	 * @param name
	 * @param password
	 * @return
	 */
	private UserCopy createUser(String loginName, String name, String password){
		UserCopy user = new UserCopy();
		user.setLoginName(loginName);
		user.setName(name);
		user.setPassword(password);
		user.setPlainPassword(password);
		user.setSalt(user.getLoginName());
		user.setRegisterDate(new Date(System.currentTimeMillis()));
		return user;
	}
	
	/**
	 * 创建测试实体
	 * @return
	 */
	private UserCopy createTestEntity(int num){
		String s = CesStringUtils.lpad(String.valueOf(num), 3, '0');
		UserCopy entity = createUser("test" + s, "测试用户" + s, "000000");
		return entity;
	}

	/**
	 * Test method for {@link com.cesgroup.demo.base.dao.UserMapperImpl#insert(com.cesgroup.demo.base.entity.UserCopy)}.
	 */
	@Test
	public void testInsertUserCopy() {
		UserCopy user = createTestEntity(1);
		mapper.insert(user);
		
		UserCopy u = mapper.selectOne(user.getId());
		Assert.assertNotNull(u.getRegisterDate());
	}

	/**
	 * Test method for {@link com.cesgroup.demo.base.dao.UserMapperImpl#update(com.cesgroup.demo.base.entity.UserCopy)}.
	 */
	@Test
	public void testUpdateUserCopy() {
		UserCopy e = mapper.selectOne("2");
		Date d = new Date();
		e.setRegisterDate(d);
		mapper.update(e);
		
		UserCopy u = mapper.selectOne(e.getId());
		Assert.assertEquals(u.getRegisterDate(), e.getRegisterDate());
	}

	/**
	 * Test method for {@link com.cesgroup.demo.base.dao.UserMapperImpl#findAll(org.springframework.data.jpa.domain.Specification)}.
	 */
	@Test
	public void testFindall() {
		ExampleSpecification<UserCopy> spec = ExampleSpecification.create(UserCopy.class);
		spec.createCriteria().andLike("loginName", "user%").andIsNull("registerDate");
		List<UserCopy> list = mapper.findAll(spec);
		
		Assert.assertEquals(list.size(), 2);
	}

}
