<template>
  <div class="member">
    <img :src="member.photo" alt="profile photo" class="profile-photo" />
    <div class="profile-info">
      <p v-if="member.is_captain" class="captain">Captain</p>
      <p class="name">
        {{ nameArray[0] }} <br v-if="$route.name === 'Home'" />
        {{ nameArray[nameArray.length - 1] }}
      </p>
      <p class="level">level {{ member.level }}</p>
    </div>
    <img
      v-if="can_kick && !loading_kick"
      @click.stop="kick"
      src="../assets/icons/recycle-icon.svg"
      alt="kick"
      class="kick"
    />
    <v-progress-circular
      v-else-if="can_kick && loading_kick"
      indeterminate
      color="#27ade4"
      :size="60"
      :width="6"
      class="loading"
    ></v-progress-circular>
  </div>
</template>

<script>
import UserService from "../services/user.service";
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
    };
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    nameArray() {
      var names = this.member.name.split(" ");

      if (names.length > 1) return names;
      else return [this.member.name, ""];
    },

    can_kick () {
      return (
        this.user.username === this.captain_ist_id &&
        this.member.external_id !== this.user.student_external_id
        // this.$route.name === "Squad"
      );
    },
  },
  methods: {
    kick() {
      if (!confirm("Are you sure you want to proceed?")) {
        return;
      }

      this.loading_kick = true;

      UserService.kickMember(this.member.ist_id).then(
        (response) => {
          var squad = response.data.data;
          this.$emit("kick", squad);
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
  display: flex;
  margin-bottom: 1.5vh;
}

.profile-photo {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  align-self: center;
  border: 3px solid #03618C;
  margin-left:5vw;
}

.profile-info {
  align-self: center;
  margin-left: 3vw;
}

.profile-info * {
  margin: 0;
}

.captain {
  font-size: 1.8vh;
  font-weight: 700;
  color: #a1a1a1;
  margin-bottom: -0.5vh;
}

.name {
  font-size: 2.7vh;
  font-weight: 600;
  line-height: 3vh;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
  color: #03618C;

}

.level {
  font-size: 1.8vh;
  font-weight: 700;
  color: #27ade4;
  margin-top: -0.5vh;
}

.kick {
  height: 5vh;
  align-self: center;
  transform: scaleX(-1);
  cursor: pointer;
  position:absolute;
  right:10vw;
}

.loading {
  align-self: center;
  justify-self: flex-end;
  transform: scaleX(-1);
  margin-left: auto;
}

</style>
