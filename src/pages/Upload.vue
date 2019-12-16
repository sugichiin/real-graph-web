<template>
  <q-page padding>
    <!-- content -->
    <transition appear enter-active-class="animated fadeIn" leave-activie-class="animated fadeOut">
      <div class="row">
        <div class="col-9">
          <label class="text-h5">
            File Selection
            <q-input @input="val => { file = val[0] }" class="full-width" type="file" filled></q-input>
          </label>
          <label class="text-h5">
            Sample
            <div class="row">
              <div class="col-6">
                <q-input filled style="margin-right:10px;" rows="20" readonly type="textarea" :value="sample"></q-input>
              </div>
              <div class="col-6">
                <q-input filled style="margin-left:10px;" rows="20" readonly type="textarea" :value="example"></q-input>
              </div>
            </div>
          </label>
        </div>
        <div class="col-3" style="padding-left:15px; padding-top:35px;">
          <q-btn @click="upload" push class="full-width" style="margin-bottom:10px;" no-caps color="green"
                 icon="play_arrow">Generate
          </q-btn>
          <a href="/sample/sample.txt" download>
            <q-btn push class="full-width" no-caps color="grey" icon="get_app">Download Sample</q-btn>
          </a>
        </div>
      </div>
    </transition>
    <q-inner-loading :showing="state !== 'ready' && state !== 'success'">
      <q-circular-progress
        show-value
        indeterminate
        size="100px"
        color="teal"
        :thickness="0.22"
        trak-color="grey-3"
        class="q-ma-md">
        {{state === 'uploading' ? 'Uploading...' : 'Get ready for device...'}}
      </q-circular-progress>
    </q-inner-loading>
  </q-page>
</template>

<script>
  export default {
    // name: 'PageName',
    data () {
      return {
        file: null,
        sample: '%%%%%%%% Please note the following %%%%%%%\n' +
          '# a) Graph must be represented as edge-list\n' +
          '#     (e.g. SrcNodeID   DestNodeID)\n' +
          '# b) Each NodeID must be in 32bit integer\n' +
          '#     (e.g. 0 <= ID < 2147483648)\n' +
          '# c) Duplicated edges are not allowed\n' +
          '# d) SrcNodeID and DestNodeID\n' +
          '#     are seperated by a white space\n' +
          '#     (e.g. blank or tab)\n' +
          '# e) \'#\' and \'%\' indicates a comment line\n' +
          '\n',
        example: '%%%%%%% Example of the input graph %%%%%%%\n' +
          '1           6548\n' +
          '1           15409\n' +
          '6548        57031\n' +
          '15409       131002\n' +
          '2           17794\n' +
          '2           25202\n' +
          '2           53625\n' +
          '2           54582',
        state: 'ready'
      }
    },
    methods: {
      upload () {
        if (this.file === null) {
          alert('Please choose your file to upload.')
          return
        }
        const formData = new FormData()
        formData.append('userFile', this.file)
        formData.append('checks', 'all')
        this.state = 'uploading'
        this.$http.post('/upload2', formData).then((res) => {
          this.state = 'ready'
          alert('Dataset has been successfully uploaded.')
          this.file = null
          document.querySelector('input[type="file"]').value = ''
        })
      }
    }
  }
</script>
