<template>
  <div class="class-list" @click="focus">
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index" :class="{'highlight-current':item.uuid == selected.uuid, 'highlight-path':item.uuid == selected.uuid && !current}"
        @click.stop="selected = item">
        <label><strong>{{item.user_key}}</strong> {{item.name}}</label> <v-icon name="chevron-right" style="float:right" v-if="item.children !== 0"/>
      </li>
      <li>
          <input
            v-if="showCreate"
            id="createClass"
            type="text"
            v-model="newClass"
            @keyup="createClass"
            placeholder="Ny klassifikation">
      </li>
    </ul>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import Api from '@/api'

export default {
  name: 'ClassList',
  props: {
    id: Number,
    uuid: String,
    current: Boolean
  },
  data () {
    return {
      selected: {},
      newClass: undefined,
      newName: undefined,
      showCreate: false,
      showRename: false,
      items: Array
    }
  },
  watch: {
    selected (evt) {
      this.$emit('selected', { uuid: evt.uuid, list_id: this.id })
    }
  },
  mounted () {
    switch (this.id) {
      case 0:
        Api.getFacets()
          .then(response => {
            this.items = response.children
          })
        break
      case 1:
        Api.getFacet(this.uuid)
          .then(response => {
            let obj = []
            for (var i = 0; i < response.children.length; i++) {
              if (response.children[i].uuid === this.uuid) {
                obj = response.children[i]
              }
            }
            this.items = obj.children
          })
        break
      default:
        Api.getClass(this.uuid)
          .then(response => {
            if ('children' in response) {
              this.items = response.children
            } else {
              this.items = [response]
            }
          })
    }
    EventBus.$on('create-class', list => {
      if (list.list_id + 1 === this.id) {
        this.showCreate = true
      }
    })
    EventBus.$on('rename-class', list => {
      if (list.list_id === this.id) {
        this.showRename = true
        this.newName = list.title
      }
    })
  },
  methods: {
    focus () {
      this.$emit('focus', { list_id: this.id })
    },
    createClass (evt) {
      if (evt.keyCode === 13) {
        console.log('submit ' + this.newClass)
        var payload = { klasse_navn: this.newClass, klasse_bvn: 'TEST' }
        Api.addClass(this.uuid, payload)
          .then(response => {
            console.log('tilfojet')
            console.log(response)
          })
        this.items.push({ name: payload.klasse_navn, user_key: payload.klasse_bvn, children: 0 })
        this.showCreate = false
      }
    },
    deleteClass () {
      Api.addClass(this.uuid)
        .then(response => {
          console.log('slettet')
          console.log(response)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.class-list {
  width: 300px;
  height: 90vh;
  border-right: 3px solid black;
}
ul {
  list-style-type: none;
  padding-left: 1em;
  padding-right: 1em;
}
li {
  height: 2em;
}
li label {
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
li.highlight-current {
  background: #007bff;
  color: white;
}
li.highlight-path {
  background: #666666 !important;
  color: white;
}
</style>
