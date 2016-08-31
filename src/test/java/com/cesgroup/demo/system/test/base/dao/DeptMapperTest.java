/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.user.dao</p>
 * <p>文件名:DeptMapperTest.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-08 15:01
 * @todo 
 */
package com.cesgroup.demo.system.test.base.dao;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import com.cesgroup.demo.base.dao.DeptMapper;
import com.cesgroup.demo.base.entity.Dept;
import com.cesgroup.demo.system.test.MapperTestCase;
import com.cesgroup.framework.mybatis.utils.ExampleSpecification;

/**
 * 
 * @author huz
 * @date 2016-07-08
 * 
 */
//@TransactionConfiguration(defaultRollback = false)
public class DeptMapperTest extends MapperTestCase<DeptMapper> {
	
	/**
	 * 创建部门
	 * @param name
	 * @param code
	 * @param parentId
	 * @param orderNo
	 * @return
	 */
	private Dept createDept(String name, String code, String parentId, int orderNo){
		Dept dept = new Dept();
		dept.setName(name);
		dept.setCode(code);
		dept.setComments(name + ":" + code);
		dept.setOrderNo(orderNo);
		dept.setParentId(parentId);
		return dept;
	}
	
	@Test
	public void testInsertSelective(){
		Dept dept = createDept("测试部分", null, null, 0);
		mapper.insertSelective(dept);
		Assert.assertNotNull(dept.getId());
	}
	
	@Test
	public void testUpdateSelective(){
		Dept dept = new Dept();
		dept.setId("1");
		dept.setComments("信息发展");
		mapper.updateSelective(dept);
		
		Dept d = mapper.selectOne(dept.getId());
		Assert.assertEquals(d.getComments(), dept.getComments());
		Assert.assertEquals(d.getName(), "信息发展");
	}
	
	@Test
	public void testSelectByEntity(){
		Dept entity = new Dept();
		entity.setOrderNo(1);
		List<Dept> list = mapper.selectByEntity(entity);
		Assert.assertEquals(list.size(), 3);
		
		entity = new Dept();
		entity.setParentId("2");
		list = mapper.selectByEntity(entity);
		Assert.assertEquals(list.size(), 2);
		
		entity = new Dept();
		entity.setOrderNo(1);
		entity.setParentId("2");
		list = mapper.selectByEntity(entity);
		Assert.assertEquals(list.size(), 1);
		Assert.assertEquals(list.get(0).getName(), "TMT");
		
	}
	
	@Test
	public void testSelectCountByEntity(){
		Dept entity = new Dept();
		entity.setOrderNo(1);
		long count = mapper.selectCountByEntity(entity);
		Assert.assertEquals(count, 3);
		
		entity = new Dept();
		entity.setParentId("2");
		count = mapper.selectCountByEntity(entity);
		Assert.assertEquals(count, 2);
		
		entity = new Dept();
		entity.setOrderNo(1);
		entity.setParentId("2");
		count = mapper.selectCountByEntity(entity);
		Assert.assertEquals(count, 1);
	}
	
	@Test
	public void testDeleteByEntity(){
		Dept entity = new Dept();
		entity.setOrderNo(1);
		mapper.deleteByEntity(entity);
		long count = mapper.selectCount();
		Assert.assertEquals(count, 4);
	}
	
	@Test
	public void testUpdateByExample(){
		ExampleSpecification<Dept> spec = ExampleSpecification.create(Dept.class);
		Dept dept = createDept("测试部门", "csbm", "1", 0);
		spec.createCriteria().andLike("name", "IT%").andEqualTo("orderNo", 2);
		mapper.updateByExample(dept, spec);
		
		List<Dept> list = mapper.selectByEntity(dept);
		Assert.assertEquals(list.size(), 2);
	}
	

	@Test
	public void testUpdateByExampleSelective(){
		ExampleSpecification<Dept> spec = ExampleSpecification.create(Dept.class);
		Dept dept = createDept("测试部门", null, null, 0);
		spec.createCriteria().andLike("name", "IT%").andEqualTo("orderNo", 2);
		mapper.updateByExampleSelective(dept, spec);
		
		List<Dept> list = mapper.selectByEntity(dept);
		Assert.assertEquals(list.size(), 2);
	}
	
	@Test
	public void testDeleteByExample(){
		ExampleSpecification<Dept> spec = ExampleSpecification.create(Dept.class);
		spec.createCriteria().andLike("name", "IT%").andEqualTo("orderNo", 2);
		mapper.deleteByExample(spec);
		
		long count = mapper.selectCount();
		Assert.assertEquals(count, 5);
	}
	

	@Test
	public void testInsertBatch(){
		List<Dept> list = new ArrayList<Dept>();
		for (int i = 1; i <= 10; i++) {
			Dept dept = createDept("测试部门" + i, "csbm" + i, "1", i);
			dept.setId(String.valueOf(100+i));
			list.add(dept);
		}
		int count = mapper.insertBatch(list);
		Assert.assertEquals(count, 10);
	}

	@Test
	public void testFindByIdIn(){
		List<String> idList = new ArrayList<String>();
		for (int i = 1; i <= 10; i++) {
			idList.add(String.valueOf(i));
		}
		
		List<Dept> list = mapper.findByIdIn(idList);
		Assert.assertEquals(list.size(), 7);
	}
	
	@Test
	public void testFindByIdInAndNameLikeAndParentIdIn(){
		List<String> idList = new ArrayList<String>();
		List<String> parentIdList = new ArrayList<String>();
		for (int i = 1; i <= 10; i++) {
			idList.add(String.valueOf(i));
			parentIdList.add(String.valueOf(i));
		}
		
		List<Dept> list = mapper.findByIdInAndNameLikeAndParentIdIn(idList, "IT%", parentIdList);
		Assert.assertEquals(list.size(), 3);
	}
}
