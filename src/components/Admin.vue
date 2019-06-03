<template>
  <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"><h1>黑龙江省职业院校技能大赛</h1></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            欢迎，{{leaderName}}
                        </MenuItem>
                        <MenuItem name="2" @click.native="mineVisible = true">
                            修改密码
                        </MenuItem>
                        <MenuItem name="3" @click.native="logout">
                            <Icon type="md-log-out" />
                            退出
                        </MenuItem>
                         <Modal
                            v-model="mineVisible"
                            title="修改密码"
                            @on-ok="changePassword"
                            style="text-align:center;"
                            >
                            原账号密码：
                            <Input type="password" v-model="mineData.oldPs" placeholder="请输入原账号密码" style="width: auto;" /><br><br>                                                            
                            新账号密码：<Input type="password" v-model="mineData.newPs" placeholder="请输入新账号密码" style="width: auto;" />                                
                        </Modal>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '50px', marginBottom: '50px'}" class="layout-content">
                <Card class="layout-card">
                    <div style="min-height: 200px;padding-bottom:100px;">
                        <div>
                            <Divider>切换系统状态</Divider>
                            当前评分进度：{{scoreProcess}}%
                        <Row>
                            <Select v-model="sysState" style="width: 200px;" placeholder="请选择当前系统状态" @on-change="stateChange">
                                <Option :value=0 :selected='true'>报名阶段</Option>
                                <Option :value=1>评分阶段</Option>
                                <Option :value=2>复核阶段</Option>
                                <Option :value=3>公布阶段</Option>
                                <Option :value=4>关闭阶段</Option>
                            </Select>
                        </Row><br>
                        <Button type="primary" @click="scoreList" v-if="sysState === 3">发布成绩公示</Button>
                        </div>
                        <Divider>评分</Divider>
                        <Row style="text-align: left">
                            <Col span="6">
                                评分情况：<Select v-model="search.isScore" style="width: 50%;">
                                            <Option value=" ">全部</Option>
                                            <Option value="0">未评完</Option>
                                            <Option value="1">已评完</Option>
                                        </Select>
                            </Col>
                            <Col span="6">
                                项目名称：<Input v-model="search.workName" style="width: auto;"></Input>
                            </Col>
                            <Col span="6">
                                项目编号：<Input v-model="search.workId" style="width: auto;"></Input>
                            </Col>
                            <Col span="6">
                            <Button type="primary" @click="handleSearch">筛选</Button>
                            </Col>
                        </Row>
                        <br>
                        <Row>
                            <Table border :columns="columns7" :data="data6">
                                <template slot-scope="{ row,index }" slot="action">
                                    <Button type="primary" size="small" style="margin-right: 5px" @click="workVisible('scoreVisible',row.workId,index)">机考分录入</Button>
                                    <Button type="success" size="small" @click="workVisible('assignVisible',row.workId)">分配裁判</Button>
                                </template>
                            </Table>
                            <Modal
                            v-model="assignVisible"
                            title="分配裁判"
                            @on-ok="assignSubmit"
                            style="text-align:center;"
                            >
                                <Select v-model="assignJudge" multiple style="width:100%" placeholder="请选择评判该项目的裁判">
                                    <Option v-for="item in Tdata" :value="item.userId" :key="item.userId">{{ item.userId }}</Option>
                                </Select>
                            </Modal>
                            <br>
                            <Page :total="page.totalSize"
                            size="small"
                            :page-size="page.eachPage"
                            show-total
                            :current="search.page"
                            @on-change="pagechange"
                            />
                            <Modal
                            v-model="scoreVisible"
                            title="机考分录入"
                            @on-ok="ok"
                            @on-cancel="cancel">
                            <h3>项目编号：{{nowData.id}}</h3>
                            <h3>项目名称：{{nowData.name}}</h3>
                            <h3>项目链接：<a href="nowData.link">{{nowData.link}}</a></h3>
                            <h3>项目文档：<a href="nowData.url">{{nowData.url}}</a></h3>
                            <Divider orientation="left">得分录入</Divider>
                            <h3>客户服务（10分）：</h3>
                            <br>
                            <Row>
                                <Col span="8">
                                    <Input v-model="khfw" placeholder="10分">
                                        <span slot="prepend">回答准确</span>
                                    </Input>
                                </Col>
                            </Row>
                            <br>
                            <h3>运营推广（60分）：</h3>
                            <br>
                            <Row>
                                <Col span="8">
                                    <Input v-model="yytg" placeholder="60分">
                                        <span slot="prepend">运营得分</span>
                                    </Input>
                                </Col>
                            </Row>
                        </Modal>
                        </Row>
                        <Divider>加密裁判管理</Divider>
                        <p style="text-align:left;">
                        <Button type="primary" @click="addVisible('E')">新增加密裁判</Button>
                        </p><br>
                        <Table border :columns="Etitle" :data="Edata">
                            <template slot-scope="{ row }" slot="userId">
                                <strong>{{ row.userId }}</strong>
                            </template>
                            <template slot-scope="{ row }" slot="action">
                                <Button type="error" size="small" @click="removeJudge('M',row.userId)">删除</Button>
                            </template>
                        </Table>
                        <Divider>评分裁判管理</Divider>
                        <p style="text-align:left;">
                        <Button type="primary" @click="addVisible('T')">新增评分裁判</Button>
                        </p><br>
                        <Table border :columns="Etitle" :data="Tdata">
                            <template slot-scope="{ row }" slot="userId">
                                <strong>{{ row.userId }}</strong>
                            </template>
                            <template slot-scope="{ row }" slot="action">
                                <Button type="error" size="small" @click="removeJudge('M',row.userId)">删除</Button>
                            </template>
                        </Table>
                        <Modal
                            v-model="addJudgeVisible"
                            title="新增裁判"
                            @on-ok="addSubmit"
                            @on-cancel="cancel"
                            style="text-align:center;"
                            >
                            请输入裁判账号：
                            <Input v-model="addForm.userId" style="width:auto;"></Input><br><br>
                            请输入账号密码：
                            <Input v-model="addForm.password" style="width:auto;"></Input>
                        </Modal>
                     <Divider>通知</Divider>
                    <p>通知标题：<Input v-model="newsTitle" style="width: auto;"></Input></p><br>
                    <quill-editor
                      v-model="content" 
                      ref="myQuillEditor" 
                      :options="editorOption" 
                      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
                    </quill-editor><br>
                    <Button type="primary" @click="handleClick">发布</Button>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'Teacher',
  data () {
            return {
                assignJudge: [],
                actWorkId: "",
                assignVisible: false,
                scoreVisible: false,
                mineData: {
                    oldPs: "",
                    newPs: "",
                    userId: "",
                },
                mineVisible: false,
                addJudgeVisible: false,
                addForm: {
                    type: "",
                    userId: "",
                    password: ""
                },
                Etitle: [
                    {
                        title: '账号',
                        slot: 'userId',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                Edata: [
                    {
                        userId: "123",
                    },
                    {
                        userId: "123",
                    }
                ],
                Tdata: [
                    {
                        userId: "123",
                    },
                    {
                        userId: "123",
                    }
                ],
                scoreProcess: 0,
                sysState: 4,
                editorOption:{
                    modules:{
                        toolbar:[
                            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                            ['blockquote', 'code-block']
                        ]
                    }
                },
                content:"",
                newsTitle: "",
                page: {
                    eachPage: 5,
                    totalSize: 15,
                    totalPage: 5,
                    nowPage: 1
                },
                API: this.API,
                leaderName: '--',
                nowData: {
                    id: "",
                    name: "",
                    link: "--",
                    url: "--"
                },
                search: {
                    workId: '',
                    workName: '',
                    isScore: '',
                    page: 1
                },
                
                a1: '',
                a2: '',
                a3: '',
                a4: '',
                a5: '',
                yytg: '',
                kszx: '',
                khfw: '',
                modal1: false,
                modal2: false,
                modal3: false,
                resultCol:[
                    {
                        title: '队长姓名',
                        key: 'leaderName'
                    },
                    {
                        title: '队伍成员',
                        key: 'members'
                    },
                    {
                        title: '项目名称',
                        key: 'workName'
                    },
                    {
                        title: '得分',
                        key: 'score'
                    },
                    {
                        title: '所获奖项',
                        key: 'honor'
                    }
                ],
                resultData: [],
                columns7: [
                    {
                        title: '项目编号',
                        key: 'workId',
                    },
                    {
                        title: '项目名称',
                        key: 'workName'
                    },
                    {
                        title: '得分',
                        key: 'score'
                    },
                    {
                        title: '得奖',
                        key: 'honor'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        slot: 'action'
                    }
                ],
                data6: []
            }
        },
        created () {
            this.leaderName = this.Cookies.get('userId');
            this.axios.get(this.API+'workList/'+this.Cookies.get('userId'), {
                    headers:{"token": this.Cookies.get('token')}
                }).then(res => {
                    if(res.data.code === 0) {
                        this.data6 = res.data.data.workList;
                        this.page = res.data.data.page;
                    }
                    else {
                        this.$Message.error(res.data.message);
                    }
                });
                this.axios.get(this.API+'state', {
                    headers:{"token": this.Cookies.get('token')}
                }).then(res => {
                    if(res.data.code === 0) {
                        this.sysState = res.data.data.state;
                    }
                    else {
                        this.$Message.error(res.data.message);
                    }
                });
                this.axios.get(this.API+'scoreProcess', {
                    headers:{"token": this.Cookies.get('token')}
                }).then(res => {
                    if(res.data.code === 0) {
                        this.scoreProcess = res.data.data.data;
                    }
                    else {
                        this.$Message.error(res.data.message);
                    }
                });
                this.axios.get(this.API+'judge?type=E', {
                    headers:{"token": this.Cookies.get('token')}
                }).then(res => {
                    if(res.data.code === 0) {
                        this.Edata = res.data.data;
                    }
                    else {
                        this.$Message.error(res.data.message);
                    }
                });
                this.axios.get(this.API+'judge?type=T', {
                    headers:{"token": this.Cookies.get('token')}
                }).then(res => {
                    if(res.data.code === 0) {
                        this.Tdata = res.data.data;
                    }
                    else {
                        this.$Message.error(res.data.message);
                    }
                });
        },
        methods: {
            pagechange (index) {
                this.search.page = index;
                this.axiosSearch();

            },
            logout () {
                this.Cookies.remove('token');
                this.Cookies.remove('userId');
                this.Cookies.remove('type');
                this.$router.push({
                    path: '/'
                })
            },
            show (index) {
                this.modal1 = true
                this.nowData.id = this.data6[index].workId;
                this.nowData.name = this.data6[index].workName;
                this.axios.get(this.API+'workScore',{
                    headers:{"token": this.Cookies.get('token')},
                    params: {
                        userId: this.Cookies.get('userId'),
                        workId: this.data6[index].workId
                    }
                    }).then(res => {
                        if(res.data.code === 0) {
                            this.nowData.link = res.data.data.link;
                            this.nowData.url = res.data.data.workUrl;
                        }
                         else {
                            this.$Message.error(res.data.message);
                        }
                    })
            },
            scoreList () {
                let time = new Date().toLocaleDateString();
               this.axios.post(this.API+'news',{
                   newsTitle: "成绩公示",
                   newsTime: time,
                   newsContent: "<a href='http://120.79.141.169:8080/match2/api/downloadAll'>点击下载成绩公示表</a>"
                   },{headers:{"token": this.Cookies.get('token')}}).
               then(res => {
                   if(res.data.code === 0) {
                       this.$Message.info('发布成功！');
                   }
                   else {
                       this.$Message.error(res.daata.message);
                   }
               })
            },
            ok () {
                let temp = {};
                temp['yytg'] = this.yytg?parseFloat(this.yytg):0;
                temp['khfw'] = this.khfw?parseFloat(this.khfw):0;
                temp['workId'] = this.actWorkId;
                this.axios.post(this.API+'score',temp,{headers:{"token": this.Cookies.get('token')}}).then(res => {
                    if(res.data.code === 0) {
                        this.$Message.info('评分成功');
                        this.scoreVisible = false;
                    }
                    else {
                        this.$Message.error(res.data.message);
                    }
                })
                
            },
            cancel () {
                
            },
            axiosSearch() {
                var obj = this.search;
                var param = {};
                if ( obj === null || obj === undefined || obj === "" ) return param;
                for ( var key in obj ){
                    if ( obj[key] !== null && obj[key] !== undefined && obj[key] !== "" ){
                        param[key] = obj[key];
                    }
                }
                this.axios.get(this.API+'workList', {
                    headers:{"token": this.Cookies.get('token')},
                    params: param
                }).then(res => {
                    if(res.data.code === 0) {
                        this.data6 = res.data.data.workList;
                        this.page = res.data.data.page;
                    }
                    else {
                        this.$Message.error(res.data.message);
                    }
                });
            },
            handleSearch () {
                this.search.page = 1;
                this.axiosSearch();
            },
            handleClick() {
              let time = new Date().toLocaleDateString();
               this.axios.post(this.API+'news',{newsTitle: this.newsTitle,newsTime: time,newsContent: this.content},{headers:{"token": this.Cookies.get('token')}}).
               then(res => {
                   if(res.data.code === 0) {
                       this.$Message.info('发布成功！');
                   }
                   else {
                       this.$Message.error(res.data.message);
                   }
               })
            },
            stateChange() {
                console.log(this.sysState);
            },
            removeJudge(type,userId) {
                let param = {};
                param.type = type;
                param.userId = userId
                this.axios.delete(this.API+'judge',{
                    data: {
                        ...param
                    }
                }).then(res => {
                   if(res.data.code === 0) {
                       this.$Message.info('删除成功！');
                   }
                   else {
                       this.$Message.error(res.data.message);
                   }
               })
            },
            addVisible(type) {
                this.addJudgeVisible = true;
                this.addForm.type = type;
            },
            addSubmit() {
                this.axios.post(this.API+'judge',{
                    ...this.addForm
                }).then(res => {
                   if(res.data.code === 0) {
                       this.$Message.info('添加成功！');
                   }
                   else {
                       this.$Message.error(res.data.message);
                   }
               })
            },
            changePassword() {
                this.mineData.userId = this.Cookies.get('userId');
                this.axios.post(this.API+'mine',{
                    ...this.mineData
                }).then(res => {
                   if(res.data.code === 0) {
                       this.$Message.info('修改成功！');
                       this.mineVisible = false;
                   }
                   else {
                       this.$Message.error(res.data.message);
                   }
               })
            },
            workVisible(act,workId,index) {
                this[act] = true;
                this.actWorkId = workId;
                if(act=="scoreVisible") {
                    this.nowData.id = this.data6[index].workId;
                    this.nowData.name = this.data6[index].workName;
                    this.axios.get(this.API+'workScore',{
                        headers:{"token": this.Cookies.get('token')},
                        params: {
                            userId: this.Cookies.get('userId'),
                            workId: this.data6[index].workId
                        }
                        }).then(res => {
                            if(res.data.code === 0) {
                                this.nowData.link = res.data.data.link;
                                this.nowData.url = res.data.data.workUrl;
                            }
                            else {
                                this.$Message.error(res.data.message);
                            }
                        })
                }
            },
            assignSubmit() {
                this.axios.post(this.API+'assign',{
                    workId: this.actWorkId,
                    judge: this.assignJudge
                }).then(res => {
                   if(res.data.code === 0) {
                       this.$Message.info('分配成功！');
                       this.assignVisible = false;
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
.layout{
    position: relative;
    overflow: hidden;
}
.layout-logo{
    width: 350px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    color: white;
}
.layout-logo h1 {
    z-index: 100;
}
.layout-nav{
    width: 350px;
    margin: 0 auto;
    margin-right: 10px;
}
.layout-content {
    background-color: #81A0AA;
}

</style>
