<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <div class="container">
      <q-header elevated>
        <div style="text-align:center;" class="q-my-lg">
          <img alt="Quasar logo" v-link="`/`" style="cursor:pointer;" width="350px" src="~assets/logo.png">
        </div>

        <q-tabs v-model="tab">
          <q-tab name="tutorial" push v-link="`/`" label="Tutorial" icon="note"></q-tab>
          <q-tab name="upload" push v-link="`/upload`" label="Upload" icon="attachment"></q-tab>
          <q-tab name="execute" push v-link="`/execute`" label="Execute" icon="play_circle_filled"></q-tab>
        </q-tabs>
      </q-header>

      <q-separator />

      <q-page-container>
        <q-page class="q-py-xl">
          <router-view/>
        </q-page>
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
