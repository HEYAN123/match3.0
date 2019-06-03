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
                        <Divider>成绩复核</Divider>
                        <p style="text-align:left;">
                        <Button type="primary"><a :href="downloadHref" style="text-decoration:none;color:white;">导出所选项目成绩表</a></Button>
                        </p><br>
                        <Table border :columns="title" :data="tableData" ref="selection" @on-selection-change="selectChange"></Table>
                        </div><br>
                        <Page :total="page.totalSize"
                            size="small"
                            :page-size="page.eachPage"
                            show-total
                            :current="nowPage"
                            @on-change="pagechange"
                            />
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
                downloadHref: "",
                title: [
                    {
                        type: 'selection',
                        align: 'center'
                    },
                    {
                        title: '排名',
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '项目编号',
                        key: 'workId',
                        align: 'center'
                    },
                    {
                        title: '项目名称',
                        key: 'workName',
                        align: 'center'
                    },
                    {
                        title: '评分裁判1',
                        key: 'judge1',
                        align: 'center'
                    },
                    {
                        title: '评分裁判2',
                        key: 'judge2',
                        align: 'center'
                    },
                    {
                        title: '评分裁判3',
                        key: 'judge3',
                        align: 'center'
                    },
                    {
                        title: '评分裁判4',
                        key: 'judge4',
                        align: 'center'
                    },
                    {
                        title: '评分裁判5',
                        key: 'judge5',
                        align: 'center'
                    },
                    {
                        title: '客户服务',
                        key: 'khfw',
                        align: 'center'
                    },
                    {
                        title: '运营推广',
                        key: 'yytg',
                        align: 'center'
                    },
                    {
                        title: '最终得分',
                        key: 'score',
                        align: 'center'
                    },
                    {
                        title: '所获奖项',
                        key: 'honor',
                        align: 'center'
                    }

                ],
                tableData: [
                ],
                sysState: 4,
                nowPage: 1,
                page: {
                    eachPage: 5,
                    totalSize: 15,
                    totalPage: 5
                },
                API: this.API,
                leaderName: '--',
            }
        },
        created () {
            this.leaderName = this.Cookies.get('userId');
            this.axios.get(this.API+'scoreList?page=1', {
                    headers:{"token": this.Cookies.get('token')}
                }).then(res => {
                    if(res.data.code === 0) {
                        this.tableData = res.data.data.scoreList;
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
        },
        methods: {
            pagechange (index) {
                this.nowPage = index;
                this.axios.get(this.API+'scoreList?page='+this.nowPage, {
                    headers:{"token": this.Cookies.get('token')}
                }).then(res => {
                    if(res.data.code === 0) {
                        this.tableData = res.data.data.scoreList;
                        this.page = res.data.data.page;
                    }
                    else {
                        this.$Message.error(res.data.message);
                    }
                });
            },
            logout () {
                this.Cookies.remove('token');
                this.Cookies.remove('userId');
                this.Cookies.remove('type');
                this.$router.push({
                    path: '/'
                })
            },
            selectChange() {
                let selected = [];
                this.$refs.selection.data.forEach(item => {
                    selected.push(item.workId)
                });
                this.downloadHref = "http://120.79.141.169:8080/match2/api/download?workId="+selected.join(',');
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
