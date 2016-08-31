Mybatis持久层
=========================


主要接口关系
---------------------------
### IBaseDao
顶级接口，作为Mybatis扫描标识，所以接口必须继承自此接口，即便是自定义的新接口也一样

> ##### BaseDao
以Mybatis组件Mapper为基础的Dao，但方法名的定义却是参照了JPA的方法名

> ##### BaseMapperDao
以Mybatis组件Mapper为基础的Dao，方法名完全参照了Mapper的定义。  
详见[Mapper的CES修改版本](http://gitlab.dev.cescloud.com/framework/Mapper)或[Mapper原版](http://git.oschina.net/free/Mapper)

### 方法名动态查询
仿照Spring Data JPA方式，通过方法名自动生成SQL语句进行查询

| 关键字      | 说明                        | 示例                                                     |
|:------------|:----------------------------|:---------------------------------------------------------|
| And         | 等价于SQL中的and            | findByNameAndLoginName(String name,String loginName);    |
| Or          | 等价于SQL中的or             | findByNameOrLoginName(String name,String loginName);     |
| Between     | 等价于SQL中的between        | findByRegisterDateBetween(Date start,Date end);          |
| LessThan    | 等价于SQL中的“<”            | findByRegisterDateLessThan(Date date);                   |
| GreaterThan | 等价于SQL中的“>”            | findByREgisterDateGreaterThan(Date date);                |
| isNull      | 等价于SQL中的“is null”      | findByNameIsNull();                                      |
| isNotNull   | 等价于SQL中的“is not null”  | findByNameIsNotNull();                                   |
| NotNull     | 与IsNotNull等价             |                                                          |
| Like        | 等价于SQL中的“like”         | findByNameLike(String name);                             |
| NotLike     | 等价于SQL中的“not like”     | findByNameNotLike(String name);                          |
| OrderBy     | 等价于SQL中的“order by”     | findByNameOrderByRegisterDateAsc(String name);           |
| Not         | 等价于SQL中的“!=”           | findByNameNot(String name);                              |
| In          | 等价于SQL中的“in”           | findByNameIn(Collection<String> nameList);<br>方法的参数可以是 Collection 类型，也可以是数组或者不定长参数|
| NotIn       | 等价于SQL中的“not in”       | findByNameNotIn(Collection<String> nameList);            |

### 查询构造器
继承使用Mapper组件的`Example`形成`ExampleSpecification`，由开发者自行拼接SQL语句，是Mybatis-Generator生成的Example的通用版本。
#### 创建ExampleSpecification：
```java
ExampleSpecification<Dept> spec = ExampleSpecification.create(Dept.class);
spec = SearchHelper.buildSpecification(filters, Dept.class);
spec = SearchHelper.buildSpecification(searchable, Dept.class);
```
#### 拼接查询条件：
```java
spec.createCriteria().andLike("name", "IT%").andEqualTo("orderNo", 2);
```
#### 拼接排序条件：
```java
spec.orderBy("orderNo").asc().orderBy("loginName").desc();
```

### 分页查询
借用Mybatis_PageHelper组件进行二次开发分页，分页利用了Spring Data的`Specification`、`Pageable`和`Page`三个接口
```xml
<!-- MyBatis配置 -->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
	<property name="databaseIdProvider" ref="databaseIdProvider"></property>
	<property name="dataSource" ref="dataSource"></property>
	<property name="configLocation" value="classpath:mybatis/mybatis-config.xml" />
	<!-- 自动扫描entity目录,省掉Configuration.xml里的手工配置 -->
	<property name="typeAliasesPackage" value="#{globalConfiguration.entityPackage}" />
	<property name="typeAliasesSuperType" value="com.cesgroup.framework.base.entity.BaseEntity" />
	<!-- mybatis配置文件自动扫描路径 -->
	<property name="mapperLocations" value="classpath*:/mybatis/**/*Mapper.xml"></property>
	<property name="plugins">
		<array>
			<bean class="tk.mybatis.mapper.interceptor.BatchExecuteInterceptor" >
				<property name="mapperHelper" ref="commonMapperHelper" />
			</bean>
			<ref bean="pageHelper" />
		</array>
	</property>
	<!-- 分页对象工厂，支持Spring Data的Page对象 -->
	<property name="objectFactory" ref="mybatisObjectFactory" />
	<property name="objectWrapperFactory" ref="mybatisObjectWrapperFactory" />
</bean>
<!-- 分页对象工厂，支持Spring Data的Page对象 -->
<bean id="mybatisObjectFactory" class="com.cesgroup.framework.mybatis.page.PageObjectFactory"></bean>
<bean id="mybatisObjectWrapperFactory" class="com.cesgroup.framework.mybatis.page.PageObjectWapperFactory"></bean>

<bean id="pageHelper" class="com.cesgroup.framework.mybatis.page.PageInterceptor">
	<property name="properties">
		<value>
			dialect=#{globalConfiguration.dialect}
			reasonable=true
			supportMethodsArguments=true
			params=count=countSql
			autoRuntimeDialect=true
		</value>
	</property>
</bean>

<!-- 泛型返回值封装处理 -->
<bean id="pageResultMapPostProcessor" class="com.cesgroup.framework.mybatis.mapper.ParameterizedResultMapPostProcessor">
	<property name="classes">
		<array>
			<value>org.springframework.data.domain.Page</value>
		</array>
	</property>
</bean>
```

#### 分页方法的定义方式为：   
在已有的查询方法基础上（可以是方法名动态、也可以是xml、@Select、@SelectProvider，可以是添加新方法也可以在原方法上直接修改）将返回值定义为`Page`，同时添加参数`Pageable`。

##### 参见：`com.cesgroup.demo.base.dao.UserMapper`   
##### 新建方法：
```java
/**
 * 使用xml配置查询
 */
public List<User> findByXml(String name, String loginName);

/**
 * 使用xml配置分页查询
 */
public Page<User> findPageByXml(String name, String loginName, Pageable pageable);

```

##### 直接修改：
```java
/**
 * 使用SQL分页查询
 */
@Select("select * from t_fw_user where login_name like #{loginName}")
public Page<User> findPageBySql(String loginName, Pageable pageable);

/**
 * 使用SQL分页查询
 */
@Select("select * from t_fw_user where login_name like '%user%'")
public Page<User> findPageByLoginNameBySql(Pageable pageable);

/**
 * 使用Provider分页查询
 */
@SelectProvider(type = UserProvider.class, method = "findPageByProvider")
public Page<User> findPageByProvider(@Param("name") String name, String loginName, Pageable pageable);

```

### 批量新增、修改、删除
由于没有通用的批量新增SQL语句，因此，批量新增、修改采用拦截器遍历的方式。   
其实现方式就是遍历集合，一条一条新增或修改，对于大数据量情况下效率较低。   
批量删除采用了`delete from table where id in ()`的方式，各个数据库对in中参数数量有不同的限制（oracle：1000，sqlserver：65535，mysql：不限）。    
因此，为了兼容，批量删除时主键数量最好不要超过1000个

#### BaseDao
```java
    /**
	 * 批量新增
	 * @param entity
	 * 每个对象单独创建连接，效率较低
	 */
	void insert(List<T> entity);
	
	/**
	 * 批量新增
	 * @param entity
	 * 每个对象单独创建连接，效率较低
	 */
	void insertSelective(List<T> entity);
	
	/**
	 * 批量更新
	 * @param entity
	 * 每个对象单独创建连接，效率较低
	 */
	void update(List<T> entity);
	
	/**
	 * 批量更新
	 * @param entity
	 * 每个对象单独创建连接，效率较低
	 */
	void updateSelective(List<T> entity);
```

#### BaseMapperDao
```java
	/**
	 * 批量新增
	 * @param entity
	 * 每个对象单独创建连接，效率较低
	 */
	int insert(List<T> entity);
	
	/**
	 * 批量新增
	 * @param entity
	 * 每个对象单独创建连接，效率较低
	 */
	int insertSelective(List<T> entity);
	
	/**
	 * 批量更新
	 * @param entity
	 * 每个对象单独创建连接，效率较低
	 */
	int updateByPrimaryKey(List<T> entity);
	
	/**
	 * 批量更新
	 * @param entity
	 * 每个对象单独创建连接，效率较低
	 */
	int updateByPrimaryKeySelective(List<T> entity);
	
```
