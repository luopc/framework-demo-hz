/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.relevance.web</p>
 * <p>文件名:ManyToOneUserController.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-08-25 17:58
 * @todo 
 */
package com.cesgroup.demo.relevance.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cesgroup.demo.relevance.entity.ManyToOneUser;
import com.cesgroup.demo.relevance.service.ManyToOneUserService;
import com.cesgroup.framework.springmvc.web.BaseEntityServiceCRUDController;

/**
 * 
 * @author huz
 * @date 2016-08-25
 * 
 */
@Controller
@RequestMapping("/manytooneuser")
public class ManyToOneUserController extends BaseEntityServiceCRUDController<ManyToOneUser, String, ManyToOneUserService> {

}
