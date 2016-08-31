/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.web</p>
 * <p>文件名:UserController.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-13 16:45
 * @todo 
 */
package com.cesgroup.demo.base.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cesgroup.demo.base.dao.UserCopyMapper;
import com.cesgroup.demo.base.entity.UserCopy;
import com.cesgroup.demo.base.service.UserCopyService;
import com.cesgroup.framework.springmvc.web.BaseEntityDaoServiceCRUDController;

/**
 * 
 * @author huz
 * @date 2016-07-13
 * 
 */
@Controller
@RequestMapping("/usercopy")
public class UserCopyController extends BaseEntityDaoServiceCRUDController<UserCopy, String, UserCopyMapper, UserCopyService> {
}
