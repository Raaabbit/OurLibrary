# OurLibrary前端说明文档

<p align="right">By 杨昱昊</p>

## 技术选型

* 采用HTML5,CSS3以及原生JavaScript开发
* 完全采用异步数据传输，完全由前端进行视图渲染，实现前后端分离


## 功能说明

### 学生系统 OurLibrary-Student

> 概述：学生系统主要由登录/退出登录，查询图书，借阅图书，查看已借阅图书，还书，充值五个功能构成。其中查询图书不考虑登录状态，其他功能均需要用户先进行登录，前端根据本地数据可以进行第一次功能拦截。

#### 登录/退出登录

登录和退出登录的启动区在整个界面的左上角

* 未登录状态下，呈现登录功能，当点击后，弹出模态窗口，可以进行登录或者取消登录操作。登录后将所有非敏感信息保存在`window.Person`对象下作为全局变量以供使用（注：在这里为了减轻服务期负担以及前端的安全性没有使用`cookie`，本地`window.Person`的数据在刷新页面后立即销毁）
* 登陆后在左上角显示退出登录按钮，当点击的时候将`window.Person`销毁，并刷新页面



#### 查询图书&借阅图书

查询图书具有两种功能：**精确查询**和**模糊查询**。

* 精确查询：通过输入图书的bookID，从而检索到唯一的图书，得到图书的全部信息，构建一个图书卡片呈现出来。
* 模糊查询：通过输入非精确的图书属性（书名，出版社，作者名，译者名）来检索图书，并构建多个图书卡片呈现出来。

两种查询得到的图书卡片是相同的，每个卡片都有两个功能按钮：**详情和借书**。

* 点击详情，弹出遮罩层和模态窗口，呈现更详细的图书信息，包含当前的本书书号，出版社，出版时间，作者名，译者名，出版时间，馆藏数量，可借状态。同时在点击返回的时候回到借书界面。
* 点击借书，向后台发送借书请求，借书成功和失败都会给出提示信息。

#### 查看已借阅图书&还书

所有的已借阅图书的基本信息都保存在了本地，点击“**我的书架**”的时候，进行一次DOM的渲染，更新页面上呈现的信息。

在页面上生成了图书卡片，包含的功能按钮：**续借和还书**。

+ 当点击还书的时候，发送请求
  * 如果返回还书成功信息，并且没有超期，则提示还书成功，并更新书架数据
  * 如果返回还书成功信息，并且超期，则提示成功还书和扣除余额信息
  * 如果返回还书失败信息，并且超期，并且余额不足以抵扣罚金，则提示欠款信息并提醒用户充值
+ 当点击续借时候，本质上执行了还书+借书的操作，信息同上


#### 充值

借阅者可以充值书卡，要求用户输入的数为正数，前端进行表单检验来保证充值成功。用户充值或失败都可以显示相应的提示。

### 管理员系统 OurLibrary-Manager

> 概述：管理员系统主要进行对数据的操作，包含了登录/取消登录，查询图书信息，图书新增入库，图书删除出库，修改图书信息，查询借阅者信息，注册新借阅者七个功能。其中查询图书不需要登录状态，其他功能均需要用户先进行登录，前端根据本地数据可以进行第一次功能拦截。

#### 登录/退出登录

请参见学生登录功能

#### 图书查询

请参加学生查询图书功能

**与学生功能区别：** 生成的图书卡片不具有借书功能

#### 图书入库

添加新的图书，要求管理员输入图书的所有信息，所有表单项均为必填项，前端在提交前进行第一次数据检查，拦截非法情况。图书添加成功或添加失败都会给出提示信息

#### 图书删除

图书删除要求输入要出库的图书书号和数量，均为必填项目

* 如果图书数量超出了书库中的图书数量，算作出库失败，会给出提示。
* 如果有未填写项目进行拦截提示
* 如果出库成功，进行成功提示并刷新表单

#### 图书信息修改

图书信息修改的表单和图书入库表单是相同的，区别在于只有图书书号是必填写项目，其他项目均为选填，缺省值为空。如果所有选填项目为空，不进行修改操作。

#### 学生信息查询

学生信息查询复用了图书精确查询功能，输入学生的ID进行查询，没有模糊查询功能。

得到学生信息之后将学生信息呈现到界面中，包括：学号，姓名，当前借阅的图书ID以及书名

* 数据库中没有这个用户，返回错误信息，查找失败
* 学号限定为８位，提交前将进行一次检验，不满足条件阻止提交并提示

#### 注册新借阅者

注册借阅者和添加图书类似，所有项目均为必填项，包含学生的学号(studentID)，密码，用户名，充值金额

* 表单提交前进行一次检验，判断学号是否为８位，所有项目是否填写，对异常情况给出提示
* 注册成功给出提示
* 注册失败，显示失败原因（学号重复等）

## 交互规约
### 学生/管理员精确查询
由于bookID是唯一的，所以精确查询可以找到这本书所有的信息
* 接口：/
* 请求方式：POST
* 请求体：
```
{
    "bookID":"3-E-33"
}
```
* 响应体JSON：
```
{
    "bookName":"计算机算法设计与分析",   // 书名
    “publisher”:"电子工业出版社",       // 出版社
    "time":"2012-2",                 // 出版时间
    "author":"王晓东",                // 作者
    "translator":"",                 // 翻译者
    "time":"2012-2".                 // 时间
    "count":2,                       // 当前馆中数量        
    "status":true                    // 是否可借
}
```

### 学生/管理员模糊查询
本操作提供４个查询参数，均为可选参数，查询得到包含一本或多本图书列表
* 接口：
* 请求方式：POST
* 请求头：Content-Type:application/json
* 请求体：用户在表单中输入的数据，组织为json格式

```
{
    "bookName":"计算机算法设计与分析",   // 书名
    “publisher”:"",                  // 出版社，未填写
    "author":"",                     // 作者，未填写
    "translator":"",                 // 翻译者，未填写
}
```
* 响应体：由于不是通过唯一标志进行的查询，所以可能在数据库中检索到多本书，进行统一组织，一同发送到前端
```
{
    //图书列表
    "bookList":[
        {
            "bookID":"3-E-22",
            "bookName":"计算机算法设计与分析",   // 书名
            “publisher”:"电子工业出版社",       // 出版社
            "time":"2012-2",                 // 出版时间
            "author":"王晓东",                // 作者
            "translator":"",                 // 翻译者
            "status":true,                   // 是否可借
            "number":"2",                    // 馆藏数量      
        },
        {
            "bookID":"3-E-22",
            "bookName":"计算机算法设计与分析",   // 书名
            “publisher”:"东南大学出版社出版社",  // 出版社
            "time":"2011-2",                 // 出版时间
            "author":"XXX",                  // 作者
            "translator":"XXX",              // 翻译者
            "status":false,                  // 是否可借
            "number":"1",                    // 馆藏数量
        }
    ]
}
```
### 学生登录
学生进行所有操作的前置条件
* 接口：
* 请求方式：POST
* 请求头：Content-Type:application/json
* 请求体：
```
{
    "studentID":"71116216",      // 用户名，如学号/一卡通
    "password":"xxxxxxxx"        // 密码
}
```
* 响应体JSON：
```javascript
{
    "status":"200",             // 根据返回的状态码，判断是否成功
    "name":"杨昱昊",
    "balance":10,              
    "books":[
        {
            "bookName":"算法",
            "borrowDate"："2018-3-1"
        },
        {
            "bookName":"算法",
            "borrowDate"："2018-3-1"
        }
        {
            "bookName":"算法",
            "borrowDate"："2018-3-1"
        }
    ]
}
```

### 学生借书
* 接口：
* 请求方式：POST
* 请求头：bookID
* 请求体：
```
{
    "studentID":"213161673",      // 用户名，如学号/一卡通
    "bookID":"3-E-2"              // 书号
}
```
* 响应体JSON：
```
{
    "status":"200",             // 根据返回的状态码，判断是否成功
    "message":"借阅成功"，
    "books":[
        {
            "nookName":"算法",
            "borrowDate"："2018-3-1"
        },
        {
            "nookName":"算法",
            "borrowDate"："2018-3-1"
        }
        {
            "nookName":"算法",
            "borrowDate"："2018-3-1"
        }
    ]
}
```
### 学生还书
* 接口：
* 请求方式：POST
* 请求头：Content-Type:application/json
* 请求体：
```
{
    "studentID":"71116216",      // 用户名，如学号/一卡通
    "bookId":"3-E-22"            // 书号
}
```
* 响应体JSON：
  如果没有超期，直接还书成功
```
{
    "overdue":"0",           // 是否超期，1表示超期，0表示没有超期，后端计算得到
    "enough":true,           // 如果足够，询问用户是否确认还书，确认则发送下一个请求
    "books":[
        {
            "nookName":"算法",
            "borrowDate"："2018-3-1"
        },
        {
            "nookName":"算法",
            "borrowDate"："2018-3-1"
        }
    ]
}
```
如果超期，发给前端罚金数，前端提示用户交钱
```
{
    "overdue":"1",           // 是否超期，1表示超期，0表示没有超期，后端计算得到
    "fine":2,                // 超期罚金
    "enough":false           // 如果不够，提示用户充值   
}
```

### 借阅者充值
* 接口：
* 请求方式：POST
* 请求头：Content-Type:application/json
* 请求体：
```
{
    "studentID":"71116216",      // 用户名，如学号/一卡通
    "amount":"100"               // 金额
}
```
* 响应体JSON：
```
{
    "status":200,            // 充值成功
    "balance":100,           // 卡中现在的金额
}
```

### 管理员登录
* 接口：
* 请求方式：POST
* 请求头：bookID
* 请求体：
```
{
    "managerID":"xxxxxxxx",      // 用户名，工号
    "password":"yyyyyyyy"       // 密码
}
```
* 响应体JSON：
```
{
    "status":"200",             // 根据返回的状态码，判断是否成功
    "message":"登录成功"
}
```

### 管理员添加学生信息
* 接口：
* 请求方式：POST
* 请求头：Content-Type:application/json
* 请求体：
```
{
    "studentID":”71116216“,
    "password":"xxxxxxxx",
    "name":"杨昱昊".
    "balance":"10"       
}
```
* 响应体：
```
{
    "status":200,
    "message":"注册成功"
}
```
### 管理员查询学生信息
* 接口：
* 请求方式：GET
* 请求头：Content-Type:application/json
* 请求体：
```
{
    "studentID":”71116216“      
}
```
* 响应体：
```
{
    "name":"xxx",
    "balance":10,
    "books":[
        {
            "bookID":"3-E-33",
            "bookName":"算法"
            "borrowDate":"2018-3-1"
        },
        {
            "bookID":"3-E-45",
            "bookName":"数据结构"
            "borrowDate":"2018-3-２　"
        }
    ]
}
```
### 管理员添加图书
* 接口：
* 请求方式：POST
* 请求头：Content-Type:application/json
* 请求体：
```
{
    ”bookID“:"3-E-56",               //书籍id
    "bookName":"计算机算法设计与分析",   // 书名
    “publisher”:"电子工业出版社",       // 出版社
    "time":"2012-2-12",              // 出版时间
    "author":"王晓东",                // 作者
    "translator":"",                 // 翻译者
    "status":true,                   // 是否可借
    "count":"2",                    // 馆藏数量         
}
```
* 响应体：
```
{
    "status":200,
    "message":"入库成功"
}
```
### 管理员删除图书
* 接口：
* 请求方式：POST
* 请求头：Content-Type:application/json
* 请求体：
```
{
    ”bookID“:"3-E-56",               //书籍id
    ”count“:1                        //删除数量    
}
```
* 响应体：
```
{
    "status":200,
    "message":"删除成功"
}
```

### 管理员修改图书信息
bookID是不可修改的
* 接口：
* 请求方式：POST
* 请求头：Content-Type:application/json
* 请求体：
```
{
    ”bookID“:"3-E-56",               //书籍id
    "bookName":"",   // 书名
    “publisher”:"电子工业出版社",       // 出版社
    "time":"",  　　　                 // 出版时间
    "author":"",      　              // 作者
    "translator":"",                 // 翻译者
    "status":,                       // 是否可借
    "count":"",                 　   // 馆藏数量         
}
```
* 响应体：
```
{
    "status":200,
    "message":"修改成功"
}
```
