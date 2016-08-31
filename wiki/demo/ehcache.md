Ehcache集群
===========================
Ehcache集群有很多种方式：

1. Terracotta
* RMI
* JMS
* JGroups
* EhCache Server

其中，RMI、JMS、JGroups采用的是同步方式，将各个节点的数据进行通过，效率较低，不建议使用。    
而EhCache Server从1.0发布后就没有了后续的版本。
因此，我们采用的是Terracotta方式。    

Terracotta
-----------------------------

Terracotta是一款由美国Terracotta公司开发的著名开源Java集群平台。它在JVM与Java应用之间实现了一个专门处理集群功能的抽象层，以其特有的增量检测、智能定向传送、分布式协作、服务器镜像、分片等技术，允许用户在不改变现有系统代码的情况下实现单机Java应用向集群话应用的无缝迁移。使得用户可以专注于商业逻辑的开发，由Terracotta负责实现高性能、高可用性、高稳定性的企业级Java集群。

Terracotta公司在2009年收购了著名的Java开源缓存项目Ehcache以及Java任务调度项目Quartz。经过对该项目的深度整合，Terracotta推出了易用性更高的分布式缓存、分布式任务调度以及分布式Web Session等快捷解决方案，进一步方便了开发人员开发分布式Java应用。

### 环境准备
#### 版本选择
##### Terracotta
下载地址：[http://d2zwv9pap9ylyd.cloudfront.net/terracotta-3.7.7.tar.gz](http://d2zwv9pap9ylyd.cloudfront.net/terracotta-3.7.7.tar.gz)
	Terracotta开源版本已经发布至4.3.2，但是Ehcache+Terracotta的集成资料多数都是基于`3.x`版本。    
	因此，我们选择`3.7.7`作为Terracotta服务器。

##### Ehcache
由于Terracotta-3.7.7指定了Ehcache版本为`2.6.8`。    
因此，我们只能选择`2.6.8`作为指定版本。

#### POM配置
Terracotta需要引用2个包：`ehcache-terracotta`和`terracotta-toolkit`，这2个包不在maven仓库中，需要自己引用。
```xml
<dependency>
	<groupId>net.sf.ehcache</groupId>
	<artifactId>ehcache-core</artifactId>
	<version>2.6.8</version>
</dependency>

<dependency>
	<groupId>net.sf.ehcache</groupId>
    <artifactId>ehcache-terracotta</artifactId>
    <version>2.6.8</version>
    <scope>system</scope>
	<systemPath>F:/terracotta-3.7.7/ehcache/lib/ehcache-terracotta-2.6.8.jar</systemPath>
</dependency>

<dependency>
	<groupId>org.terracotta</groupId>
	<artifactId>terracotta-toolkit-1.6-runtime</artifactId>
	<version>5.7.0</version>
	<scope>system</scope>
	<systemPath>F:/terracotta-3.7.7/common/terracotta-toolkit-1.6-runtime-5.7.0.jar</systemPath>
</dependency>

```

#### Shiro配置
修改`applicationContext-module-shiro.xml`中的`cacheManagerShiro`。
```xml
<!-- 缓存管理器 使用Ehcache实现 -->
<bean id="cacheManagerShiro" class="org.apache.shiro.cache.ehcache.EhCacheManager">
<!-- 	<property name="cacheManagerConfigFile" value="classpath:ehcache/ehcache-shiro.xml" /> -->
	<!-- terracotta集群 -->
	<property name="cacheManagerConfigFile" value="classpath:ehcache/ehcache-shiro-terracotta.xml" />
</bean>
```

#### Ehcache配置
修改`ehcache-shiro-terracotta.xml`：
主要修改内容：
1. 添加terracotta服务器配置：`<terracottaConfig url="192.168.121.1:9510"/>`
* 添加cache添加terracotta配置项：`<terracotta/>`，多节点集群情况下：`<terracotta clustered="true"/>`
* 将`diskPersistent`和`overflowToDisk`属性配置为`false`

结果如下：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"      
    xsi:noNamespaceSchemaLocation="ehcache.xsd" updateCheck="false" name="shiroCache">
    
    <cacheManagerEventListenerFactory class="" properties=""/>
    
	<!-- terracotta服务器，多个服务器用,分隔 -->
	<terracottaConfig url="192.168.121.1:9510"/>
	
    <defaultCache
            maxElementsInMemory="10000"
            eternal="false"
            timeToIdleSeconds="120"
            timeToLiveSeconds="120"
            overflowToDisk="false"
            diskPersistent="false"
            diskExpiryThreadIntervalSeconds="120">
		<terracotta clustered="true"/>
    </defaultCache>
    
    <!-- 登录记录缓存 锁定10分钟 -->
    <cache name="passwordRetryCache"
           maxEntriesLocalHeap="2000"
           eternal="false"
           timeToIdleSeconds="3600"
           timeToLiveSeconds="0"
           overflowToDisk="false"
           statistics="true">
		<terracotta clustered="true"/>
    </cache>

    <cache name="authorizationCache"
           maxEntriesLocalHeap="2000"
           eternal="false"
           timeToIdleSeconds="3600"
           timeToLiveSeconds="0"
           overflowToDisk="false"
           statistics="true">
		<terracotta clustered="true"/>
    </cache>

    <cache name="authenticationCache"
           maxEntriesLocalHeap="2000"
           eternal="false"
           timeToIdleSeconds="3600"
           timeToLiveSeconds="0"
           overflowToDisk="false"
           statistics="true">
		<terracotta clustered="true"/>
    </cache>
    
    <!-- session缓存 -->
    <cache name="shiro-activeSessionCache"
           maxElementsInMemory="10000"
           eternal="true"
           timeToIdleSeconds="0"
           timeToLiveSeconds="0"
           overflowToDisk="false"
           diskPersistent="false"
           diskExpiryThreadIntervalSeconds="600">
    	<terracotta clustered="true"/>
    </cache>
</ehcache>
```

#### Terracotta配置
单机可以使用默认配置，也可以添加配置`tc-config.xml`至`bin`目录。
下面是简单单节点配置文件内容：
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<tc:tc-config xmlns:tc="http://www.terracotta.org/config"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.terracotta.org/schema/terracotta-6.xsd">
	<!-- # 配置TERRACOTTA CLUSTER的优化属性，可以放在这里，也可以放在TC.PROPERTIES文件中，TERRACOTTA依以下次序读取属性配置 
		# 1、安装JAR # 2、本XML文件的tc-config节 # 3、tc.properties文件 # 4、系统属性定义 -->
	<tc-properties>
		<!-- 
			<property name="l1.cachemanager.percentageToEvict" value="10"/> 
			<property name="l1.cachemanager.sleepInterval" value="3000"/> 
			<property name="l1.cachemanager.criticalThreshold" value="90"/> 
			<property name="l1.cachemanager.threshold" value="70"/> 
			<property name="l1.cachemanager.monitorOldGenOnly" value="true"/> 
		-->
		<property name="l2.nha.dirtydb.autoDelete" value="true" />
		<property name="l1.cachemanager.enabled" value="true" />
		<property name="logging.maxLogFileSize" value="1024" />
	</tc-properties>
	<!-- SYSTEM这一节记录一些影响Terracotta全局的数据 -->
	<system>
		<!--default:development can setup "production" -->
		<configuration-model>development</configuration-model>
	</system>
	<!-- 
		Servers节点内，用来指定Servers Array里所有服务器，TC Server通过子节点<dso-port>来配置服务监听端口为9510,
		使TC client与DSO模式协同工作 
	-->
	<servers>
		<server host="192.168.121.1" name="server1"
			bind="192.168.121.1">
			<!--当配置以持久方式（persistent）保存数据时候的数据存放地址-->
			<data>%(user.home)/terracotta/server-data</data>
			<!--日志存放地址-->
			<logs>%(user.home)/terracotta/server-logs</logs>
			<index>%(user.home)/terracotta/server-index</index>
			<!-- 
				# 定义terracotta http server 访问用户管理文件名，文件格式为 # username: password [,rolename ...] 
				# rolename目前只有statistics，允许收集统计数据 
				<http-authentication> <user-realm-file>/usr/java/terracotta/realm.properties</user-realm-file> 
				</http-authentication> -->
			<dso>
				<!-- 
					定义在server 启动后多少秒内，可以连接？ 
				-->
				<client-reconnect-window>120</client-reconnect-window>
				<!-- 
					定义DSO对象的持久性保存方式 # temporary-swap-only-方式只临时使用下磁盘，比permanent-store方式要快些 
					# permanent-store-方式只有变化立即写入磁盘，更有利于SERVER异常后的数据恢复。 
					# 默认为temporary-swap-only方式 
				-->
				<persistence>
					<mode>permanent-store</mode>
				</persistence>
				<garbage-collection>
					<!-- 
						配置分布式JVM垃圾的回收方式,true代表自动回收，false模式下只有在'run-dgc'脚本被调用的情况才回收 
					-->
					<enabled>true</enabled>
					<!-- 配置为TRUE在分布式垃圾回收的时候是否写额外信息到日志中，有利于系统优化 -->
					<verbose>false</verbose>
					<!-- 分布式垃圾回收时间间隔，单位秒 -->
					<interval>3600</interval>
				</garbage-collection>
			</dso>
		</server>
	</servers>
	<!--设置影响所有连接到系统的client-->
	<clients>
		<!--告诉dso把TC client的日志放在哪里,可以使用参数 %h代表hostname， %i代表IP地址，
			默认为启动client的目录的相对目录，也可以使用绝对路径-->
		<logs>%(user.home)/terracotta/client-logs/pojo/%i</logs>
	</clients>
</tc:tc-config>

```
需要自定义的情况，可以使用官方提供的样例`config-samples/tc-config-express-reference.xml`修改或是参考文档[Terracotta Server集群](http://yale.iteye.com/blog/1560539)






