实体类
=========================

基本关系
---------------------------
### BaseEntity
> #### StringIDEntity
	以String为主键类型，自动生成UUID的主键。
> #### LongIDEntity
	以Long为主键类型，使用自动生成主键。默认情况下为mysql，可以通过`com.cesgroup.framework.persistence.dialect`参数修改数据库类型。
> #### AssignedIDEntity
	抽象类，必须手动维护主键。

### 基本用法
继承`BaseEntity`或其子类，通过`@Entity`和`@Table`注解，标识实体及其对应数据库表，参照POJO添加对象属性和getter、setter方法。

### StringIDEntity用法
	默认定义主键为`id`，提供了setter和getter方法，并设置主键生成类型为UUID
```java
public class StringIDEntity implements BaseEntity<String>  {
	private static final long serialVersionUID = 1L;
	/** 数据表主键. */
	protected String id;
	
	@Id
	@Column(length = 32, nullable = false)  
	@GeneratedValue(generator = "UUID")   //指定生成器名称  
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
```
使用方式：
```java
@Entity
@Table(name="t_fw_user")
public class User extends StringIDEntity {
	private static final long serialVersionUID = 5315859259889756726L;
	//定义属性
	private String loginName;
	private String name;
	private String plainPassword;
	private String password;
	private String salt;
	@NotNull
	private String roles;
	private Date registerDate;
	private String deptId;
	
	@Transient
	@JsonIgnore
	public List<String> getRoleList() {
		// 角色列表在数据库中实际以逗号分隔字符串存储，因此返回不能修改的List.
		return ImmutableList.copyOf(StringUtils.split(roles, ","));
	}

	// 设定JSON序列化时的日期格式
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getRegisterDate() {
		return registerDate;
	}
	
	/**
	 * @return the loginName
	 */
	public String getLoginName() {
		return loginName;
	}
	/**
	 * @param loginName the loginName to set
	 */
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the plainPassword
	 */
	public String getPlainPassword() {
		return plainPassword;
	}
	/**
	 * @param plainPassword the plainPassword to set
	 */
	public void setPlainPassword(String plainPassword) {
		this.plainPassword = plainPassword;
	}
	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * @return the salt
	 */
	public String getSalt() {
		return salt;
	}
	/**
	 * @param salt the salt to set
	 */
	public void setSalt(String salt) {
		this.salt = salt;
	}
	/**
	 * @return the roles
	 */
	public String getRoles() {
		return roles;
	}
	/**
	 * @param roles the roles to set
	 */
	public void setRoles(String roles) {
		this.roles = roles;
	}
	/**
	 * @param registerDate the registerDate to set
	 */
	public void setRegisterDate(Date registerDate) {
		this.registerDate = registerDate;
	}

	/**
	 * @return the deptId
	 */
	public String getDeptId() {
		return deptId;
	}

	/**
	 * @param deptId the deptId to set
	 */
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}
	
}
```


### LongIDEntity用法
	默认定义主键为`id`，提供了setter和getter方法，并设置主键生成类型为默认为mysql的自动生成
```java
public class LongIDEntity implements BaseEntity<Long>  {
	private static final long serialVersionUID = -8724381846914344422L;
	/** 数据表主键. */
	protected Long id;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
```
	
```java
@Entity
@Table(name="t_fw_user")
public class User extends IDEntity {
	private static final long serialVersionUID = 5315859259889756726L;
	//定义属性
	private String loginName;
	private String name;
	private String plainPassword;
	private String password;
	private String salt;
	@NotNull
	private String roles;
	private Date registerDate;
	private String deptId;
	
	@Transient
	@JsonIgnore
	public List<String> getRoleList() {
		// 角色列表在数据库中实际以逗号分隔字符串存储，因此返回不能修改的List.
		return ImmutableList.copyOf(StringUtils.split(roles, ","));
	}

	// 设定JSON序列化时的日期格式
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getRegisterDate() {
		return registerDate;
	}
	
	/**
	 * @return the loginName
	 */
	public String getLoginName() {
		return loginName;
	}
	/**
	 * @param loginName the loginName to set
	 */
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the plainPassword
	 */
	public String getPlainPassword() {
		return plainPassword;
	}
	/**
	 * @param plainPassword the plainPassword to set
	 */
	public void setPlainPassword(String plainPassword) {
		this.plainPassword = plainPassword;
	}
	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * @return the salt
	 */
	public String getSalt() {
		return salt;
	}
	/**
	 * @param salt the salt to set
	 */
	public void setSalt(String salt) {
		this.salt = salt;
	}
	/**
	 * @return the roles
	 */
	public String getRoles() {
		return roles;
	}
	/**
	 * @param roles the roles to set
	 */
	public void setRoles(String roles) {
		this.roles = roles;
	}
	/**
	 * @param registerDate the registerDate to set
	 */
	public void setRegisterDate(Date registerDate) {
		this.registerDate = registerDate;
	}

	/**
	 * @return the deptId
	 */
	public String getDeptId() {
		return deptId;
	}

	/**
	 * @param deptId the deptId to set
	 */
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}
	
}
```

### 其它用法
1. JSON注解
	@JsonProperty、@JsonIgnore等Jackson的注解
* Validation注解
	@NotNull、@Max、@Length等验证框架注解
* 关联注解
	@OneToMany、@ManyToOne等JPA标准注解，详见[关联对象的查询](wiki/demo/relevance.md)

