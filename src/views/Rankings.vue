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

      <Rank :other_rankingdata="students_daily"
      :user_ranking="userdata_individual.ranking_daily"
      :user_points="userdata_individual.daily_points">
      </Rank>

      <Rank :other_rankingdata="students_weekly" 
      :user_ranking="userdata_individual.ranking_weekly" 
      :user_points="userdata_individual.total_points">
      </Rank>

      <Rank :other_rankingdata="squads_daily" 
      :user_ranking="userdata_squad.ranking_daily" 
      :user_points="userdata_squad.daily_points">
      </Rank>

      <Rank :other_rankingdata="squads_weekly" 
      :user_ranking="userdata_squad.ranking_weekly" 
      :user_points="userdata_squad.total_points">
      </Rank>

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
      students_weekly: [],
      students_daily: [],
      userdata_individual: [],
      userdata_squad: [],
      squads_weekly: [],
      squads_daily: [],
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
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

        this.students_weekly = this.rankingdata.individual_top10_weekly;

        this.students_daily = this.rankingdata.individual_top10_daily;

        this.userdata_individual = this.rankingdata.individual_ranking;

        this.squads_weekly = this.rankingdata.squad_top10_weekly;

        this.squads_daily = this.rankingdata.squad_top10_daily;

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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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




</style>