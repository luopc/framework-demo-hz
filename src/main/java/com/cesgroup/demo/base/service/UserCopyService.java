/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.system.service</p>
 * <p>文件名:UserService.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-11 14:58
 * @todo 
 */
package com.cesgroup.demo.base.service;

import org.springframework.stereotype.Service;

import com.cesgroup.demo.base.dao.UserCopyMapper;
import com.cesgroup.demo.base.entity.UserCopy;
import com.cesgroup.framework.biz.service.BaseDaoService;

/**
 * 用户管理
 * @author huz
 * @date 2016-07-11
 * 
 */
@Service
public class UserCopyService extends BaseDaoService<UserCopy, String, UserCopyMapper> {
}
