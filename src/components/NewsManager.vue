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
            <Content :style="{padding: '50px',marginBottom: '50px', textAlign: 'left'}" class="layout-content">
                <Card class="layout-card">
                    <h3 slot="title" style="height: 24px;line-hight: 24px;font-size: 20px;">发布通知</h3>
                    <p>通知标题：<Input v-model="newsTitle" style="width: auto;"></Input></p><br>
                    <quill-editor
                      style="min-height: 400px;"
                      v-model="content" 
                      ref="myQuillEditor" 
                      :options="editorOption" 
                      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
                    </quill-editor>
                    <Button type="primary" @click="handleClick">发布</Button>
                </Card>
            </Content>
        </Layout>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'NewsManager',
  data () {
    return {
      API: this.API,
      leaderName: '--',
      content:"",
      newsTitle: "",
      editorOption:{
          modules:{
              toolbar:[
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                  ['blockquote', 'code-block']
              ]
          }
      }
    }
  },
  mounted() {
            //获取队伍信息
            this.leaderName = this.Cookies.get('userId');
        },
  methods:{
            logout () {
                this.Cookies.remove('token');
                this.Cookies.remove('userId');
                this.Cookies.remove('type');
                this.$router.push({
                    path: '/'
                })
            },
            handleClick() {
              console.log(typeof this.content);
              let time = new Date().toLocaleDateString();
               this.axios.post(this.API+'news',{newsTitle: this.newsTitle,newsTime: time,newsContent: this.content},{headers:{"token": this.Cookies.get('token')}}).
               then(res => {
                   if(res.data.code === 0) {
                       this.$Message.info('发布成功！');
                   }
                   else {
                       this.$Message.error(res.daata.message);
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
