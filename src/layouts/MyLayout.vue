<template>
  <q-layout view="lHr lpR fFf">
    <div class="container">
      <div style="text-align:center;">
        <img alt="Quasar logo" v-link="`/`" style="cursor:pointer;" width="350px" src="~assets/logo.png">
      </div>
      <div class="row">
        <div class="top-menu" style="width:100%;">
          <div class="row">
            <div class="col-4">
              <q-btn class="full-width" push v-link="`/`" label="Tutorial" :color="$route.name === 'tutorial' ? 'green' : 'grey'" size="lg" icon="note"></q-btn>
            </div>
            <div class="col-4">
              <q-btn class="full-width" push v-link="`/upload`" label="Upload" :color="$route.name === 'upload' ? 'green' : 'grey'" size="lg" icon="attachment"></q-btn>
            </div>
            <div class="col-4">
              <q-btn class="full-width" push v-link="`/execute`" label="Execute" :color="$route.name === 'execute' ? 'green' : 'grey'" size="lg" icon="play_circle_filled"/>
            </div>
          </div>
        </div>
      </div>
      <q-page-container>
        <router-view/>
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style>
  .container {
    width: 100%;
    padding-left: 18%;
    padding-right: 18%;
  }
  .top-menu {
    padding-bottom:15px;
  }
  .top-menu .col-4:not(:first-child) {
    padding-left:5px;
  }
</style>
