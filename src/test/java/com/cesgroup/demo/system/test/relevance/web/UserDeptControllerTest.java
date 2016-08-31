/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.test.web</p>
 * <p>文件名:UserDeptControllerTest.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-12 16:43
 * @todo 
 */
package com.cesgroup.demo.system.test.relevance.web;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.Test;
import org.springframework.http.MediaType;

import com.cesgroup.demo.system.test.ControllerTestCase;

/**
 * 
 * @author huz
 * @date 2016-07-12
 * 
 */
public class UserDeptControllerTest extends ControllerTestCase{

	@Test
	public void testSearch() throws Exception {
		this.mockMvc.perform(post("/userdept/search.json").param("username", "用户").param("deptname", "IT"))
			.andExpect(status().isOk())
			.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("list").isArray())
			.andExpect(jsonPath("list.length()").value(5))
			.andDo(print())
			.andReturn();
	}
}
