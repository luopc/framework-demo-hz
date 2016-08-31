SpringMVC表示层
=========================


主要类关系
---------------------------
### BaseController
顶级抽象类，定义了一些基本方法，主要是`getUser()`和`getSubject()`。    
`getUser()`返回认证后的用户对象`IUser`；    
`getSubject()`返回认证对象，可以进一步进行权限判断；    
详细可以参见[Shiro认证接口实现](wiki/demo/shiro.md)

> #### BaseEntityController<Entity>
泛型注入实体类，定义了`动态分页查询方法`[动态分页查询方法](动态分页查询方法)

> > #### BaseEntityDaoServiceCRUDController<Entity, ID, Dao, Service>
泛型注入实体类、主键、DAO和Service，提供了CRUD的默认简单实现。实际不需要注入Dao，建议使用`BaseEntityServiceCRUDController`。

请求示例如下：
URI | 调用方法 | 返回资源 | 说明
----| ----- | ----- | -----
/test/index | index | test/index.* | 首页
/test/show | show | test/show.* | 查看
/test/edit | edit | test/edit.* | 修改
/test/editNew | editNew | test/new.* | 新增
/test/create | create | success.jsp | 保存
/test/update | update | success.jsp | 更新
/test/destory | destroy | success.jsp | 删除
/test/search | search | test/list.* | 查询

> > > #### BaseEntityDaoServiceCRUDRestController
`BaseEntityDaoServiceCRUDController`的子类，实现RESTful规范请求。同样也不需要注入Dao，建议使用`BaseEntityServiceCRUDRestController`。


> > #### BaseEntityServiceCRUDController
泛型注入实体类、主键、DAO和Service，提供了CRUD的默认简单实现。


> > > #### BaseEntityServiceCRUDRestController



