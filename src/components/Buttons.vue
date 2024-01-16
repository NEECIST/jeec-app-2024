<template>
  <div class="buttons">
    <v-btn
      tile
      class="button white--text"
      v-for="name in Object.keys(names)"
      :key="name"
      :color="names[name] ? '#26A2D5' : '#6CBFE0'"
      @click="click(name)"
      >{{ (n_invites && name === 'invites') ? (name + ' (' + n_invites + ')') : name  }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Buttons",
  props: {
    names: Object,
    n_invites: {
      default: null,
      type: Number,
    },
  },
  data: function () {
    return {};
  },
  methods: {
    resize() {},
    click(name) {
      this.$emit("_click", name);
    },
  },
 
  mounted() {

    this.resize();
  },
};
</script>

<style scoped>
.buttons {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 8vh;
  background-color: #e6e6e6;
  z-index: 2;
}

.button {
  flex: 1;
  height: 100% !important;
  width: 100% !important;
  margin: 0vh;
  font-size: 4.7vw !important;
  white-space: pre !important;
  text-align: center !important;
}


</style>
