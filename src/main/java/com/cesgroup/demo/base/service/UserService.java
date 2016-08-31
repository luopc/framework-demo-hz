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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cesgroup.demo.base.dao.DeptMapper;
import com.cesgroup.demo.base.dao.UserMapper;
import com.cesgroup.demo.base.entity.Dept;
import com.cesgroup.demo.base.entity.User;
import com.cesgroup.framework.biz.service.BaseDaoService;
import com.cesgroup.framework.commons.SpringContextUtils;

/**
 * 用户管理
 * @author huz
 * @date 2016-07-11
 * 
 */
@Service("demoUserService")
public class UserService extends BaseDaoService<User, String, UserMapper> {
	//注入其它dao
	@Autowired
	private DeptMapper deptMapper;
	
	@Transactional
	public void save(User user){
		Dept dept = deptMapper.selectOne(user.getDeptId());
		//获取Spring容器中的DAO
		SpringContextUtils.getBean(DeptMapper.class).update(dept);
		//获取当前绑定的DAO
		getDao().insert(user);
	}
}
