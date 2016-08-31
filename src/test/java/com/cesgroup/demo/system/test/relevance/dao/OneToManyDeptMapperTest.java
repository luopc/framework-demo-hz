/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.framework.mybatis.associate.dao</p>
 * <p>文件名:OneToManyDeptMapperTest.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-08 15:01
 * @todo 
 */
package com.cesgroup.demo.system.test.relevance.dao;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;

import com.cesgroup.demo.base.entity.User;
import com.cesgroup.demo.relevance.dao.OneToManyDeptMapper;
import com.cesgroup.demo.relevance.entity.OneToManyDept;
import com.cesgroup.demo.system.test.MapperTestCase;
import com.cesgroup.framework.commons.CesStringUtils;
import com.cesgroup.framework.mybatis.utils.ExampleSpecification;

/**
 * 
 * @author huz
 * @date 2016-07-08
 * 
 */
public class OneToManyDeptMapperTest extends MapperTestCase<OneToManyDeptMapper>  {

	/**
	 * 创建部门
	 * @param name
	 * @param code
	 * @param parentId
	 * @param orderNo
	 * @return
	 */
	private OneToManyDept createDept(String name, String code, String parentId, int orderNo){
		OneToManyDept dept = new OneToManyDept();
		dept.setName(name);
		dept.setCode(code);
//		dept.setComments(name + ":" + code);
		dept.setOrderNo(orderNo);
		dept.setParentId(parentId);
		return dept;
	}
	
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
//		user.setRegisterDate(new Date());
		return user;
	}
	
	/**
	 * 创建测试实体
	 * @return
	 */
	private OneToManyDept createTestEntity(int num, String parentId, int itemNum){
		String s = CesStringUtils.lpad(String.valueOf(num), 3, '0');
		OneToManyDept entity = createDept("测试部门" + s, "testdept" + s, parentId, num);
		entity.setUsers(new ArrayList<User>());
		for (int i = 0; i < itemNum; i++) {
			String t = CesStringUtils.lpad(String.valueOf(i+1), 3, '0');
			entity.getUsers().add(createUser("testuser" + t, "测试用户" + t, "000000"));
		}
		return entity;
	}
	
	@Test
	public void testFindAll(){
		ExampleSpecification<OneToManyDept> spec = ExampleSpecification.create(OneToManyDept.class);
		spec.createCriteria().andLike("name", "%IT%").andLike("users.loginName", "%user%");
		spec.orderBy("parentId").asc().orderBy("orderNo").desc();
		List<OneToManyDept> list = mapper.findAll(spec);
		Assert.assertEquals(list.size(), 2);
		Assert.assertNotEquals(list.get(0).getUsers().size(), 0);
	}
	
	@Test
	public void testFindByNameLike(){
		List<OneToManyDept> list = mapper.findByNameLikeUsers$LoginNameLike("IT", "user");
		Assert.assertEquals(list.size(), 2);
		Assert.assertNotEquals(list.get(0).getUsers().size(), 0);
	}

//	@Test
//	public void testInsertSelective(){
//		OneToManyDept dept = createDept("测试部分", null, null, 0);
//		mapper.insertSelective(dept);
//		Assert.assertNotNull(dept.getId());
//	}
	
//	@Test
//	public void testUpdateSelective(){
//		Dept dept = new Dept();
//		dept.setId("1");
//		dept.setComments("信息发展");
//		mapper.updateSelective(dept);
//		
//		Dept d = mapper.selectOne(dept.getId());
//		Assert.assertEquals(d.getComments(), dept.getComments());
//		Assert.assertEquals(d.getName(), "信息发展");
//	}
	
//	@Test
//	public void testSelectByEntity(){
//		OneToManyDept entity = new OneToManyDept();
//		entity.setOrderNo(1);
//		List<OneToManyDept> list = mapper.selectByEntity(entity);
//		Assert.assertEquals(list.size(), 3);
//		
//		entity = new OneToManyDept();
//		entity.setParentId("2");
//		list = mapper.selectByEntity(entity);
//		Assert.assertEquals(list.size(), 2);
//		
//		entity = new OneToManyDept();
//		entity.setOrderNo(1);
//		entity.setParentId("2");
//		list = mapper.selectByEntity(entity);
//		Assert.assertEquals(list.size(), 1);
//		Assert.assertEquals(list.get(0).getName(), "TMT");
//	}
	
//	@Test
//	public void testSelectCountByEntity(){
//		OneToManyDept entity = new OneToManyDept();
//		entity.setOrderNo(1);
//		long count = mapper.selectCountByEntity(entity);
//		Assert.assertEquals(count, 3);
//		
//		entity = new OneToManyDept();
//		entity.setParentId("2");
//		count = mapper.selectCountByEntity(entity);
//		Assert.assertEquals(count, 2);
//		
//		entity = new OneToManyDept();
//		entity.setOrderNo(1);
//		entity.setParentId("2");
//		count = mapper.selectCountByEntity(entity);
//		Assert.assertEquals(count, 1);
//	}
	
//	@Test
//	public void testDeleteByEntity(){
//		OneToManyDept entity = new OneToManyDept();
//		entity.setOrderNo(1);
//		mapper.deleteByEntity(entity);
//		long count = mapper.selectCount();
//		Assert.assertEquals(count, 4);
//	}
	
//	@Test
//	public void testUpdateByExample(){
//		ExampleSpecification<OneToManyDept> spec = ExampleSpecification.create(OneToManyDept.class);
//		OneToManyDept dept = createDept("测试部门", "csbm", "1", 0);
//		spec.createCriteria().andLike("name", "IT%").andEqualTo("orderNo", 2);
//		mapper.updateByExample(dept, spec);
//		
//		List<OneToManyDept> list = mapper.selectByEntity(dept);
//		Assert.assertEquals(list.size(), 2);
//	}

//	@Test
//	public void testUpdateSelectiveByExample(){
//		ExampleSpecification<OneToManyDept> spec = ExampleSpecification.create(OneToManyDept.class);
//		OneToManyDept dept = createDept("测试部门", null, null, 0);
//		spec.createCriteria().andLike("name", "IT%").andEqualTo("orderNo", 2);
//		mapper.updateSelectiveByExample(dept, spec);
//		
//		List<OneToManyDept> list = mapper.selectByEntity(dept);
//		Assert.assertEquals(list.size(), 2);
//	}
	
	@Test
	public void testDeleteByExample(){
		ExampleSpecification<OneToManyDept> spec = ExampleSpecification.create(OneToManyDept.class);
		spec.createCriteria().andLike("name", "IT%").andEqualTo("orderNo", 2);
		mapper.deleteByExample(spec);
	}
	
	@Test
	public void testSelectAllOneToManyDept(){
		Order order = new Order(Direction.ASC, "dept_id");
		Sort sort = new Sort(order);
		Page<OneToManyDept> page = mapper.selectAllOneToManyDept(new PageRequest(1, 2, sort));
		Assert.assertEquals(page.getTotalElements(), 7);
	}
}
