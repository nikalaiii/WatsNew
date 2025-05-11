<script setup>
  import Header from './components/Header.vue'
  import Weather from './components/Weather.vue'
  import Finance from './components/Finance.vue';
import News from './components/News.vue';
</script>

<template>
  <Header></Header>
  <News></News>
  <Weather></Weather>
  <Finance></Finance>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  transition: all 0.3s ease;
}

body {
  margin: 0;
  background: #d3e8f0;
  background: linear-gradient(90deg, rgba(211, 232, 240, 1) 0%, rgba(134, 219, 219, 1) 50%, rgba(59, 156, 123, 1) 100%);
}

  #app {
    padding: 0;
    margin: 0;
    max-width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
</style>