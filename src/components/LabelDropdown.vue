<template>
  <q-btn
    :color="color || 'cyan'"
    push
    class="label-dropdown"
    align="left"
    no-caps
  >
    <div class="row items-center no-wrap">
      <q-btn style="margin-right:5px;" left dense round flat size="md" v-if="selectedItem && selectedItem.icon" :icon="selectedItem.icon">
        <q-badge v-if="selectedItem.badge" color="red" floating>{{selectedItem.badge}}</q-badge>
        <q-tooltip v-if="selectedItem.tooltip">{{selectedItem.tooltip}}</q-tooltip>
      </q-btn>
      <div class="text-left" v-if="selectedItem">
        <div class="menu-value">{{selectedItem.label}}</div>
        <div class="menu-caption text-white" v-for="caption in selectedItem.captions" :key="caption">{{caption}}</div>
      </div>
      <q-btn style="margin-right:5px;" left dense round flat size="md" v-if="!selectedItem" :icon="defaultIcon">
      </q-btn>
      <div class="text-left" v-if="!selectedItem">
        <div class="menu-value">Not selected</div>
      </div>
    </div>
    <q-menu fit>
      <q-list>
        <q-item v-for="item in options" :key="item.value" clickable v-close-popup @click="onItemClick(item)">
          <q-item-section avatar v-if="item.icon">
            <q-btn style="margin-right:10px;" left dense round flat size="md" v-if="item.icon" :icon="item.icon">
              <q-badge v-if="item.badge" color="red" floating>{{item.badge}}</q-badge>
              <q-tooltip v-if="item.tooltip">{{item.tooltip}}</q-tooltip>
            </q-btn>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{item.label}}</q-item-label>
            <q-item-label caption v-for="caption in item.captions" :key="caption">{{caption}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
  export default {
    name: 'LabelDropdown',
    props: ['value', 'options', 'color', 'defaultIcon'],
    methods: {
      onItemClick (item) {
        this.$emit('input', item.value)
      },
      onMenuClick () {
        this.$emit('click')
      }
    },
    computed: {
      selectedItem () {
        let found = null
        if (this.value) {
          found = this.options.find(x => x.value === this.value)
        }
        this.$emit('selected', found)
        return found
      }
    }
  }
</script>
<style>
  .menu-caption {
    color:lightgray;
    font-size:12px;
  }
  .menu-value {
    font-size:16px;
  }
  .label-dropdown {
    width:100%;
  }
</style>
