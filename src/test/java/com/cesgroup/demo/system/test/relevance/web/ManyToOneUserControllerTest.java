/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.test.relevance.web</p>
 * <p>文件名:ManyToOneUserControllerTest.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-08-25 17:59
 * @todo 
 */
package com.cesgroup.demo.system.test.relevance.web;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.springframework.http.MediaType;

import com.cesgroup.demo.system.test.ControllerTestCase;

/**
 * 
 * @author huz
 * @date 2016-08-25
 * 
 */
public class ManyToOneUserControllerTest  extends ControllerTestCase {
	
	@Test
	public void testSearch() throws Exception {
		this.mockMvc.perform(post("/manytooneuser/search.json")
				.param("Q_LIKE_name", "用户")
				.param("Q_LIKE_loginName", "user")
				.param("Q_LIKE_dept.name", "IT")
				.param("P_orders", "name desc,loginName asc")
			)
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("total").value(5))
			.andExpect(jsonPath("data.length()").value(5))
			.andReturn();
	}
}
