# JUnit

## 基于注解的JUnit

### 方法上的注解

@Test：表明这个方法是一个testcase。

@Before：表明这个方法在每个@Test方法前执行。

@After：表明这个方法在每个@Test方法后执行。

@BeforeClass：表明这个方法在所有@Test方法前执行，且只执行一次。

@AfterClass：表明这个方法在所有@Test方法后执行，且只执行一次。

### 类上的注解

@RunWith：测试的Runner类，默认是BlockJUnit4ClassRunner。在spring应用中用的是SpringRunner。

## 原理

junit的原理据说很值得看，设计模式TODOTODOTODO

https://junit.org/junit5/