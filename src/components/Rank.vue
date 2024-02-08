<template>
  <div v-if="!loading_students && !loading_squads && !loading_daily">
      <div v-show="personal">
        <div class="podium">
          <div class="stand_2" v-if="students.length>1">
            <img :src="students[1].photo" class="podium-img second">               
            <p class="podium-text">{{names[1]}}</p>
            <div class="pilar_2">
              <!-- <img :src="pilar_2" class="ranking_pilar"> -->
              <span class="number_2">2</span><sup class="super_2">nd</sup>
            </div>
          </div>
          <div class="stand_1">
            <img :src="students[0].photo" class="podium-img first">
            <p class="podium-text">{{names[0]}}</p>
            <div class="pilar_1">
              <!-- <img :src="pilar_1" class="ranking_pilar"> -->
              <span class="number_1">1</span><sup class="super_1">st</sup>
            </div>
          </div>
          <div class="stand_3" v-if="students.length>2">
            <img :src="students[2].photo" class="podium-img third">
            <p class="podium-text">{{names[2]}}</p>
            <div class="pilar_3">
              <!-- <img :src="pilar_3" class="ranking_pilar"> -->
              <span class="number_3">3</span><sup class="super_3">rd</sup>
            </div>
          </div>
        </div>
        
        <div v-if="!show" class="top_10">
          <div class="box">
            <div class="student_ranking_number">
              <p>999th</p>
            </div>
          </div>

          <div class="student_name">
             <p>You</p> 
          </div>

          <div class="student_xp">
            <p>{{ user.total_points }} xp</p>
          </div>
        </div>
   
        <!-- <Rank
            v-for="(student, index) in other_students"
            v-show="personal"
            :key="student.ist_id"
            :name="student.name"
            :rank="rank(index, students)"
            :img_src="student.photo"
            :total = "other_students.length"
            :index="index"
          /> -->

        <div v-if="show">
          <div v-for="index in 7" :key="index">
            <div class="top_10">
              <div class="box">
                <div class="student_ranking_number">
                  <p>{{ index + 3 }}th</p>
                </div>
              </div>
              

              <div class="student_name">
                <p>{{ names[index + 2] }}</p>
                <!-- <p>FUlanoi</p> -->
              </div>

              <div class="student_xp">
                <p>0 xp</p>
              </div>
            </div>
          </div>

        </div>
          
        <div class="dropdown">
          <button @click="show = !show"><img :src="arrow" class="arrow"></button>
        </div>

      </div>
  </div>

    <div v-else class="loading">
      <v-progress-circular
        indeterminate
        color="#27ade4"
        :size="100"
        :width="10"
        class="loading-bar"
      ></v-progress-circular>
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
    students: Object,
    names: Object,
    
  },
  computed: {

  },
  methods: {

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
