/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.test.web</p>
 * <p>文件名:UserControllerTest.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-13 16:47
 * @todo 
 */
package com.cesgroup.demo.system.test.base.web;

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
 * @date 2016-07-13
 * 
 */
public class UserControllerTest extends ControllerTestCase {


	@Test
	public void testSearchSearchablePageable() throws Exception {
		this.mockMvc.perform(post("/user/search.json")
				.param("Q_LIKE_name", "用户")
				.param("Q_LIKE_loginName", "user")
				.param("P_orders", "name desc,loginName asc")
			)
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("total").value(10))
			.andExpect(jsonPath("data.length()").value(10))
			.andReturn();
		
		this.mockMvc.perform(post("/user/search.json").param("Q_IN_name", "用户1,用户2,用户3"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("total").value(3))
			.andExpect(jsonPath("data.length()").value(3))
			.andReturn();
	}

	@Test
	public void testCreate() throws Exception {
		this.mockMvc.perform(post("/user/createValid.json").param("name", "用户a").param("loginName", "usera")
				.param("registerDate", "20160209")
				)
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
			.andReturn();
	}
	

	@Test
	public void testCreate2() throws Exception {
		this.mockMvc.perform(post("/user/createValid2.json").param("name", "用户a").param("loginName", "usera").param("registerDate2", "20160209"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
			.andReturn();
	}
}
