<template>
  <div >
    <div  class="invitation-card">
      <div class="card-content">
        <img class="squad-image"
          :src="jeec_brain_url + invite.squad_image"
          alt="squad-image"
        />
        <div class="text-section">
          <p class="invitation-text">You've been invited to</p>
          <h3 class="squad-name">{{ invite.squad_name }}</h3>
          <p lass="motto">{{ invite.squad_cry }}</p>
          
        </div>
        <p>By {{ nameArray[0] }} {{ nameArray[nameArray.length-1] }}</p>
      

        <div v-if="!loading" class="button-section">
          <button @click.stop="accept" class="join-button">Join</button>
          <button @click.stop="reject" class="decline-button">Decline</button>
        </div>
        
        <!-- <v-progress-circular v-else
        style="margin-top: 2vh"
        indeterminate
        color="#27ade4"
        :size="60"
        :width="6"
        class="loading-bar"
        ></v-progress-circular> -->
      </div>
    </div>
     
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

.invitation-card {
  background: #2c3e50;
  border-radius: 20px;
  padding: 2em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
  color: white;
  font-family: 'Arial', sans-serif;
  width: 360px;
}

.invitation-card::before {
  content: '';
  position: absolute;
  top: -2px; right: -2px; bottom: -2px; left: -2px;
  z-index: -1;
  background: #00f;
  border-radius: inherit;
  background-image: linear-gradient(45deg, #6e8efb, #a777e3);
  animation: glowing-border 2s infinite;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@keyframes glowing-border {
  0% { box-shadow: 0 0 5px #6e8efb; }
  50% { box-shadow: 0 0 20px #a777e3; }
  100% { box-shadow: 0 0 5px #6e8efb; }
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #333;
  margin-bottom: 1rem;
}

.text-section {
  text-align: center;
  display: flex;
  flex-direction: column;
}

.invitation-text {
  margin: 0;
}

.squad-name {
  margin: 0.5rem 0;
}

.motto {
  margin: 0;
  font-style: italic;
}

.button-section {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.join-button, .decline-button {
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
}

.join-button {
  background: #3498db;
}

.join-button:hover {
  background: #2980b9;
}

.decline-button {
  background: #e74c3c;
}

.decline-button:hover {
  background: #c0392b;
}

.squad-image {
  border-radius: 50%;
  width: 60px;
  height: 60px; 
  margin-right: 1rem; 
}


</style>