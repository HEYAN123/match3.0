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
                        <MenuItem name="3" @click.native="logout">
                            <Icon type="md-log-out" />
                            退出
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '50px', marginBottom: '50px'}" class="layout-content">
                <Card class="layout-card">
                    
                    <Row>
                        <Col span="6">
                        <div style="min-height: 200px;padding-bottom:100px;">
                            <Card>
                                <h3>队长姓名：{{leaderName}}</h3><br>
                                <h3>队伍成员：{{member1+' '}}{{member2+' '}}{{member3}}</h3>
                            </Card>
                            <Card>
                                <h3 slot="title" style="height: 24px;line-hight: 24px;font-size: 20px;">通知</h3>
                                <CellGroup style="text-align: left;" v-model="nowItem"  @on-click="newsHandle">
                                    <Cell  v-for="(item) in items" :name='item.newsId' :key="item.newsTitle" :title='item.newsTitle' :extra='item.newsTime' />
                                </CellGroup>
                                <Modal
                                    v-model="modal2"
                                    title="通知"
                                    style="text-align: center;"
                                    >
                                    <h2>{{nowItem.newsTitle}}</h2>
                                    <p>{{nowItem.newsTime}}</p><br>
                                    <p v-html="nowItem.newsContent" style="text-align:left;"></p>
                                </Modal>
                            </Card>
                        </div>
                        </Col>
                        <Col span="18">
                        <Card style="min-height: 200px;padding-bottom:100px;">
                        
                        <Divider orientation="left">项目信息</Divider>
                        <br>
                        <Steps :current="state" style="text-align: left;margin-left:10%;">
                            <Step title="已成功提交"></Step>
                            <Step title="评分中"></Step>
                            <Step title="评分完成"></Step>
                            <Step title="成绩公布"></Step>
                        </Steps>
                        <br>
                        <p><span>项目名称：</span><b>{{workName}}</b></p>
                        <p><span>项目链接：</span><a :href="link">{{link}}</a></p>
                        <p><span>项目文档：</span><a :href="workUrl">{{workUrl}}</a></p>
                        <br>
                        <p><Button type="primary" @click="modal1 = true">项目信息提交</Button></p>
                        <Modal
                            v-model="modal1"
                            title="项目信息提交"
                            @on-ok="ok"
                            @on-cancel="cancel"
                            style="text-align: center;"
                            >
                            <p>项目名称：<Input v-model="uploadData.workName" style="width: auto;"></Input></p><br>
                            <p>项目链接：<Input v-model="uploadData.link" style="width: auto;"></Input></p><br>
                            <p><Upload :action="API+'upload'" :data="uploadData" :headers="token">
        <Button icon="ios-cloud-upload-outline">项目文档上传</Button>
    </Upload></p>
                        </Modal>
                        <br>
                        <Divider orientation="left">项目成绩</Divider>
                        <span>项目得分：</span><h3 style="display: inline;color:red">{{score}}</h3>
                        <br><br>
                        <span>所得奖项：</span><h3 style="display: inline;color:red">{{honor}}</h3>
                    </Card>
                        </Col>
                    </Row>
                    
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>

export default {
  name: 'Student',
  data () {
            return {
                uploadData: {
                    userId: '',
                    link: '',
                    workName: ''
                },
                token: {
                    token:''
                },
                API: this.API,
                modal1: false,
                modal2: false,
                leaderName: '--',
                member1: '--',
                member2: '--',
                member3: '--',
                nowItem: {
                },
                items: [],
                workName: "--",
                link: "--",
                workUrl: "--",
                score: "--",
                honor: "--",
                state: -1
            }
        },
        mounted() {
            this.uploadData.userId = this.Cookies.get('userId');
            this.token.token = this.Cookies.get('token');
            //获取队伍信息
            this.axios.get(this.API+'work/'+this.Cookies.get('userId'),{headers:{"token": this.Cookies.get('token')}}).
            then(res => {
                if(res.data.code === 0 ) {
                    this.leaderName = res.data.data.leaderName;
                    this.member1 = res.data.data.member1?res.data.data.member1:this.member1;
                    this.member2 = res.data.data.member2?res.data.data.member2:this.member2;
                    this.member3 = res.data.data.member3?res.data.data.member3:this.member3;
                    this.workName = res.data.data.workName?res.data.data.workName:this.workName;
                    this.link = res.data.data.link?res.data.data.link:this.link;
                    this.workUrl = res.data.data.workUrl?res.data.data.workUrl:this.workUrl;
                    this.score = res.data.data.score?res.data.data.score:this.score;
                    this.honor = res.data.data.honor?res.data.data.honor:this.honor;
                    this.state = res.data.data.state;
                }
                else {
                    this.$Message.error(res.data.message);
                }
            });
            //获取通知列表
            this.axios.get(this.API+'news',{headers:{"token": this.Cookies.get('token')}}).
            then(res => {
                if(res.data.code === 0 ) {
                    this.items = res.data.data;
                }
                else {
                    this.$Message.error(res.data.message);
                }
            });
        },
    methods: {
        newsHandle (index) {
            console.log(this.items[index-1].newsId);
            this.modal2 = true;
            this.axios.get(this.API+'newsContent/'+this.items[index-1].newsId,{headers:{"token": this.Cookies.get('token')}}).
            then(res => {
                if(res.data.code === 0) {
                    this.nowItem = res.data.data;
                }
                else {
                    this.$Message.error(res.data.message);
                }
            })
        },
        logout () {
            this.Cookies.remove('token');
            this.Cookies.remove('userId');
            this.Cookies.remove('type');
            this.$router.push({
                  path: '/'
              })
        },
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
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
