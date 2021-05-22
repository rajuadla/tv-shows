<template>
  <div id="app">
    <header>
      <page-header></page-header>
    </header>
    <main>
      <div class="container">
        <div class="loader" v-if="$store.state.loading">
          <b-spinner variant="danger"></b-spinner>
        </div>
        <error-handler :message="errorMessage"/>
        <router-view v-if="!errorMessage"/>
        <div class="scroll-to-top" v-if="scrollHight > 300">
          <p @click="scrollTop()">^</p>
        </div>
      </div>
    </main>
    <footer class="bg-dark">
      <page-footer></page-footer>
    </footer>
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import PageHeader from '@/shared/components/PageHeader.vue'
import PageFooter from '@/shared/components/PageFooter.vue'
import ErrorHandler from '@/components/ErrorHandler.vue'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter,
    BSpinner,
    ErrorHandler
  },
  data () {
    return {
      scrollHight: 0
    }
  },
  computed: {
    errorMessage () {
      return this.$store.state.errorMessage ? this.$store.state.errorMessage : null
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.scrollHight = window.scrollY
    },
    scrollTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style>
html,
body {
  min-height: 100%;
}
body {
  background-image: linear-gradient(to bottom, #949090, #fff);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  position: relative;
  min-height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.carousel .carousel-inner .carousel-item img {
  max-height: 350px;
  width: 100%;
}
footer {
  width: 100%;
  height: 50px;
}
main {
  min-height: 659px;
  margin-bottom: 25px;
}
.margin-t {
  margin-top: 50px !important;
}
.text-justify {
  text-align: justify;
}
.scroll-to-top{
  height: 40px;
  width: 40px;
  background: red;
  color: #FFFFFF;
  position: fixed;
  bottom: 75px;
  right: 25px;
  text-align: center;
  padding: 3px 0;
  font-size: 30px;
  font-weight: bold;
}
.scroll-to-top p {
  cursor: pointer;
}
.loader {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  z-index: 1500;
  top: 0;
  left: 0;
  text-align: center;
  padding: 25% 0;
  overflow: hidden;
}
</style>
