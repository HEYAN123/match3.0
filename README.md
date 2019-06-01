# 1. 比赛评审系统

<!-- TOC -->

- [1. 比赛评审系统](#1-%E6%AF%94%E8%B5%9B%E8%AF%84%E5%AE%A1%E7%B3%BB%E7%BB%9F)
  - [1.1. 登录](#11-%E7%99%BB%E5%BD%95)
  - [1.2. 学生端](#12-%E5%AD%A6%E7%94%9F%E7%AB%AF)
    - [1.2.1 注册](#121-%E6%B3%A8%E5%86%8C)
    - [1.2.2 上传](#122-%E4%B8%8A%E4%BC%A0)
    - [1.2.3 查看](#123-%E6%9F%A5%E7%9C%8B)
  - [1.3. 教师端](#13-%E6%95%99%E5%B8%88%E7%AB%AF)
    - [1.3.1 查询报名列表](#131-%E6%9F%A5%E8%AF%A2%E6%8A%A5%E5%90%8D%E5%88%97%E8%A1%A8)
    - [1.3.2 查看评分情况](#132-%E6%9F%A5%E7%9C%8B%E8%AF%84%E5%88%86%E6%83%85%E5%86%B5)
    - [1.3.3 评分](#133-%E8%AF%84%E5%88%86)
    - [1.3.4 公布](#134-%E5%85%AC%E5%B8%83)
  - [补充及api修改API](#%E8%A1%A5%E5%85%85%E5%8F%8Aapi%E4%BF%AE%E6%94%B9api)
    - [注册接口删除队员信息](#%E6%B3%A8%E5%86%8C%E6%8E%A5%E5%8F%A3%E5%88%A0%E9%99%A4%E9%98%9F%E5%91%98%E4%BF%A1%E6%81%AF)
    - [学生获取个人信息](#%E5%AD%A6%E7%94%9F%E8%8E%B7%E5%8F%96%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF)
    - [修改个人信息](#%E4%BF%AE%E6%94%B9%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF)
    - [修改密码](#%E4%BF%AE%E6%94%B9%E5%AF%86%E7%A0%81)
    - [获取系统状态](#%E8%8E%B7%E5%8F%96%E7%B3%BB%E7%BB%9F%E7%8A%B6%E6%80%81)
    - [修改获取队伍信息接口](#%E4%BF%AE%E6%94%B9%E8%8E%B7%E5%8F%96%E9%98%9F%E4%BC%8D%E4%BF%A1%E6%81%AF%E6%8E%A5%E5%8F%A3)
    - [修改原项目信息提交接口为报名接口](#%E4%BF%AE%E6%94%B9%E5%8E%9F%E9%A1%B9%E7%9B%AE%E4%BF%A1%E6%81%AF%E6%8F%90%E4%BA%A4%E6%8E%A5%E5%8F%A3%E4%B8%BA%E6%8A%A5%E5%90%8D%E6%8E%A5%E5%8F%A3)
    - [修改接口 裁判获取自己评的项目](#%E4%BF%AE%E6%94%B9%E6%8E%A5%E5%8F%A3-%E8%A3%81%E5%88%A4%E8%8E%B7%E5%8F%96%E8%87%AA%E5%B7%B1%E8%AF%84%E7%9A%84%E9%A1%B9%E7%9B%AE)
    - [评分裁判：](#%E8%AF%84%E5%88%86%E8%A3%81%E5%88%A4)
      - [评分裁判评分操作](#%E8%AF%84%E5%88%86%E8%A3%81%E5%88%A4%E8%AF%84%E5%88%86%E6%93%8D%E4%BD%9C)
    - [加密裁判：](#%E5%8A%A0%E5%AF%86%E8%A3%81%E5%88%A4)
      - [获取评分列表](#%E8%8E%B7%E5%8F%96%E8%AF%84%E5%88%86%E5%88%97%E8%A1%A8)
      - [选择导出excel](#%E9%80%89%E6%8B%A9%E5%AF%BC%E5%87%BAexcel)
    - [管理员](#%E7%AE%A1%E7%90%86%E5%91%98)
      - [管理员录分操作](#%E7%AE%A1%E7%90%86%E5%91%98%E5%BD%95%E5%88%86%E6%93%8D%E4%BD%9C)
      - [给项目分配裁判](#%E7%BB%99%E9%A1%B9%E7%9B%AE%E5%88%86%E9%85%8D%E8%A3%81%E5%88%A4)
      - [切换系统状态](#%E5%88%87%E6%8D%A2%E7%B3%BB%E7%BB%9F%E7%8A%B6%E6%80%81)
      - [获取评分进度](#%E8%8E%B7%E5%8F%96%E8%AF%84%E5%88%86%E8%BF%9B%E5%BA%A6)
      - [获取评委列表](#%E8%8E%B7%E5%8F%96%E8%AF%84%E5%A7%94%E5%88%97%E8%A1%A8)
      - [添加评委账号](#%E6%B7%BB%E5%8A%A0%E8%AF%84%E5%A7%94%E8%B4%A6%E5%8F%B7)
      - [删除评委账号](#%E5%88%A0%E9%99%A4%E8%AF%84%E5%A7%94%E8%B4%A6%E5%8F%B7)

<!-- /TOC -->

## 1.1. 登录

- POST /match/login
- payload :

```json
{
    "userId": "490817982@qq.com",
    "password" : "12334545"
}
```

- return :
  - type: S = 学生 | T = 老师

```json
{
    "code" : 0,
    "type" : "S",
    "token" : "s24gj3h4g53j4f5kh3f"
}
```

---

## 1.2. 学生端

### 1.2.1 注册

- POST /match/sign
- payload :
  - userId: 邮箱作为账号，不可重复

```json
{
    "userId": "490817982@qq.com",
    "leaderName": "贺妍",
    "member1": "小明",
    "member2": "小红",
    "member3": "小白",
    "grade": "大三",
    "major": "计算机科学",
    "college": "林大",
    "phone": "18234343432",
    "passWord" : "12334545"
}
```

- return :

```json
{
    "code" : 0
}
```

---

### 1.2.2 上传

- POST /match/upload
- payload :
  - Content-Type =  multipart/form-data
  - file = xxxxx.doc
  - link: 作品链接
  - workName: 作品名称

```json
{
    "userId": "490817982@qq.com",
    "file": file,
    "link": "www.baidu.com",
    "workName": "xxx系统"
}
```

- return :

```json
{
    "code" : 0
}
```

---

### 1.2.3 查看

- GET /match/work/{userId}
  - 教师端未开启“公布”,则显示“未公布”

- return :
  - score: 不返回 = 未公布 | 92 = 已评分
  - honor: 不返回 = 未公布 | “二等奖” = 所获奖项

```json
{
    "code" : 0,
    "data" : {
      "leaderName" : "贺妍",
      "members": ["小明", "小红", "小白"],
      "workName" : "xxx系统",
      "link" : "www.baidu.com",
      "workUrl" : "222.27.227.135:8080/xxx.doc",
      "score": 92,
      "honor": "优秀奖"
    }
}
```

---

## 1.3. 教师端

### 1.3.1 查询报名列表

- GET /match/workList？
  - isScore = 0 未评完 | 1 已评完
  - workName = "Xxx系统" 作品名称
  - workId = "12312323" 作品编号
  - 由大到小排序

- return :
  - score: null = 五个评委还没有都评完 | 92 = 已出分
  - honor: null = 未出分 | “二等奖” = 计算出的所得奖项

```json
{
  "code": 0,
  "data": [
    {
      "workId": "234232342",
      "workName": "xxx系统",
      "score": 92,
      "honor": "二等奖",
    },
    {
      "workId": "2345332342",
      "workName": "xxx系统",
      "score": null,
      "honor": null,
    }
  ]
}
```

---

### 1.3.2 查看评分情况

- GET /match/workScore?
  - userId = "admin" 只能看到当前管理员账号给的评分信息
  - workId = "234232342"

- return :
  - yytg: 运营推广分
  - kszx: 开设装修分
  - khfw: 客户服务分

```json
{
  "code": 0,
  "data": {
    "workId": "234232342",
    "workName": "xxx系统",
    "link" : "www.baidu.com",
    "workUrl" : "222.27.227.135:8080/xxx.doc",
    "yytg": null,
    "kszx": null,
    "khfw: null
  }
}
```

---

### 1.3.3 评分

- POST /match/score?
- payload:
  - workId: 作品编号

```json
{
    "workId": "234232342",
    "yytg": 12,
    "kszx": 32,
    "khfw: 43
}
```

- return :

```json
{
    "code" : 0
}
```

---

### 1.3.4 公布

- POST /match/publish
  - 发送此请求后学生端显示分数，教师端显示获奖名单，按分数由大到小排序
  - publishKey: 公布操作需要特殊密码

```json
{
    "publishKey": "1322132432"
}
```

- return :

```json
{
    "code": 0,
    "data": [
      {
        "leaderName" : "贺妍",
        "members": ["小明", "小红", "小白"],
        "workName" : "xxx系统",
        "score": 92,
        "honor": "一等奖"
      },
      {
        "leaderName" : "彭冲",
        "members": ["小李", "小张", "小赵"],
        "workName" : "xxx系统",
        "score": 90,
        "honor": "一等奖"
      }
    ]
}
```

---

## 补充及api修改API

### 注册接口删除队员信息

- 接口：/match/sign
- 传的字段有：

```json
userId: '',
leaderName: '',
grade: '',
major: '',
college: '',
phone: '',
password: ''
```

### 学生获取个人信息

- get /match/mine/{userId}

-return:

```json
{
  "code": 0,
  "data": {
    "name",
    "email",
    "education",
    "major",
    "college",
    "phone"
  }
}
```

### 修改个人信息

- PUT /match/mine
- payload: 传学生的id和修改的项目（每次只改一个）

```json
{
  "userId",
  "major"
}
```

- return: code: 0

### 修改密码

- PUT /match/mine
- payload: 传id和修改的项目（每次只改一个）

```json
{
  "userId",
  "oldPs",
  "newPs"
}
```

- return: code: 0

### 获取系统状态

- GET /match/state
- 状态改为流转方式：报名阶段 0，评分阶段 1，复核阶段 2，公布阶段 3，关闭阶段 5
- return:

```json
{
  "code": 0,
  "state": 1
}
```

### 修改获取队伍信息接口

- 接口: /match/work/{userId}
- 需要返回的字段：

```json
leaderName,
teacherName,
member1,
member2,
member3,
workName,
link,
workUrl,
score,
honor,
state 新增-1 表示没有报名
```

### 修改原项目信息提交接口为报名接口

- 增加指导老师和队员字段,传的内容如下：

```json
{
  file,
  userId,
  workName,
  link,
  teacherName,
  member1,
  member2,
  member3
}
```

### 修改接口 裁判获取自己评的项目

- 接口：/match/workList
- 更改：/match/workList/{userId} 裁判账号

### 评分裁判：

- 身份："T"

#### 评分裁判评分操作

- 修改原评分接口 /match/score
- 修改为：
- POST /match/score/{userId}裁判Id
- payload:

```json
kszx: 0
workId: 1
```

### 加密裁判：

- 身份："E"

#### 获取评分列表

- GET /match/scoreList?page=

- return:
- judge:每个评委评的kszx分
- khfw,yytg:管理员录入的两部分机考分
- score:最终计算出来的分数
- rank:排名
- 只有在复核状态才会发送这个请求

```json
{
  "code": 0,
  "data": {
    "scoreList": [
      {
        "workId": "123",
        "workName": "work1",
        "judge1": 50,
        "judge2": 50,
        "judge3": 50,
        "judge4": 50,
        "judge5": 50,
        "khfw": 20,
        "yytg": 11,
        "score": 81,
        "rank": 1,
        "honor": "三等奖"
      },
      {
        "workId": "123",
        "workName": "work1",
        "judge1": 50,
        "judge2": 50,
        "judge3": 50,
        "judge4": 50,
        "judge5": 50,
        "khfw": 20,
        "yytg": 11,
        "score": 81,
        "rank": 2,
        "honor": "三等奖"
      }
    ],
    "page": {
      "eachPage": 5,
      "totalPage": 3,
      "totalSize": 12
    }
  }
}
```

#### 选择导出excel

- get /match/downLoad?workId=123,345,5,4

### 管理员

- 身份："M"

#### 管理员录分操作

- 修改原评分接口 /match/score 跟评分裁判评分操作操作一样，是打另外两部分的分数
- 修改为：
- POST /match/score
- payload:

```json
khfw: 0
yytg: 0
workId: 1
```

---

#### 给项目分配裁判

- POST /match/assign
- payload: 限定5个裁判，如果二次分配则覆盖

```json
{
  "workId": "124",
  "judge": ["123","234","2233","2244","22324"]
}
```

- return: code: 0

---

#### 切换系统状态

- PUT /match/state/{state}
- state为公布阶段时会请求发布通知接口发出公布通知。
- 下载excel地址：/match/downLoad
- return : code: 0

#### 获取评分进度

- GET /match/scoreProcess
- return:

```json
{
  "code": 0,
  "data": 50
}
```

#### 获取评委列表

- GET /match/judge?type=
- return:

```json
{
  "code": 0,
  "data": [
    {
      "userId": "123"
    },
    {
      "userId": "123"
    }
  ]
}
```

#### 添加评委账号

- POST /match/judge
- payload:

```json
{
  "type": "M",
  "userId": "123",
  "password": "123456"
}
```

- return: code: 0

#### 删除评委账号

- DELETE /match/judge
- payload:

```json
{
  "type": "M",
  "userId": "123"
}
```
