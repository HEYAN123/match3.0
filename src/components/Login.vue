<template>
  <div class="login">
    <Row class="loginrow">
        <Col span="12" class="name">
          <h1>黑龙江省职业院校技能大赛</h1>
          <h2>评 审 系 统</h2>
        </Col>
        <Col span="12">
        <Card class="card">
          <br>
        <p slot="title" class="message">请先登录</p>
          <Input v-model="userId"  placeholder="请输入您的电子邮箱">
              <span slot="prepend"><Icon type="ios-person-outline" slot="prepend"></Icon></span>
          </Input>
          <br>
          <Input type="password" v-model="password" placeholder="请输入您的账号密码">
              <span slot="prepend"><Icon type="ios-lock-outline" slot="prepend"></Icon></span>
          </Input>
          <br>
          <Button type="primary" @click="handleSubmit">登录</Button>
          <Button type="warning" @click="goSign">注册</Button>
          <br>
    </Card>
        </Col>
    </Row>
    
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      API: this.API,
      userId: '',
      password: ''
    }
  },
  methods: {
    goSign () {
      this.$router.push({
        path: '/sign'
      })
    },
    handleSubmit () {
      this.Cookies.set('userId',this.userId);
      this.axios.post(this.API+'login',{userId:this.userId,password:this.password}).
      then(res => {
          if(res.data.code === 0 ) {
            this.Cookies.set('token',res.data.data.token);
            this.Cookies.set('userId',this.userId);
            this.Cookies.set('type',res.data.data.type);
            if(res.data.data.type === 'S') {
              this.$router.push({
                  path: '/student'
              })
            }
            else if(res.data.data.type === 'T' || res.data.data.type === 'Z') {
              this.$router.push({
                  path: '/teacher'
              })
            }
            else if(res.data.data.type === 'C') {
              this.$router.push({
                  path: '/newsmanage'
              })
            }
              
          }
          else {
              this.$Message.error(res.data.message);
          }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
    float: right;
    width: 50%;
    margin-right: 30%;
}
.login {
  background-color: #81A0AA;
}
.name {
  margin-top: 30px;
}
.name h1 {
  font-size: 30px;
  color: white;
}
.name h2 {
  font-size: 70px;
  color: white;
  text-align: center;
}
.loginrow {
  padding-top: 10%;
  height: 100%;
}
.message {
  font-size: 30px;
  line-height: 30px;
  height: 30px;
}
</style>
