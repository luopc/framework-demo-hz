/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.user.dao</p>
 * <p>文件名:UserMapperTest.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-07 14:44
 * @todo 
 */
package com.cesgroup.demo.system.test.base.dao;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;

import com.cesgroup.demo.base.dao.UserMapper;
import com.cesgroup.demo.base.entity.User;
import com.cesgroup.demo.system.test.MapperTestCase;

/**
 * 
 * @author huz
 * @date 2016-07-07
 * 
 */
//@TransactionConfiguration(defaultRollback = false)
public class UserMapperTest extends MapperTestCase<UserMapper> {
	
	/**
	 * 创建用户
	 * @param loginName
	 * @param name
	 * @param password
	 * @return
	 */
	private User createUser(String loginName, String name, String password){
		User user = new User();
		user.setLoginName(loginName);
		user.setName(name);
		user.setPassword(password);
		user.setPlainPassword(password);
		user.setSalt(user.getLoginName());
		user.setRegisterDate(new Date(System.currentTimeMillis()));
		return user;
	}
	

	@Test
	public void testInsert() {
		User user = createUser("xtgly", "系统管理员", "000000");
		mapper.insert(user);
		Assert.assertNotNull(user.getId());
	}

	@Test
	public void testFindByLoginName(){
		User user = mapper.findByLoginName("admin");
		Assert.assertEquals(user.getName(), "管理员");
	}
	
	@Test
	public void testFindByNameOrderByRegisterDateAsc(){
		List<User> users = mapper.findByNameOrderByRegisterDateAsc("超级管理员");
		Assert.assertEquals(users.size(), 1);
	}
	
	@Test
	public void testFindByNameLike(){
		Order order = new Order(Direction.ASC, "name");
		Sort sort = new Sort(order);
		Page<User> users = mapper.findByNameLike("用户", new PageRequest(1, 2, sort));
		Assert.assertEquals(users.getTotalElements(), 10);
		Assert.assertEquals(users.getNumberOfElements(), 2);
	}

	@Test
	public void testFindBySql(){
		List<User> users = mapper.findBySql("%user%");
		Assert.assertEquals(users.size(), 10);
	}

	@Test
	public void testFindByProvider(){
		List<User> users = mapper.findByProvider("用户", "user");
		Assert.assertEquals(users.size(), 10);
	}
	
	@Test
	public void testFindByXml(){
		List<User> users = mapper.findByXml("用户", "user");
		Assert.assertEquals(users.size(), 10);
	}
	
	@Test
	public void testFindPageBySql(){
		Page<User> users = mapper.findPageBySql("%user%", new PageRequest(1, 2));
		Assert.assertEquals(users.getTotalElements(), 10);
		Assert.assertEquals(users.getNumberOfElements(), 2);
	}
	
	@Test
	public void testFindPageByLoginNameBySql(){
		Page<User> users = mapper.findPageByLoginNameBySql(new PageRequest(1, 2));
		Assert.assertEquals(users.getTotalElements(), 10);
		Assert.assertEquals(users.getNumberOfElements(), 2);
	}
	
	@Test
	public void testFindPageByProvider(){
		Page<User> users = mapper.findPageByProvider("用户", "user", new PageRequest(1, 2));
		Assert.assertEquals(users.getTotalElements(), 10);
		Assert.assertEquals(users.getNumberOfElements(), 2);
	}
	
	@Test
	public void testFindPageByXml(){
		Page<User> users = mapper.findPageByXml("用户", "user", new PageRequest(1, 2));
		Assert.assertEquals(users.getTotalElements(), 10);
		Assert.assertEquals(users.getNumberOfElements(), 2);
	}
	
	
	@Test
	public void testInsertList(){
		List<User> userList = new ArrayList<User>();
		for (int i = 0; i < 1000; i++) {
			userList.add(createUser("xtgly"+i, "系统管理员"+i, "000000"));
			
		}
		mapper.insert(userList);
		Assert.assertNotNull(userList.size());
	}
	

	
	@Test
	public void testDeleteList(){
		List<String> idList = new ArrayList<String>();
		for (int i = 0; i < 3; i++) {
			idList.add(String.valueOf(i + 1));
			
		}
		mapper.deleteBatch(idList);
	}
}
