<template>
  <div>
    {{ user.name }}
    {{ user }}
    {{ next_activity }}
    <div class="top">
      
      <div v-if="next_activity!=null" class="main-title">
        <h1>
            UP NEXT
        </h1>
        <br>
        <br>
        <div class="top-container">
          <div class="top-text">
            <p>
              {{ next_activity.name }}
            </p>
            <p>
              {{ next_activity.start_time }} - {{ next_activity.end_time }}
            </p>
            <br>
            <p>
              {{ next_activity.activity_type }}
            </p>
          </div>
          <div class="image-container">
            <div v-for="image in next_activity.images" :key="image" >
              <img :src="jeec_brain_url + image" class="activity-img" :class="{size2:next_activity.images.length==2,size3:next_activity.images.length==3,size4:next_activity.images.length>3}">
            </div>
          </div>
          
        </div>
      </div>
      <p v-else class="no-more-activities">
        There are no more activities scheduled
      </p>
    </div>

    <div class="middle">
      {{ prizes }}
      <div class="mid-component">
        <h1>TODAY'S PRIZE</h1>
        
        <div>
          <p>SOLO</p>
          <!-- <div
            class="reward-img"
            :style="'background-image:' + 'url(' + _today_reward + ')'"
          ></div> -->
          <div class="reward-img">{{prizes.img_solo_daily_prize}}</div>

          <div v-if="solo_ranking!=null">
            <p v-if="prizes.solo_ranking==1">
              1st place
            </p>
            <p v-else-if="prizes.solo_ranking==2">
              2nd place
            </p>
            <p v-else-if="prizes.solo_ranking==3">
              3rd place
            </p>
            <p v-else>
              {{prizes.solo_ranking}}th place
            </p>
          </div>
          <p v-else>
            You are not a player!
          </p>
        </div>

        <div>
          <p>SQUAD</p>
          <!-- <div
            class="reward-img"
            :style="'background-image:' + 'url(' + _today_reward + ')'"
          ></div> -->
          <div class="reward-img">{{prizes.img_squad_daily_prize}}</div>


          <div v-if="prizes.squad_ranking!=null">
            <p v-if="prizes.squad_ranking==1">
              1st place
            </p>
            <p v-else-if="prizes.squad_ranking==2">
              2nd place
            </p>
            <p v-else-if="prizes.squad_ranking==3">
              3rd place
            </p>
            <p v-else>
              {{prizes.squad_ranking}}th place
            </p>
          </div>
          <p v-else>
            You haven't joined a squad yet!
          </p>
        </div>
        
        
      </div>
    </div>

    <div class="bottom">
        <div v-if="user.uploaded_cv == false || user.uploaded_cv == null" class="cv-text">
          <p> Still didn’t add your CV?
            Do it and pass by our check in to win a surprise reward  </p>
        </div>
        <div v-if="user.uploaded_cv == true && (user.approved_cv == false || user.approved_cv == null)" class="cv-text">
          <p> CV in validation process! </p>
        </div>
        <div v-if="user.uploaded_cv == true && user.approved_cv == true" class="cv-text">
          <p> You already submited your CV! </p>
        </div>
      <img :src="cv_logo" class="cv-img">
    </div>

  </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
// import { useNewActivityStore } from '@/stores/NewActivityStore';
// import { usePrizesStore } from '@/stores/PrizesStore';
import { mapState } from 'pinia'

export default {
  name: "Home",
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useUserStore, ['next_activity']),
    ...mapState(useUserStore, ['prizes']),
  },
  data: function () {
    return {
      cv_logo:require("../assets/cv_b-11 1.png"),
  //     // jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
  //     // default_image: require("../assets/jeec_colour_no_edition_transparent.svg"),
  //     // squad: null,
  //     // levels: null,
  //     // today_reward: {image:null},
  //     // xpbar_width: "92vw",
  //     // height: 30,
  //     // loading_squad: true,
  //     // loading_level: true,
  //     // loading_reward: true,
  //     // has_cv: true,
  //     // squad_ranking:null,
  //     // xp_to_first:null,
  //     // next_activity:null,
  //     // quest:{error:'No quest'},
    };
  },
  // mounted(){

  // },
  // computed: {
  //   // _today_reward() {
  //   //   return this.today_reward && this.today_reward.image
  //   //     ? this.jeec_brain_url + this.today_reward.image
  //   //     : this.default_image;
  //   // },
  //   // _reward_level() {
  //   //   return this.reward_level
  //   //     ? this.jeec_brain_url + this.reward_level.reward.image
  //   //     : this.default_image;
  //   // },
  //   // currentUser() {
  //   //   return this.$store.state.auth.user;
  //   // },
  //   // nameArray() {
  //   //   var names = this.$store.state.auth.user.name.split(" ");

  //   //   if (names.length > 1) return names;
  //   //   else return [this.$store.state.auth.user.name, ""];
  //   // },
  //   // progress() {
  //   //   var xp = this.$store.state.auth.user.total_points;
  //   //   var start_points = this.$store.state.auth.user.level.data.start_points;
  //   //   var end_points = this.$store.state.auth.user.level.data.end_points;

  //   //   return ((xp - start_points) / (end_points - start_points)) * 100;
  //   // },
  //   // reward_level() {
  //   //   if (!this.levels) return null;

  //   //   for (var level of this.levels) {
  //   //     if (level.value === this.$store.state.auth.user.level.data.value)
  //   //       return level;
  //   //   }

  //   //   return null;
  //   // },
  // },
  // methods: {
  //   // resize() {
      
  //   //   this.xpbar_width = "92vw";
      
  //   // },
  // },
  // // destroyed() {
  // //   window.removeEventListener("resize", this.resize);
  // // },
  // async created() {
  //   // window.addEventListener("resize", this.resize);
  //   // this.resize();

  //   // if (!this.currentUser) {
  //   //   this.$router.push("/");
  //   // }
      
  //   // UserService.getNextActivity().then(
  //   //   (response) => {
    
  //   //     this.next_activity = response.data.activity
  //   //   },
  //   // );
  //   // let user_squad=null
  //   // await UserService.getUserSquad().then(
  //   //   (response) => {
  //   //     user_squad = response.data
  //   //   },
  //   //   (error)=>{
  //   //     console.log(error)
  //   //   }
  //   // );
  //   // let daily_squads_rank = null
  //   // UserService.getDailySquadsRanking().then(
  //   //   (response) => {
        
  //   //     let top_daily_points=0
  //   //     daily_squads_rank = response.data
  //   //     if(daily_squads_rank.data.length>1){
          
  //   //       top_daily_points = daily_squads_rank.data[0].daily_points
  //   //     }
  //   //     else{
        
  //   //       top_daily_points = daily_squads_rank.data.daily_points
  //   //     }
  //   //     this.xp_to_first = top_daily_points-user_squad.data.daily_points;
  //   //     if(Array.isArray(daily_squads_rank.data)){
  //   //       for(let i=1;i<=daily_squads_rank.data.length;i++){
  //   //         if(daily_squads_rank.data[i-1].name == user_squad.data.name){
  //   //           this.squad_ranking=i;
  //   //         }
  //   //       }
  //   //     }
  //   //     else{
  //   //       this.squad_ranking=1
  //   //     }
        
  //   //   },
  //   // );
    

  //   // UserService.getUserSquad().then(
  //   //   (response) => {
  //   //     this.squad = response.data.data;
  //   //     this.loading_squad = false;
  //   //   },
  //   //   (error) => {
  //   //     console.log(error);
  //   //     this.loading_squad = false;
  //   //   }
  //   // );


  //   // UserService.getTodaySquadReward().then(
  //   //   (response) => {
  //   //     this.today_reward = response.data;
  //   //     this.loading_reward = false;
  //   //   },
  //   //   (error) => {
  //   //     console.log(error);
  //   //     this.loading_reward = false;
  //   //   }
  //   // );
  // },
};
</script>

<style scoped>
.home {
  background-color: #FFFCF8;
  display:flex;
  flex-direction: column;
  justify-content:space-around;
  position:absolute;
  height:auto;
  padding-bottom:20vh;
}

.top{
  position: relative;
  margin-top: 1vh;
  margin-bottom:8vh;
  background-color: #1A9CD8;
  padding-top: 1vh;
  padding-bottom: 4vh;
  padding-left: 4vw;
  padding-right: 4vw;
  width:80vw;
  margin-left:10vw;
  margin-right:10vw;
  border-radius:35px;
  align-items:center;
}
.middle {
  position: relative;
  margin-top: 1vh;
  margin-bottom:8vh;
  background-color: rgba(26, 156, 216, 0.15);
  padding-top: 4vh;
  padding-bottom: 4vh;
  padding-left: 4vw;
  padding-right: 4vw;
  display:flex;
  justify-content: space-evenly;
  width:80vw;
  height:auto;
  margin-left:10vw;
  margin-right:10vw;
  border-radius:35px;
  align-items:start;
}

.main-title h1 {
  font-family: Montserrat;
  font-weight:1000;
  font-size: 40px;
  line-height: 34px;
  line-height: 100%;
  text-align: Center;
  color:white;
}

.top-container{
  display:flex;
  justify-content: space-around;
  height:auto;
}
.main-title p{
  font-family: Montserrat;
  font-weight:600;
  font-size: 24px;
  text-align: left;
  color:white;
  margin-bottom:-5px;
}

.no-more-activities{
  font-family: Montserrat;
  font-weight:800;
  font-size: 35px;
  text-align: center;
  vertical-align: middle;
  color:white;
}

.mid-component h1{
  color:#03618C;
  font-family: Montserrat;
  font-weight:bold;
  font-size: 24px;
  line-height: 34px;
  line-height: 100%;
  text-align: Center;
  margin-bottom:10px;
}

.mid-component p{
  color:#03618C;
  font-family: Montserrat;
  font-weight:bold;
  font-size: 18px;
  line-height: 34px;
  line-height: 100%;
  text-align: Center;
  margin-top:10px;
  width:30vw;
}




.reward-img {
  align-self: center;
  position: relative;
  height: 13vh;
  width: 13vh;
  border: 0.1vh solid white;
  border-radius: 50%;
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  margin-left:auto;
  margin-right:auto;
}

.quest-img {
  position: relative;
  top:-2.5vh;
  height: 13vh;
  width: 13vh;
  border: 0.1vh solid white;
  border-radius: 50%;
  object-fit: cover;
}

.activity-img {
  align-self: right;
  position: relative;
  height: 13vh;
  width: 13vh;
  border: 0.1vh solid white;
  border-radius: 50%;
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  margin-left:auto;
  margin-right:auto;
  object-fit: contain;
  margin-left:2vh;
  margin-right:2vh;
}

.cv-img{
  align-self: center;
  position: relative;
  height: 13vh;
  width: 13vh;
  border: 0.1vh solid rgba(0, 0, 0, 0);;
  border-radius: 50%;
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: contain;
}

.cv-text{
    text-align:center;
    width:30vw;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 16px;
    color:#03618C;
  }
  .quest-text{
    text-align:center;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 16px;
    color:#03618C;
  }

  .quest-text h3{
    position:relative;
    top: 5vh;
  }

  .quest-info{
    display:flex;
    justify-content: space-evenly;
    width:80vw;
  }

  .bottom{
    position: relative;
    margin-top: 1vh;
    background-color: rgba(26, 156, 216, 0.15);
    padding-top: 1vh;
    padding-bottom: 4vh;
    padding-left: 4vw;
    padding-right: 4vw;
    display:flex;
    justify-content: space-around;
    height:auto;
    width:80vw;
    margin-left:10vw;
    margin-right:10vw;
    border-radius:35px;
    padding:10px;
    align-items:center;
  }

  .image-container{
    display:flex;
    flex-wrap: wrap;
  }

  .size2{
    height: 9vh;
    width: 9vh;
  }
  .size3{
    height: 7vh;
    width: 7vh;
  }
  .size4{
    height: 5vh;
    width: 5vh;
  }

</style>
