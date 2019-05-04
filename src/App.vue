<template>
  <div id="app">
    
    <router-view/>
    <BackTop></BackTop>
    <Footer class="layout-footer-center footer">2019-2019 &copy; 黑龙江职业院校技能大赛评审系统</Footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #81A0AA;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  height: auto !important;
  height: 100%;
  position: relative;
  
}

.footer {
  position: absolute;
  bottom: 0;
  height: 60px;
  width: 100%;
  clear: both;
}
</style>
