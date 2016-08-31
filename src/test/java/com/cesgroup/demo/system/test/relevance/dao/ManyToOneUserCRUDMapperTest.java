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

import static org.junit.Assert.*;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.cesgroup.demo.relevance.dao.ManyToOneUserMapper;
import com.cesgroup.demo.relevance.entity.ManyToOneUser;
import com.cesgroup.demo.system.test.MapperTestCase;
import com.cesgroup.framework.mybatis.utils.ExampleSpecification;

/**
 * 
 * @author huz
 * @date 2016-07-20
 * 
 */
public class ManyToOneUserCRUDMapperTest extends MapperTestCase<ManyToOneUserMapper> {

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#insert(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testInsertManyToOneUser() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#update(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testUpdateManyToOneUser() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#delete(java.lang.String)}.
	 */
	@Test
	public void testDelete() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#selectOne(java.lang.String)}.
	 */
	@Test
	public void testSelectOne() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#selectAll()}.
	 */
	@Test
	public void testSelectAll() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#selectCount()}.
	 */
	@Test
	public void testSelectCount() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#insertSelective(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testInsertSelectiveManyToOneUser() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#updateSelective(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testUpdateSelectiveManyToOneUser() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#selectByEntity(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testSelectByEntity() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#selectCountByEntity(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testSelectCountByEntity() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#deleteByEntity(com.cesgroup.demo.relevance.entity.ManyToOneUser)}.
	 */
	@Test
	public void testDeleteByEntity() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#updateByExample(com.cesgroup.demo.relevance.entity.ManyToOneUser, org.springframework.data.jpa.domain.Specification)}.
	 */
	@Test
	public void testUpdateByExample() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#updateByExampleSelective(com.cesgroup.demo.relevance.entity.ManyToOneUser, org.springframework.data.jpa.domain.Specification)}.
	 */
	@Test
	public void testUpdateByExampleSelective() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#deleteByExample(org.springframework.data.jpa.domain.Specification)}.
	 */
	@Test
	public void testDeleteByExample() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#insert(java.util.List)}.
	 */
	@Test
	public void testInsertListOfManyToOneUser() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#insertSelective(java.util.List)}.
	 */
	@Test
	public void testInsertSelectiveListOfManyToOneUser() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#update(java.util.List)}.
	 */
	@Test
	public void testUpdateListOfManyToOneUser() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#updateSelective(java.util.List)}.
	 */
	@Test
	public void testUpdateSelectiveListOfManyToOneUser() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#findAll(org.springframework.data.jpa.domain.Specification)}.
	 */
	@Test
	public void testFindAll() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#findPage(org.springframework.data.jpa.domain.Specification, org.springframework.data.domain.Pageable)}.
	 */
	@Test
	public void testFindPage() {
		ExampleSpecification<ManyToOneUser> spec = ExampleSpecification.create(ManyToOneUser.class);
		spec.createCriteria().andLike("name", "%用户%").andLike("dept.name", "%IT%");
		spec.orderBy("dept.orderNo").asc().orderBy("loginName").desc();
		Page<ManyToOneUser> page = mapper.findPage(spec, new PageRequest(3, 2));
		Assert.assertEquals(page.getTotalElements(), 5);
		Assert.assertEquals(page.getNumberOfElements(), 1);
		Assert.assertNotNull(page.getContent().get(0).getDept());
	}

	/**
	 * Test method for {@link com.cesgroup.demo.relevance.dao.ManyToOneUserMapper#selectCountByExample(org.springframework.data.jpa.domain.Specification)}.
	 */
	@Test
	public void testSelectCountByExample() {
		fail("Not yet implemented");
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
