<template>
  
  <div class="rank" @click.stop="dialog = true" :class="[{top: index==0},{bottom: index==total-1}]">
    <p class="index" >{{ rank+3 }}#</p>
    <img class="image" :src="img_src" alt="image" />
    <div class="personal-info">
      <p class="name">
        {{ nameArray[0] }} {{ nameArray[nameArray.length - 1] }}
      </p>
      <p v-if="level != null && (level < 18)" class="level">level {{ level }}</p>
      <p v-else-if="level == 18" class="level" style="color: #936928">JEEC Mastery Level I</p>
      <p v-else-if="level == 19" class="level" style="color: #28272866">JEEC Mastery Level II</p>
      <p v-else-if="level == 20" class="level" style="color: #EDD549">JEEC Mastery Level III</p>
      <p v-else-if="level == 21" class="level" style="color: #62BD66">JEEC Mastery Level IV</p>
      <p v-else-if="level == 22" class="level" style="color: #9FD5F4">JEEC Mastery Level V</p>
      <p v-if="cry" class="cry">{{ cry }}</p>
    </div>

    <v-dialog v-model="dialog" v-if="members" :width="width > 1100 ? '40vw' : ''">
      <v-card>
        <div class="dialog-wrapper">
          <div v-for="member in members" :key="member.ist_id" class="member">
            <img :src="member.photo" class="member-photo" />
            <p class="member-name">{{ memberName(member.name) }}</p>
            <v-icon v-if="member.is_captain" style="color: yellow" class="star"
              >mdi-star</v-icon
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Rank",
  data: function () {
    return {
      dialog: false,
      width: window.innerWidth,
    };
  },
  props: {
    rank: Number,
    img_src: String,
    name: String,
    level: Number,
    cry: String,
    members: Array,
    total: Number,
    index:Number
  },
  computed: {
    color() {
      if (this.rank == 1) return "#FFC02E";
      else if (this.rank == 2) return "#BCBCBC";
      else if (this.rank == 3) return "#DC8A26";
      else return "black";
    },

    nameArray() {
      var names = this.name.split(" ");

      if (names.length > 1) return names;
      else return [this.name, ""];
    },
  },
  methods: {
    memberName(name) {
      var names = name.split(" ");

      if (names.length > 1) return names[0] + " " + names[names.length - 1];
      else return this.name, "";
    },
    resize() {
      this.width = window.innerWidth;
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  created() {
    window.addEventListener("resize", this.resize);
  },
};
</script>

<style scoped>
.rank {
  background-color: #1A9CD826;
  display: flex;
  align-items: center;
  width:90vw;
  margin-left:5vw;
  border-top:2px solid #1A9CD8B2;
  border-bottom:2px solid #1A9CD8B2;
}

.index {
  margin: 0;
  text-align: right;
  font-family: Montserrat;
  font-size: 5vw;
  font-weight: 500;
  margin-left:3vw;
  margin-right:2vw;
}

.top{
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  border-top: 2px solid transparent;
  margin-top:3vh;
}

.bottom{
  border-bottom-right-radius: 50px;
  border-bottom-left-radius: 50px;
  border-bottom:2px solid transparent;
}

.image {
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  border:2px solid #03618C
}

.personal-info p {
  margin: 0;
  margin-left: 3vw;
}

.name {
  font-size: 3.5vh;
  font-weight: 500;
  line-height: 3vh;
}

.cry {
  color: #848484;
  font-size: 2.5vh;
  font-style: italic;
  font-weight: 500;
  line-height: 3vh;
}

.level {
  font-size: 2.1vh;
  font-weight: 700;
  line-height: 2.8vh;
  color: #27ade4;
}

.dialog-wrapper {
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 2vw;
  padding-right: 2vw;
}

.member {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 1vh;
  margin-bottom: 1vh;
}

.member-photo {
  height: 9vh;
  width: 9vh;
  border-radius: 50%;
}

.member-name {
  margin: 0;
  font-size: 3vh;
  font-weight: 600;
  margin-left: 2vw;
  width: 51vw;
}

.star {
  position: absolute;
  right: 3vw;
}

</style>
