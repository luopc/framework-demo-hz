/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.relevance.service</p>
 * <p>文件名:ManyToOneUserService.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-08-25 17:57
 * @todo 
 */
package com.cesgroup.demo.relevance.service;

import org.springframework.stereotype.Service;

import com.cesgroup.demo.relevance.dao.ManyToOneUserMapper;
import com.cesgroup.demo.relevance.entity.ManyToOneUser;
import com.cesgroup.framework.biz.service.BaseDaoService;

/**
 * 
 * @author huz
 * @date 2016-08-25
 * 
 */
@Service
public class ManyToOneUserService extends BaseDaoService<ManyToOneUser, String, ManyToOneUserMapper> {

}
