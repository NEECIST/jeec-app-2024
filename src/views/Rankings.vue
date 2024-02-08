<template>
  <!-- <div class="rankings">

    <div class="select">
      <div class="solo">
        SOLO
      </div>
      <div class="squad">
        SQUAD
      </div> 
    </div>

  </div> -->
  <div class="rankings">

      <!-- <div class="btns">
       <button class="personal-btn unselected" :class="{selected: personal}" @click="Personal">Personal</button>
       <button class="squad-btn unselected" :class="{selected: squad}" @click="Squad">Squad</button>
      </div>  -->

    <div style="height: 8vh"></div>

    <div>
      <div v-show="personal">
        <div class="podium">
          <div class="stand_2" v-if="students.length>1">
            <img :src="ProcessImg(students[1].photo)" class="podium-img second">               
            <p class="podium-text">{{students[1].name}}</p>
            <div class="pilar_2">
              <span class="number_2">2</span><sup class="super_2">nd</sup>
            </div>
          </div>
          <div class="stand_1" v-if="students.length>0">
            <img :src="ProcessImg(students[0].photo)" class="podium-img first">
            <p class="podium-text">{{students[0].name}}</p>
            <div class="pilar_1">
              <span class="number_1">1</span><sup class="super_1">st</sup>
            </div>
          </div>
          <div class="stand_3" v-if="students.length>2">
            <img :src="ProcessImg(students[2].photo)" class="podium-img third">
            <p class="podium-text">{{students[2].name}}</p>
            <div class="pilar_3">
              <span class="number_3">3</span><sup class="super_3">rd</sup>
            </div>
          </div>
        </div>
        
        <div v-if="!show" class="top_10">
          <div class="box">
            <div class="student_ranking_number">
              <p>{{ userdata.ranking_weekly }}th</p>
            </div>
          </div>

          <div class="student_name">
             <p>You</p> 
          </div>

          <div class="student_xp">
            <p>{{ userdata.total_points }} xp</p>
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
                <p>{{ students[index + 2].name }}</p>
              </div>

              <div class="student_xp">
                <p>{{ students[index + 2].total_points }} xp</p>
              </div>
            </div>
          </div>

        </div>
          
        <div class="dropdown">
          <button @click="show = !show"><img :src="arrow" class="arrow"></button>
        </div>

      </div>

        <!-- <div v-show="squad">
          <div class="podium">
            <div class="stand" v-if="squads.length>1">
              <img :src="jeec_brain_url + squads[1].image" class="podium-img second">                
              <p class="podium-text">{{squads[1].name}}</p>
              <div class="second pilar">
                <span>2</span><sup class="super">nd</sup>
              </div>
            </div>
            <div class="stand" v-if="squads.length>0">
              <img :src="jeec_brain_url + squads[0].image" class="podium-img first">
              <p class="podium-text">{{squads[0].name}}</p>
              <div class="first pilar">
                <span>1</span><sup class="super">st</sup>
              </div>
            </div>
            <div class="stand" v-if="squads.length>2">
              <img :src="jeec_brain_url + squads[2].image" class="podium-img third">
              <p class="podium-text">{{squads[2].name}}</p>
              <div class="third pilar">
                <span>3</span><sup class="super">rd</sup>
              </div>
            </div> 
          </div>
            <Rank
              v-for="(squad, index) in other_squads"
              v-show="squad"
              :key="squad.name"
              :name="squad.name"
              :cry="squad.cry"
              :rank="rank(index, squads)"
              :img_src="jeec_brain_url + squad.image"
              :members="squad.members.data"
              :total = "other_squads.length"
              :index="index"
            />
        </div> -->
  </div>
    <!-- <div v-else class="loading">
      <v-progress-circular
        indeterminate
        color="#27ade4"
        :size="100"
        :width="10"
        class="loading-bar"
      ></v-progress-circular>
    </div> -->
  </div>
</template>

<script>
import Rank from "@/components/Rank.vue";
import UserService from "../services/user.service";
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia';
import arrow from "../assets/chevron-compact-down.svg"


export default {
  name: "Rankings",
  components: {
    Rank,
  },
  computed: {
      ...mapState(useUserStore, ['user']),
  },

  data: function () {
    return {
      button: "personal",
      students: [],
      userdata: [],
      squads: [],
      daily_squads: [],
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      loading_students: true,
      loading_squads: true,
      loading_daily: true,
      personal:true,
      squad:false,
      other_students:[],
      other_squads:[],
      names:[],
      arrow: arrow,
      show:false,

      rankingdata: [],
    };
  },
  methods: {
    nameArray() {
      
    },
    Personal(){
      this.personal=true
      this.squad=false
    },
    Squad(){
      this.personal=false
      this.squad=true
    },
    ProcessImg(image) {
      let photo = "data:image/png;base64," + image;
      return photo;
    }
    
  },
  created() {
    console.log(this.user);
    if (!this.user) {
      this.$router.push("/");
    }

    UserService.getAllRanking().then(
      (response) => {
        this.rankingdata = response.data;
        console.log(this.rankingdata); 

        this.students = this.rankingdata.individual_top10_weekly;
        console.log(this.students);

        this.userdata = this.rankingdata.individual_ranking;

        

        // for(let i=0;i<this.students.length;i++){
        //   if (this.students[i].username == this.user.username){
        //     this.students[i].name = "you";
        //   }
        // }
      },
    );


    
  },

};
</script>

<style scoped>

:root {
  --Gold: #C1A875;
  --Silver: #CDC9C2;
  --Bronze: #C9705C;
  --grad_1: #605ED0;
  --grad_2: #4CC9F0;
  --grad_3: #7209B7;
}

.arrow{
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}

.arrow{
  transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
}

.top_10{
  width: 85vw;
  height: 4.5vh;
  display: flex;
  margin-left: 6vw;
  font-family: "Lexend Exa";
  color: white;
  position: relative;
  background-color: #4CC9F0;
}

.student_name{
  display: flex;
  flex: 1;
  justify-content: start;
  align-items: center;
  text-align: center;
  font-family: "Lexend Exa";
  font-size: 1.7vh;
  font-weight: 600;
  letter-spacing: 0.4vw;
}

.student_ranking_number{
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 6vw;
  height: 6vw;
  font-size: 2.1vw;
  background-color: #6D3F0B;
  border-radius: 100%;
}

.student_xp{
  display: flex;
  justify-content: start;
  align-items: center;
  text-align: center;
  font-family: "Lexend Exa";
  font-size: 1.3vh;
  font-weight: 600;
  width: 20vw;
}

.dropdown{
  width: 40vw;
  height: 3.5vh;
  display: flex;
  margin-left: 28.5vw;
  color: white;
  position: relative;
  background-color: #4CC9F0;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 10vw 10vw;
}


.box {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 15vw;
  margin-left: 3vw;
}

.number_1 {
  font-family: "Russo One";
  font-size: 7vh;
  background: var(--Gold, linear-gradient(77deg, #C1A875 11.6%, #d6ad3c 25.31%, #b1982b 48.06%, #f7a503 55.72%, #f7a503 77.23%, #ffc400 85.34%, #ffc400 91.31%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.number_2 {
  text-align: center;
  font-family: "Russo One";
  font-size: 5.5vh;
  font-style: normal;
  font-weight: 400;
  line-height: 45px; /* 93.75% */
  background: var(--Silver, linear-gradient(77deg, #576265 11.6%, #9EA1A1 25.31%, #848B8A 48.06%, #576265 55.72%, #576265 77.23%, #757A7B 85.34%, #576265 91.31%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.number_3 {
  text-align: center;
  font-family: "Russo One";
  font-size: 4vh;
  font-style: normal;
  font-weight: 400;
  line-height: 45px; /* 93.75% */
  background: linear-gradient(77deg, #db8553 11.6%, #da781d 25.31%, #ad4311 48.06%, #db8553 55.72%, #db8553 77.23%, #C9705C 85.34%, #C9705C 91.31%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.super_1{
  text-align: center;
  font-family: "Russo One";
  font-size: 2vh;
  font-style: normal;
  font-weight: 400;
  line-height: 45px; /* 93.75% */
  top: -0.9em;
  background: var(--Gold, linear-gradient(77deg, #576265 11.6%, #9EA1A1 25.31%, #848B8A 48.06%, #576265 55.72%, #576265 77.23%, #757A7B 85.34%, #576265 91.31%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.super_2{
  text-align: center;
  font-family: "Russo One";
  font-size: 2vh;
  font-style: normal;
  font-weight: 400;
  line-height: 45px; /* 93.75% */
  top: -0.9em;
  background: var(--Silver, linear-gradient(77deg, #576265 11.6%, #9EA1A1 25.31%, #848B8A 48.06%, #576265 55.72%, #576265 77.23%, #757A7B 85.34%, #576265 91.31%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.super_3{
  text-align: center;
  font-family: "Russo One";
  font-size: 2vh;
  font-style: normal;
  font-weight: 400;
  line-height: 45px; /* 93.75% */
  top: -0.9em;
  background: linear-gradient(77deg, #db8553 11.6%, #da781d 25.31%, #ad4311 48.06%, #db8553 55.72%, #db8553 77.23%, #C9705C 85.34%, #C9705C 91.31%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


.podium{
  width: 85vw;
  margin-left: 6vw;
  display:flex;
  justify-content: space-between;
  align-items: end;
}

.pilar_1{
  text-align: center;
  color:white;
  vertical-align: middle;
  width:27vw;
  font-size: 7vh;
}
.pilar_2{
  text-align: center;
  color:white;
  vertical-align: middle;
  width:27vw;
  font-size: 6vh;
}

.pilar_3{
  text-align: center;
  color:white;
  vertical-align: middle;
  width:27vw;
  font-size: 4vh;
}


.podium-text{
  color: var(--Greyish-White, #E7E7E7);
  text-align: center;
  font-family: "Lexend Exa";
  font-size: 1.7vh;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.podium-img{
  position:relative;
  margin-left:auto;
  margin-right:auto;
  display:block;
  width: 8vh;
  height: 8vh;
  border-radius: 50%;
  border-width: 20px;
  background-color: white;
}

.stand_1{
  position: relative;
  width:27vw;
  height: 25vh;
  background-color: #4CC9F0;

  background-position: bottom;
}
.stand_2{
  position: relative;
  width:27vw;
  height: 21vh;
  background-color: #4CC9F0;

  background-position: bottom;
}
.stand_3{
  position: relative;
  width:27vw;
  height: 18vh;
  background-color: #4CC9F0;

  background-position: bottom;
}

.selected{
  background-color: #03618C !important;
}

.btns{
  margin-left:25vw;
}

.personal-btn{
  background-color: #1A9CD8;
  color:white;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  margin-right:5px;
  width:25vw;
  height:30px;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
}
.squad-btn{
  background-color: #1A9CD8;
  color:white;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  width:25vw;
  height:30px;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
}


.rank-wrapper {
  height: 82vh;
  overflow-y: auto;
}

.big-title {
  display: flex;
  justify-content: space-between;
}

.big-title p {
  font-size: 5vh;
  font-weight: 600;
  width: 100%;
  text-align: center;
}

.loading {
  text-align: center;
  margin-top: 35vh;
}
</style>