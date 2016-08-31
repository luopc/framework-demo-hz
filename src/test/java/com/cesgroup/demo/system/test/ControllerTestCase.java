/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.test</p>
 * <p>文件名:ControllerTestCase.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-12 16:55
 * @todo 
 */
package com.cesgroup.demo.system.test;

import org.springframework.test.context.ContextConfiguration;

import com.cesgroup.framework.test.SpringMVCShiroTestCase;

/**
 * 
 * @author huz
 * @date 2016-07-12
 * 
 */
@ContextConfiguration(inheritLocations = false, inheritInitializers = false, locations = {
		"classpath:/spring/applicationContext-test.xml",
		"classpath:/spring/spring-mvc.xml",
})
public abstract class ControllerTestCase extends SpringMVCShiroTestCase{
}
