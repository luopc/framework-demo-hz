/**
 * <p>Copyright:Copyright(c) 2016</p>
 * <p>Company:上海中信信息发展股份有限公司</p>
 * <p>包名:com.cesgroup.demo.base.utils</p>
 * <p>文件名:LongToDateSerializer.java</p>
 * <p>类更新历史信息</p>
 * @author huz 
 * @date 2016-07-26 14:33
 * @todo 
 */
package com.cesgroup.demo.base.utils;

import java.io.IOException;
import java.util.Date;

import com.cesgroup.framework.commons.CesDateUtils;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * 将Long转为Date类型字符串
 * @author huz
 * @date 2016-07-26
 * 
 */
public class LongToDateSerializer extends JsonSerializer<Long> {

	/** 日期格式 */
	protected String pattern = "yyyy-MM-dd";
	
	/**
	 * 
	 * @param value
	 * @param gen
	 * @param serializers
	 * @throws IOException
	 * @throws JsonProcessingException
	 * @see com.fasterxml.jackson.databind.JsonSerializer#serialize(java.lang.Object, com.fasterxml.jackson.core.JsonGenerator, com.fasterxml.jackson.databind.SerializerProvider)
	 */
	@Override
	public void serialize(Long value, JsonGenerator gen, SerializerProvider serializers) throws IOException, JsonProcessingException {
		String formattedDate = CesDateUtils.toString(new Date(value), pattern);
        gen.writeString(formattedDate);
	}
}
