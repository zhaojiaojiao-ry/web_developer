# 项目结构

## 多modules

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

在app-parent的pom文件中，**打包类型指定是pom**。指定依赖的下层module，顺序按照依赖关系，app-util、app-dao、app-service、app-web。

其他module的pom文件中，可以不指定打包类型，默认是jar，或者指定打包类型为war。指定parent为app-parent。

child module可以继承parent module pom文件中定义的全部内容，包括属性、依赖、配置等。比如子module中可以用${project.version}变量，实际使用的是父module中定义的这个属性的值。




