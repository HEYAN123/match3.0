<template>
  <div class="sign">
    <Card class="card">
        <p slot="title" class="message">注册</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="电子邮箱" prop="userId">
            <Input v-model="formValidate.userId" placeholder="请输入您的邮箱"></Input>
        </FormItem>
        <FormItem label="队长姓名" prop="leaderName">
            <Input v-model="formValidate.leaderName" placeholder="请输入您的姓名"></Input>
        </FormItem>
        <FormItem label="学历" prop="grade">
            <Select v-model="formValidate.grade" placeholder="请选择您的学历">
                <Option value="大一">大一</Option>
                <Option value="大二">大二</Option>
                <Option value="大三">大三</Option>
                <Option value="大四">大四</Option>
            </Select>
        </FormItem>
        <FormItem label="所读专业" prop="major">
            <Input v-model="formValidate.major" placeholder="请输入您的专业"></Input>
        </FormItem>
        <FormItem label="所属院校" prop="college">
            <Input v-model="formValidate.college" placeholder="请输入您所属的院校"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入您的联系电话"></Input>
        </FormItem>
        <FormItem label="账号密码" prop="password">
            <Input  type="password" v-model="formValidate.password" placeholder="请输入您的账号密码"></Input>
        </FormItem>
        <FormItem style="text-align: center">
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="warning" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    </Card>
  </div>
</template>

<script>

export default {
  name: 'Sign',
  data () {
            return {
                API: this.API,
                formValidate: {
                    userId: '',
                    leaderName: '',
                    grade: '',
                    major: '',
                    college: '',
                    phone: '',
                    password: ''
                },
                ruleValidate: {
                    leaderName: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    userId: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '输入的邮箱格式错误', trigger: 'blur' }
                    ],
                    grade: [
                        { required: true, message: '学历不能为空', trigger: 'change' }
                    ],
                    major: [
                        { required: true, message: '专业不能为空', trigger: 'change' }
                    ],
                    college: [
                        { required: true, message: '院校不能为空', trigger: 'change' }
                    ],
                    phone: [
                        { required: true, message: '电话不能为空', trigger: 'change' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'change' }
                    ],

                }
            }
        },
        methods: {
            handleSubmit (name) {
                var obj = this.formValidate;
                var param = {};
                if ( obj === null || obj === undefined || obj === "" ) return param;
                for ( var key in obj ){
                    if ( obj[key] !== null && obj[key] !== undefined && obj[key] !== "" ){
                        param[key] = obj[key];
                    }
                }
                this.axios.post(this.API+'sign',param).
                then(res => {
                    if(res.data.code === 0) {
                        this.$Message.info('注册成功！');
                        this.$router.push({
                            path: '/'
                        })
                    }
                    else {
                        this.$Message.error(res.data.message);
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sign {
    margin: 0 auto;
    width: 60%;
    margin-top: 60px;
    padding-bottom: 100px;
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
