<template>
  <div class="squad-invite radient-border-passthrough">
    <h3>You've been invited to</h3>

    <div class="invite">
      <div class="squad-header">
        <div class="squad-image radient-border-passthrough">
          <img :src="jeec_brain_url + invite.squad_image" alt="squad-image" />
        </div>
        <div class="squad-info">
          <p>Squad {{ invite.squad_name }}</p>
          <p>Motto {{ invite.squad_cry }}</p>
        </div>
      </div>
    </div>

    <div v-if="!loading" class="join-decline">
      <button class="join" @click.stop="accept">Join</button>
      <button class="decline" @click.stop="reject">Decline</button>
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
  mounted() {
    console.log(this.invite);
  },
};
</script>

<style scoped>
.squad-invite {
  margin: 0 auto;
  margin-top: 2rem;
  max-width: 600px;
  padding: 1rem 3ch;

  --border-radius: 35px;
}

.squad-invite::before {
  content: "";
}

.squad-invite h3 {
  font-family: "Lexend Exa";
  letter-spacing: 3px;
  text-align: center;
  font-size: clamp(1.1rem, 5vw, 1.4rem);
  padding: 0 2ch;
}

.invite {
  display: flex;
  flex-direction: column;
}
.squad-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding-top: 1.4rem;
}

.squad-image {
  max-width: 100px;
  min-width: 60px;
  height: 100%;
  aspect-ratio: 1;
  
  --border-radius: 50%;
}

.squad-image::before {
  content: "";
}

.squad-image img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

.squad-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.squad-info p {
  font-family: "Lexend Exa";
  letter-spacing: 3px;
}

.squad-info p:first-child {
  font-weight: 600;
  font-size: clamp(1rem, 5vw, 1.3rem);
}

.squad-info p:last-child {
  font-size: clamp(0.8rem, 5vw, 1rem);
}

.squad-sender {
  text-align: center;
  font-family: "Lexend Exa";
  letter-spacing: 3px;
  padding-top: 0.5rem;
}

.join-decline {
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 3rem;
}

.join-decline button {
  width: 110px;
  padding: 0.5rem 0;
  border: none;
  border-radius: 50px;
  font-size: 1.3rem;
  cursor: pointer;
}

.join-decline button.join {
  background: linear-gradient(165deg, #605ED0 -100%, #4CC9F0 20%, #7209B7 130%);
}

.join-decline button.decline {
  background: radial-gradient(ellipse 150% 150% at 15% 0%, rgba(76, 202, 240, 0.14) 0%, rgba(76, 202, 240, 0.08) 70%, rgba(76, 202, 240, 0) 100%);
}
</style>