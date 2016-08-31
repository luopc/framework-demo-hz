/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.test.dao</p>
 * <p>文件名:ManyToOneUserMapperTest.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-20 15:32
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

import com.cesgroup.demo.base.entity.Dept;
import com.cesgroup.demo.relevance.dao.ManyToOneUserMapper;
import com.cesgroup.demo.relevance.entity.ManyToOneUser;
import com.cesgroup.demo.system.test.MapperTestCase;
import com.cesgroup.framework.commons.CesStringUtils;
import com.cesgroup.framework.mybatis.utils.ExampleSpecification;

/**
 * 
 * @author huz
 * @date 2016-07-20
 * 
 */
public class ManyToOneUserMapperTest extends MapperTestCase<ManyToOneUserMapper> {


	/**
	 * 创建用户
	 * @param loginName
	 * @param name
	 * @param password
	 * @return
	 */
	private ManyToOneUser createUser(String loginName, String name, String password){
		ManyToOneUser user = new ManyToOneUser();
		user.setLoginName(loginName);
		user.setName(name);
		user.setPassword(password);
		user.setPlainPassword(password);
		user.setSalt(user.getLoginName());
//		user.setRegisterDate(new Date());
		return user;
	}
	
	/**
	 * 创建部门
	 * @param name
	 * @param code
	 * @param parentId
	 * @param orderNo
	 * @return
	 */
	private Dept createDept(String name, String code, String parentId, Integer orderNo){
		Dept dept = new Dept();
		dept.setName(name);
		dept.setCode(code);
		dept.setComments(name + ":" + code);
		dept.setOrderNo(orderNo);
		dept.setParentId(parentId);
		return dept;
	}
	
	/**
	 * 创建测试实体
	 * @return
	 */
	private ManyToOneUser createTestEntity(int num){
		String s = CesStringUtils.lpad(String.valueOf(num), 3, '0');
		ManyToOneUser entity = createUser("test" + s, "测试用户" + s, "000000");
		Dept dept = createDept("测试部门" + s, "csbm" + s, "3", null);
		entity.setDept(dept);
		return entity;
	}
	
	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#insert(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testInsertManyToOneUser() {
		ManyToOneUser user = createTestEntity(1);
		user.getDept().setId("1");
		mapper.insert(user);
		
		ManyToOneUser u = mapper.selectOne(user.getId());
		Assert.assertNotNull(u.getDept());
		Assert.assertEquals(u.getDept().getId(), "1");
		Assert.assertNull(u.getRegisterDate());
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#update(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testUpdateManyToOneUser() {
		ManyToOneUser entity = mapper.selectOne("5");
		entity.setLoginName("testuser");
		entity.setPlainPassword(null);
		entity.getDept().setCode("testdept");
		mapper.update(entity);
		
		ManyToOneUser u = mapper.selectOne(entity.getId());
		Assert.assertEquals(u.getLoginName(), "testuser");
		Assert.assertNull(u.getPlainPassword());
//		Assert.assertEquals(u.getDept().getCode(), "testdept");
	
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#delete(java.lang.String)}.
	 */
	@Test
	public void testDelete() {
		String id = "5";
		mapper.delete(id);
		
		ManyToOneUser u = mapper.selectOne(id);
		Assert.assertNull(u);
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#selectOne(java.lang.String)}.
	 */
	@Test
	public void testSelectOne() {
		String id = "4";
		ManyToOneUser u = mapper.selectOne(id);
		Assert.assertNotNull(u.getId());
		Assert.assertNotNull(u.getDept().getId());
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#selectAll()}.
	 */
	@Test
	public void testSelectAll() {
		List<ManyToOneUser> list = mapper.selectAll();
		Assert.assertEquals(list.size(), 12);
		Assert.assertNotNull(list.get(0).getDept().getId());
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#selectCount()}.
	 */
	@Test
	public void testSelectCount() {
		long count = mapper.selectCount();
		Assert.assertEquals(count, 12);
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#insertSelective(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testInsertSelectiveManyToOneUser() {
		ManyToOneUser user = createTestEntity(2);
		user.getDept().setId("1");
		mapper.insertSelective(user);
		
		ManyToOneUser u = mapper.selectOne(user.getId());
		Assert.assertNotNull(u.getDept());
		Assert.assertNotNull(u.getRegisterDate());
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#updateSelective(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testUpdateSelectiveManyToOneUser() {
		ManyToOneUser entity = new ManyToOneUser();
		entity.setId("6");
		entity.setLoginName("testuser");
		Dept d = new Dept();
		d.setId("7");
		entity.setDept(d);
		mapper.updateSelective(entity);
		
		ManyToOneUser u = mapper.selectOne(entity.getId());
		Assert.assertEquals(u.getLoginName(), "testuser");
		Assert.assertNotNull(u.getName());
		Assert.assertEquals(u.getDept().getCode(), "itrjb");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#selectByEntity(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testSelectByEntity() {
		ManyToOneUser entity = new ManyToOneUser();
		entity.setLoginName("user06");
		Dept d = new Dept();
		d.setCode("ityjb");
		entity.setDept(d);
		List<ManyToOneUser> list = mapper.selectByEntity(entity);
		
		Assert.assertEquals(list.size(), 1);
		ManyToOneUser e = list.get(0);
		Assert.assertEquals(e.getId(), "8");
		Assert.assertEquals(e.getDept().getId(), "6");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#selectCountByEntity(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testSelectCountByEntity() {
		ManyToOneUser entity = new ManyToOneUser();
		entity.setLoginName("user06");
		long count = mapper.selectCountByEntity(entity);
		Assert.assertEquals(count, 1);
		
		Dept d = new Dept();
		d.setId("5");
		entity.setDept(d);
		count = mapper.selectCountByEntity(entity);
		Assert.assertEquals(count, 0);
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#deleteByEntity(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testDeleteByEntity() {
		ManyToOneUser entity = new ManyToOneUser();
		entity.setPassword("000000");
		mapper.deleteByEntity(entity);
		
		long count = mapper.selectCount();
		Assert.assertEquals(count, 0);
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#updateByExample(com.cesgroup.demo.relevance.entity.ManyToOneUser, org.springframework.data.jpa.domain.Specification)}.
	 */
	@Test
	public void testUpdateByExample() {
		ManyToOneUser entity = mapper.selectOne("3");
		ExampleSpecification<ManyToOneUser> spec = ExampleSpecification.create(ManyToOneUser.class);
		spec.createCriteria().andLike("name", "%用户%").andLike("dept.name", "%IT%");
		mapper.updateByExample(entity, spec);
		
		spec = ExampleSpecification.create(ManyToOneUser.class);
		spec.createCriteria().andEqualTo("loginName", "user01");
		long count = mapper.selectCountByExample(spec);
		Assert.assertEquals(count, 6);
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#updateByExampleSelective(com.cesgroup.demo.relevance.entity.ManyToOneUser, org.springframework.data.jpa.domain.Specification)}.
	 */
	@Test
	public void testUpdateByExampleSelective() {
		ManyToOneUser entity = new ManyToOneUser();
		entity.setLoginName("testuser");
		entity.setPassword("111111");
		ExampleSpecification<ManyToOneUser> spec = ExampleSpecification.create(ManyToOneUser.class);
		spec.createCriteria().andLike("name", "%用户%").andLike("dept.name", "%IT%");
		mapper.updateByExample(entity, spec);
		
		spec = ExampleSpecification.create(ManyToOneUser.class);
		spec.createCriteria().andEqualTo("loginName", "testuser").andEqualTo("password", "111111");
		long count = mapper.selectCountByExample(spec);
		Assert.assertEquals(count, 5);
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#deleteByExample(org.springframework.data.jpa.domain.Specification)}.
	 */
	@Test
	public void testDeleteByExample() {
		ExampleSpecification<ManyToOneUser> spec = ExampleSpecification.create(ManyToOneUser.class);
		spec.createCriteria().andLike("name", "%用户%").andLike("dept.name", "%IT%");
		mapper.deleteByExample(spec);
		
		long count = mapper.selectCount();
		Assert.assertEquals(count, 7);
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#insert(java.util.List)}.
	 */
	@Test
	public void testInsertListOfManyToOneUser() {
		List<ManyToOneUser> entitys = new ArrayList<ManyToOneUser>();
		for (int i = 0; i < 10; i++) {
			entitys.add(createTestEntity(i + 20));
		}
		mapper.insert(entitys);
		
		long count = mapper.selectCount();
		Assert.assertEquals(count, 22);
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#insertSelective(java.util.List)}.
	 */
	@Test
	public void testInsertSelectiveListOfManyToOneUser() {
		List<ManyToOneUser> entitys = new ArrayList<ManyToOneUser>();
		for (int i = 0; i < 10; i++) {
			entitys.add(createTestEntity(i + 20));
		}
		mapper.insertSelective(entitys);
		
		long count = mapper.selectCount();
		Assert.assertEquals(count, 22);
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#findAll(org.springframework.data.jpa.domain.Specification)}.
	 */
	@Test
	public void testFindAll() {
		ExampleSpecification<ManyToOneUser> spec = ExampleSpecification.create(ManyToOneUser.class);
		spec.createCriteria().andLike("name", "%用户%").andLike("dept.name", "%IT%");
		spec.orderBy("dept.orderNo").asc().orderBy("loginName").desc();
		List<ManyToOneUser> list = mapper.findAll(spec);
		
		Assert.assertEquals(list.size(), 5);
		Assert.assertNotNull(list.get(0).getDept());
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#findPage(org.springframework.data.jpa.domain.Specification, org.springframework.data.domain.Pageable)}.
	 */
	@Test
	public void testFindPage() {
		ExampleSpecification<ManyToOneUser> spec = ExampleSpecification.create(ManyToOneUser.class);
		spec.createCriteria().andLike("name", "%用户%").andLike("dept.name", "%IT%");
		spec.orderBy("dept.orderNo").asc().orderBy("loginName").desc();
		List<Order> orders = new ArrayList<Order>();
		orders.add(new Order(Direction.DESC, "loginName"));
		orders.add(new Order(Direction.ASC, "dept.orderNo"));
		Sort sort = new Sort(orders);
		Page<ManyToOneUser> page = mapper.findPage(spec, new PageRequest(3, 2, sort));
		Assert.assertEquals(page.getTotalElements(), 5);
		Assert.assertEquals(page.getNumberOfElements(), 1);
		Assert.assertNotNull(page.getContent().get(0).getDept());
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#selectCountByExample(org.springframework.data.jpa.domain.Specification)}.
	 */
	@Test
	public void testSelectCountByExample() {
		ExampleSpecification<ManyToOneUser> spec = ExampleSpecification.create(ManyToOneUser.class);
		spec.createCriteria().andLike("name", "%用户%").andLike("dept.name", "%IT%");
		spec.orderBy("dept.orderNo").asc().orderBy("loginName").desc();
		
		long count = mapper.selectCountByExample(spec);
		Assert.assertEquals(count, 5);
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#findByNameLikeAndDept$NameLike(java.lang.String, java.lang.String, org.springframework.data.domain.Pageable)}.
	 */
	@Test
	public void testFindByNameLikeAndDept$NameLike() {
		Page<ManyToOneUser> page = mapper.findByNameLikeAndDept$NameLike("用户", "IT", new PageRequest(3, 2));
		Assert.assertEquals(page.getTotalElements(), 5);
		Assert.assertEquals(page.getNumberOfElements(), 1);
		Assert.assertNotNull(page.getContent().get(0).getDept());
	}

}
