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