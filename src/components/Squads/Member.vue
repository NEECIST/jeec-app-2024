<template>
  <div class="member">
    <div class="member-image radient-border-passthrough">
      <img :src="member.photo" alt="profile photo" class="profile-photo" />
    </div>
    <div class="member-info">
      <p v-if="member.is_captain" class="captain">Captain</p>
      <p class="name">{{ member.name }}</p>
      <p class="username">{{ member.username }}</p>
    </div>
    <button class="kick-member" v-if="can_kick && !loading_kick && !member.is_captain"
      @click.stop="kick">
      <div></div>
      <div></div>
    </button>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia';

export default {
  name: "Member",
  props: {
    member: Object,
    captain_ist_id: String,
  },
  data: function () {
    return {
      loading_kick: false,
      kick_img: require("@/assets/icons/recycle-icon.svg"),
    };
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    nameArray() {
      var names = this.member.username;

      if (names.length > 1) return names;
      else return [this.member.username, ""];
    },

    can_kick () {
      return (
        this.user.username === this.captain_ist_id &&
        this.member.external_id !== this.user.student_external_id
      );
    },
  },
  methods: {
    kick() {
      if (!confirm("Are you sure you want to proceed?")) {
        return;
      }

      this.loading_kick = true;

      UserService.kickMember(this.member.username).then(
        (response) => {
          var squad = response.data.data;
          // this.$emit("kick", squad);
        },
        (error) => {
          console.log(error);
          this.loading_kick = false;
        }
      );
    },
  },
};
</script>

<style scoped>
.member {
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  margin-top: 0.6rem;
  padding-left: 10%;
  gap: 1rem;
  position: relative;
}

.member-image {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;

  --border-width: 1.5px;
}

.member-image::before {
  content: "";
}

.member-image img {
  height: 100%;
  width: 100%;
}

.member-info {
  display: flex;
  flex-direction: column;
}

.member-info p {
  font-family: "Lexend Exa";
}

.member-info .captain {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
}

.member-info .name {
  font-size: 1.4rem;
  /* display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden; */
}

.member-info .username {
  font-size: 0.9rem;
  color: #1A9CD8;
}

.kick-member {
  position: absolute;
  left: 4%;
  top: 50%;
  translate: -50% -50%;
  height: fit-content;
  cursor: pointer;
  background: none;
  border: none;
  height: 30px;
  width: 30px;
}

.kick-member:hover {
  scale: 1.1;
}

.kick-member div {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  height: 5px;
  width: 24px;
  border-radius: 10px;
  rotate: 45deg;
  transform-origin: 50% 50%;
  background-color: #F72585;
  box-shadow: 0 0 3px #F72585;
}

.kick-member div:last-child {
  rotate: -45deg;
}
</style>
