<template>
  <div class="menu">
    <img class="background-gradient"/>
    <div class="menu-top">
      <router-link :to="{ name: 'Profile' }">
        <img
          alt="profile photo"
          :src="currentUser.photo"
          style="width: 12vh; height: 12vh; border-radius: 50%"
          class="hover-effect-img"
        />
      </router-link>  

      <div class="profile-info">
        <div class="name hover-effect-img">
          <router-link :to="{ name: 'Profile' }">
            <p>{{ nameArray[0] }}</p>
            <p>{{ nameArray[nameArray.length - 1] }}</p>
          </router-link>
        </div>
        <div class="level">
          <p>
            <b>Level {{ currentUser.level.data.value }}</b>
          </p>
        </div>
      </div>
    </div>
    <div class="menu-middle">
      <div 
          v-for="item in menu_items"
          :key="item.name"
          class="nav-row"
          v-bind:class="
            (
              page === 'Company' || page === 'Chat'
                ? item.page === 'Companies'
                : page === item.page
            )
              ? 'active-item'
              : 'inactive-item'
          "
          @click.stop="redirect(item.page)"
      >
        <div class="menu-items" style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
          <img style="width: 12.5vh; padding-left: 0vw;" :src="item.src" />
          <p class="menu-names hover-effect">{{ item.name }}</p>
        </div>
      </div>
      <!-- <table class="menu-items">
        <tr
          v-for="item in menu_items"
          :key="item.name"
          class="nav-row"
          v-bind:class="
            (
              page === 'Company' || page === 'Chat'
                ? item.page === 'Companies'
                : page === item.page
            )
              ? 'active-item'
              : 'inactive-item'
          "
          @click.stop="redirect(item.page)"
        >
          <td>
            <img :src="item.src" />
          </td>
          <td class="menu-names">{{ item.name }}</td>
        </tr>
      </table> -->
    </div>
    <div width="auto" @click.stop="logout" class="menu-bottom">
      <p class="logout hover-effect">Log Out</p>
      <img class="hover-effect-img" width="30vw" src="../assets/icons/logout.svg" style="margin-right: 5vw;"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarMenu",
  data: function () {
    return {
      page: this.$route.name,
      display_menu: false,
      menu_items: [
        {
          name: "Prizes",
          src: require("../assets/icons/prize.svg"),
          page: "Prizes",
        },
        {
          name: "Rankings",
          src: require("../assets/icons/rankings.svg"),
          page: "Rankings",
        },
        {
          name: "Rules & Info",
          src: require("../assets/icons/new_warning.svg"),
          page: "Rules",
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
    redirect(target) {
      if (target !== this.page) this.$router.push({ name: target });
    },
  },
  watch: {
    //or $route(to, from)
    $route(to) {
      this.page = to.name;
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    nameArray() {
      var names = this.$store.state.auth.user.name.split(" ");

      if (names.length > 1) return names;
      else return [this.$store.state.auth.user.name, ""];
    },
  },
};
</script>

<style scoped>
.menu {
  position: relative;
  height: 100%;
  z-index: 5;
}

.background-gradient{
  position: absolute;
  z-index: -5;
  width: 55vh;
  height: 60vh;
  top: -30vh;
  left: -20vh;
  border-radius: 90% 70% / 60% 90%;

  background: linear-gradient(128.55deg, rgba(26, 156, 216, 0.65) -0.1%, rgba(217, 208, 4, 0.65) 88.02%);
  transform: rotate(-87.05deg);
}

.menu-top {
  display: flex;
  flex-direction: row;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 3vh;
  padding-bottom: 3vh;
}

.menu-top img {
  align-self: center;
  border: solid #FFFCF8;
}

.profile-info {
  align-self: center;
  align-items: center;
  padding-left: 5vh;
}

.name,
.level {
  text-align: left;
}

.name p {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 3vh;
  line-height: 3vh;
  color: #03618C;
}

.level p {
  padding-top: 0.5vh;
  margin: 0;
  font-size: 3vh;
  font-weight: 700;
  color: #FFFCF8;
}

.menu-middle {
  padding-left: 2vh;
  padding-right: 2vh;
  color: black;
  height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-evenly;
}

.nav-row {
  height: 12.5vh;
}

.active-item > * {
  filter: invert(70%) sepia(55%) saturate(3669%) hue-rotate(164deg)
    brightness(93%) contrast(91%);
}

.inactive-item > * {
  filter: invert(1);
}

.menu-names {
  padding-left: 4vw;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 4vh;
  line-height: 6vh;
}

.menu-bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding-bottom: 2vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.logout{
  padding-right: 3vw;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 3vh;
  line-height: 3vh;
  display: flex;
  align-items: center;
  text-align: center;
}

.hover-effect {
  transition: all 0.3s ease; /* this makes the change in style smooth */
  cursor: pointer; /* this changes the cursor to a hand when hovering over the text */
}

.hover-effect:hover {
  transform: scale(1.2); /* this enlarges the text, giving it a "pop" effect */
  color: whitesmoke; /* changes the text color */
}

.hover-effect-img {
  transition: all 0.3s ease; /* this makes the change in style smooth */
  cursor: pointer; /* this changes the cursor to a hand when hovering over the text */
}
</style>
