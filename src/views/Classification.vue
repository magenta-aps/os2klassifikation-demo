<template>
  <div>
    <class-actions
    @create-class="createClass"
    @rename-class="renameClass"
    />
    <!-- {{chain}} -->
    <div class="c-container">
      <div class="c-row">
        <class-list
          v-for="(i, index) in chain"
          :key="index"
          :id="index"
          :uuid="i.uuid"
          @selected="selected"
          @focus="onFocus"
          :current="(chain.length === index+2)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import ClassList from '@/components/ClassList'
import ClassActions from '@/components/ClassActions'

export default {
  name: 'classification',
  components: {
    ClassList,
    ClassActions
  },
  data () {
    return {
      chain: [{}]
    }
  },
  methods: {
    selected (evt) {
      if (this.chain.length - 1 === evt.list_id) {
        this.chain.push(evt)
      }
    },
    onFocus (evt) {
      this.chain = this.chain.splice(0, evt.list_id + 1)
    },
    createClass () {
      EventBus.$emit('create-class', this.chain[this.chain.length - 1])
    },
    renameClass () {
      EventBus.$emit('rename-class', this.chain[this.chain.length - 1])
    }
  }
}
</script>

<style scoped>
.c-container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  overflow-y: scroll;
}
.c-row {
  display: inline-flex;
  flex-wrap: nowrap;
  margin-right: -15px;
  margin-left: -15px;
}
</style>
