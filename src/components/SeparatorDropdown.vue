<template>
  <q-btn style="font-size: 16px;"
        no-caps :color="color || 'cyan'" push align="left"
         :icon="(selectedItem && (selectedItem.icon || selectedItem.parent.icon)) || defaultIcon" class="full-width" :label="(selectedItem && selectedItem.label) || 'Not selected'">
    <q-menu fit>
      <q-list>
        <div :key="item.label" v-for="(item, key, index) in options">
          <q-item class="list-header">
            <q-item-section>
              <q-item-label style="padding-left:0;" header>
                <q-icon :name="item.icon" v-if="item.icon"></q-icon>
                {{item.label}}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-item clickable v-close-popup @click="onItemClick(option)" :key="option.value" v-for="option in item.options">
            <q-item-section avatar v-if="option.icon">
              <q-avatar :icon="option.icon"></q-avatar>
            </q-item-section>
            <q-item-section>{{option.label}}</q-item-section>
          </q-item>
          <q-separator v-if="index < options.length"></q-separator>
        </div>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
  export default {
    name: 'SeparatorDropdown',
    props: {
      options: Array,
      value: String,
      color: String,
      objectValue: Boolean,
      defaultIcon: String
    },
    methods: {
      onItemClick (option) {
        this.$emit('input', this.objectValue ? option : option.value)
      }
    },
    computed: {
      selectedItem () {
        let found = null
        if (this.objectValue) {
          found = this.value
        } else {
          found = this.options.reduce((prev, item) => {
            if (prev) return prev
            let found = item.options.find(x => x.value === this.value)
            if (found) {
              return {
                ...found,
                parent: item
              }
            }
          }, null)
        }
        this.$emit('selected', found)
        return found
      }
    }
  }
</script>

<style>
  .list-header {
    min-height: 26px;
    height: 26px;
  }
  .separator-dropdown {
    width:100%;
  }
  .separator-dropdown button:first-child {
    width:100%;
  }
</style>
