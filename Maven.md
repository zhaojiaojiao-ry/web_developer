# Maven

## 基础

### maven仓库

本地仓库、私有服务器、中心仓库

### 常用命令

mvn compile：编译

mvn test：测试

mvn package：打包

mvn install：上传到本地仓库

mvn deploy：上传到私有服务器

以上命令按照生命周期顺序排列，如果执行其中一个，会自动执行其前面的命令。比如执行mvn package，那么mvn compile和test都会依次自动执行。

mvn clean：用来清理已经编译的内容。通常在执行上述命令时都先执行mvn clean。如mvn clean package。

## 依赖dependencies

dependency下的属性有：

groupId, artifactId, version，三个属性确定一个唯一的资源。

type：指明资源是jar、war还是其他。默认是jar。

exclusions：排除依赖。为了解决多依赖下的版本冲突或资源冲突。exclusion-artifactId/groupId。

scope：指明资源在什么时间范围内生效。

> complie：编译、测试、运行。默认就是compile。
 
> test：测试。如junit。

> provided：编译、测试。运行环境会提供的包，比如servlet相关的包，运行时使用tomcat会提供。

> runtime：测试、运行。编译时不需要的，比如jdbc驱动包。

依赖使用原则：如果同一个资源被多次依赖，第一，选择路径近的；第二，选择声明优先的。

## dependencies和dependencyManagement的区别？

dependencies：声明的是具体的依赖。

dependencyManagement：用于多module项目的版本管理。如果在子module中声明依赖时没有指定version，那么会沿着parent向上查找。
直到找到一个dependencyManagement，以dependencyManagement中的版本为准。当一个项目中多个module都依赖同一个资源时，可以通过这个方法统一版本。
如果子module中没有依赖dependencyManagement中声明的资源，那么可以忽略dependencyManagement。

## 多modules的组织方法

web应用工程中常见的module划分方式：app-util、app-dao、app-biz/app-service、app-web。后者依赖于前者。
注意：要保持module间依赖关系的单向性。

为什么要分modules？如果混在一起，不利于内聚和外解耦，各部分之间的开发相互影响。
有了module划分和单向依赖，可以对单个module的内容进行版本管理，上层可以依赖稳定版本的下层，上层的开发独立于下层的开发。
同一套下层，可以被多套上层使用，达到复用。

举例：有如上几个module，那么在maven管理的项目app-parent中，模块结构如下：

|-- app-parent

             |-- pom.xml (pom)

             |

             |-- app-util

             |        |-- pom.xml (jar)

             |

             |-- app-dao

             |        |-- pom.xml (jar)

             |

             |-- app-service

             |        |-- pom.xml (jar)

             |

             |-- app-web

                      |-- pom.xml (war)
                      
app-parent以及每个module都有一个pom文件。

在app-parent的pom文件中，**打包类型指定是pom**。指定依赖的下层modules，顺序按照依赖关系，app-util、app-dao、app-service、app-web。
properties中定义了属性的keyvalue对，这些属性可以在下文中通过${属性key}的方式获得。同时，这些属性在子module中也可以使用。

其他module的pom文件中，可以不指定打包类型，默认是jar，或者指定打包类型为war。指定parent为app-parent。

child module可以继承parent module pom文件中定义的全部内容，包括属性、依赖、配置等。
比如子module中可以用${project.version}变量，实际使用的是父module中定义的这个属性的值。

## build插件

### 使用方法
```
<build>
    <plugins>
        <plugin>
            <groupId></groupId>
            <artifactId></artifactId>
            <version></version>
            <executions>    // 可以在这里定义多个执行
                <execution>
                    <id></id>   // 执行的id（当前pom内的唯一标识）
                    <phase></phase>     // 执行的时间阶段phase=compile/test/package/install等。如果没有指定phase，就使用goal的默认phase。如果goal没有默认phase，则不执行。
                    <configuration>     // 执行的入参，会传递给插件实现类的成员属性
                    </configuration> 
                    <goals>
                        <goal></goal>   // 映射到插件中的实现类，执行实现类的execute方法
                    </goals>
                </execution>
            </executions>
            <dependencies>      // 插件依赖的资源
            </dependencies>
        </plugin>
    </plugins>
</build>
```

plugins、pluginManagement的关系和dependencies、dependencyManagement的关系是一样的。子module中可以继承父module中对应plugin（相同groupId、artifactId）的属性。

mvn命令执行时，指定了执行阶段，查找到相同phase的execution，执行execution内指定的goal。

### 常用插件

#### 默认插件

maven提供了一些默认插件maven-xxx-plugin，这些插件与指定的phase绑定，会自动在对应的phase阶段调用。如果需要特殊设置插件的属性，则需要显式指定插件和属性。

maven-clean-plugin：clean，清理上次创建的目标文件。

maven-resources-plugin：resources/testResources，处理src和test资源文件。

maven-compiler-plugin：compile/testCompile，编译src和test文件。

maven-surefire-plugin：test，执行test文件。如果想跳过测试，除了在pom中指定插件属性skip=true，还可以在命令行-Dmaven.test.skip=true。

maven-jar-plugin：package，创建jar。非web项目常用基础打包方法。高级的可以用maven-shade-plugin和maven-assembly-plugin。

maven-install-plugin：install，安装jar到本地仓库。

maven-deploy-plugin：deploy，发布jar到私有服务器。

#### 其他常用插件

maven-shade-plugin：package，生成uber-jar，包含所有的依赖jar包，生成的是可执行包。可以指定main class。

maven-assembly-plugin：package，通过描述文件定制化打包。详见：https://www.jianshu.com/p/14bcb17b99e0

spring-boot-maven-plugin：package，springboot项目打包时使用。


