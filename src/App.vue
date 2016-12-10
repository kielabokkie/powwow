<template>
  <div class="wrapper" id="app-wrapper">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  .page-wrapper {
    margin: 20px;
    ul {
      list-style: none;
    }
    .opacity-half {
      opacity: 0.5;
    }
    .list-item {
      border-bottom: 1px solid #ddd;
      line-height: 1.5;
      padding: 10px 0;
    }
  }
}
</style>
