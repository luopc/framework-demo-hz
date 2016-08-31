/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.framework.test.mybatis</p>
 * <p>文件名:MapperTestCase.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-09 11:57
 * @todo 
 */
package com.cesgroup.demo.system.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.cesgroup.framework.test.SpringBaseTestCase;

/**
 * 
 * @author huz
 * @date 2016-07-09
 * 
 */
@ContextConfiguration(locations = {
		"classpath:/spring/applicationContext.xml",
})
public abstract class MapperTestCase<Mapper> extends SpringBaseTestCase {
	@Autowired
	protected Mapper mapper;

	/**
	 * @return the mapper
	 */
	public Mapper getMapper() {
		return mapper;
	}
	
}
