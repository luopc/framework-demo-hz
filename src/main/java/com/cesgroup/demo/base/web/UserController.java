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

import java.beans.PropertyEditorSupport;
import java.sql.Date;
import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.commons.lang3.time.DateUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.cesgroup.demo.base.entity.User;
import com.cesgroup.demo.base.service.UserService;
import com.cesgroup.framework.base.annotation.Logger;
import com.cesgroup.framework.commons.CesDateUtils;
import com.cesgroup.framework.exception.WebUIException;
import com.cesgroup.framework.springmvc.web.BaseEntityServiceCRUDController;

/**
 * 
 * @author huz
 * @date 2016-07-13
 * 
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseEntityServiceCRUDController<User, String, UserService> {
	
	@InitBinder
    protected void initBinder(HttpServletRequest request,
                              ServletRequestDataBinder binder) throws Exception {
        binder.registerCustomEditor(java.sql.Date.class, new PropertyEditorSupport(){
        	/**
        	 * 
        	 * @return
        	 * @see java.beans.PropertyEditorSupport#getAsText()
        	 */
        	@Override
        	public String getAsText() {
        		Date value = (Date) getValue();
        		return (value != null ? CesDateUtils.toString(value, "yyyyMMdd") : "");
        	}

        	/**
        	 * 
        	 * @param text
        	 * @throws IllegalArgumentException
        	 * @see java.beans.PropertyEditorSupport#setAsText(java.lang.String)
        	 */
        	@Override
        	public void setAsText(String text) throws IllegalArgumentException {
        		Date date;
        		try {
        			date = new Date(DateUtils.parseDate(text, "yyyyMMdd").getTime());
        			setValue(date);
        		} catch (ParseException e) {
        			throw new IllegalArgumentException("错误的日期字符串！", e);
        		}
        	}
        });
    }
	
	@Logger(action="添加",logger="${id}")
	@RequestMapping(value="/createValid")
	public ModelAndView create(@Valid User model, BindingResult result) throws WebUIException {
		if(result.hasErrors()) {
            return new ModelAndView("error");
        }
		getService().insert(model);
		return successView();
	}
	
	@Logger(action="添加",logger="${id}")
	@RequestMapping(value="/createValid2")
	@ResponseBody
	public User create2(@Valid User model, BindingResult result, java.sql.Date registerDate2) throws WebUIException {
		if(result.hasErrors()) {
            return model;
        }
		model.setRegisterDate(registerDate2);
		getService().insert(model);
		return model;
	}

	/**
	 * 
	 * @return
	 * @see com.cesgroup.framework.springmvc.web.BaseEntityServiceCRUDController#index()
	 */
	@Override
	@Logger(action="进入",logger="新增页面")
	@RequestMapping(value = "/index")
	@RequiresPermissions("/user2/index")
	public ModelAndView index() {
		return super.index();
	}
}
