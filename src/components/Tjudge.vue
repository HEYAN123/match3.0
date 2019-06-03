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
                            <Table border :columns="columns7" :data="data6"></Table>
                            <br>
                            <Page :total="page.totalSize"
                            size="small"
                            :page-size="page.eachPage"
                            show-total
                            :current="search.page"
                            @on-change="pagechange"
                            />
                            <Modal
                            v-model="modal1"
                            title="项目评审"
                            @on-ok="ok"
                            @on-cancel="cancel">
                            <h3>项目编号：{{nowData.id}}</h3>
                            <h3>项目名称：{{nowData.name}}</h3>
                            <h3>项目链接：<a href="nowData.link">{{nowData.link}}</a></h3>
                            <h3>项目文档：<a href="nowData.url">{{nowData.url}}</a></h3>
                            <Divider orientation="left">评分</Divider>
                            <h3>开设装修（30分）：</h3>
                            <br>
                            <Row>
                                <Col span="8">
                                    <Input v-model="a1" placeholder="12分">
                                        <span slot="prepend">PC电商店铺</span>
                                    </Input>
                                </Col>
                                <Col span="8">
                                    <Input v-model="a2" placeholder="4.5分">
                                        <span slot="prepend">移动电商店铺</span>
                                    </Input>
                                </Col>
                                <Col span="8">
                                    <Input v-model="a3" placeholder="8.5分">
                                        <span slot="prepend">跨境电商店铺</span>
                                    </Input>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">
                                    <Input v-model="a4" placeholder="3分">
                                        <span slot="prepend">营销策划</span>
                                    </Input>
                                </Col>
                                <Col span="8">
                                    <Input v-model="a5" placeholder="2分">
                                        <span slot="prepend">视觉营销</span>
                                    </Input>
                                </Col>
                            <br>
                            </row>
                        </Modal>
                        </row>
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
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        disabled: this.sysState!=1
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '评分')
                            ]);
                        }
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
                   newsContent: "<a href='http://120.79.141.169:8080/match2/api/download'>点击下载成绩公示表</a>"
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
                this.kszx = parseFloat(this.a1?this.a1:0)+parseFloat(this.a2?this.a2:0)+parseFloat(this.a3?this.a3:0)+parseFloat(this.a4?this.a4:0)+parseFloat(this.a5?this.a5:0);
                let temp = {};
                temp['score'] = this.kszx?this.kszx:0;
                temp['workId'] = this.nowData.id;
               
                this.axios.post(this.API+'score/'+this.Cookies.get('userId'),temp,{headers:{"token": this.Cookies.get('token')}}).then(res => {
                    if(res.data.code === 0) {
                        this.$Message.info('评分成功');
                        this.modal1 = false;
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
.layout-content .ivu-layout-content {
    background-color: #81A0AA;
}

</style>
