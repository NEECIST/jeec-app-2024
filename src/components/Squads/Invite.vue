<template>
  <div class="invite">
    <div class="squad-info-top">
      <img
        class="squad-image"
        :src="jeec_brain_url + invite.squad_image"
        alt="squad-image"
      />
      <div class="squad-data">
        <p class="squad-name">{{ invite.squad_name }}</p>
        <p class="squad-cry">{{ invite.squad_cry }}</p>
        
      </div>
      <p class="squad-rank">By {{ nameArray[0] }} {{ nameArray[nameArray.length-1] }}</p>
    </div>

      <div class="buttons" v-if="!loading">
        <button @click.stop="accept" class="plus-symbol">⊕</button>
        <button @click.stop="reject" class="minus-symbol">⊖</button>
      </div>

      <v-progress-circular
        v-else
        style="margin-top: 2vh"
        indeterminate
        color="#27ade4"
        :size="60"
        :width="6"
        class="loading-bar"
      ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "Invite",
  props: {
    invite: Object,
  },
  data: function () {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      loading: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

    nameArray() {
      var names = this.invite.sender_name.split(" ");

      if (names.length > 1) return names;
      else return [this.invite.sender_name, ""];
    },
  },
  methods: {
    accept() {
      this.loading = true;
      this.$emit("accept", this.invite.external_id);
    },
    reject() {
      this.loading = true;
      this.$emit("reject", this.invite.external_id);
    },
  },
};
</script>

<style scoped>
.invite {
  margin-bottom: 1vh;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 5vh;
  padding-bottom: 2vh;
}

.squad-info-top {
  display: flex;
  align-items: center;
  justify-content: left;
}

.squad-image {
  height: 13vh;
  width: 13vh;
  border-radius: 50%;
  border: 3px solid #03618C;
  margin-left:5vw;
  margin-right:5vw;
}

.squad-data {
  align-self: center;
  margin-right:5vw;
}

.squad-name {
  margin: 0;
  margin-top: -1vh;
  margin-bottom: -0.9vh;
  font-size: 3.7vh;
  font-weight: 600;
}

.squad-cry {
  margin: 0;
  font-size: 2.5vh;
  font-weight: 500;
}

.squad-rank {
  margin: 0;
  font-size: 2.7vh;
  font-weight: 700;
}

.from {
  text-align: center;
  font-size: 3vh;
  font-weight: 600;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
  align-items: start;
}


.plus-symbol{
  color: #03618C;
  font-weight:10;
  font-size:60px;
}

.minus-symbol{
  color:  #D93046;
  font-weight:10;
  font-size:60px;
}
</style>
