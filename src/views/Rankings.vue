<template>

  <div class="rankings">
    <div class="center">
      <div class="main-button-container">
        <div @click.stop="click_daily()" id="main-button-left" class="main-button radient-border-passthrough">
          SOLO
        </div>
        <div @click.stop="click_week()" id="main-button-right" class="main-button radient-border-passthrough">
          SQUAD
        </div>
      </div>
    </div>
    

    <div class="spacing"></div>

    <div v-if="daily">
      <div>
        <p class="prize-title daily">TODAY</p>

        <div class="spacing"></div>

        <RankingsPodium :other_rankingdata="students_daily"
        :user_ranking="userdata_individual.ranking_daily"
        :user_points="userdata_individual.daily_points"
        :identity="'You'"
        :flag="true"
        :type="'Student'">
        </RankingsPodium>

        <div class="spacing"></div>

      </div>

      <div>
        <p class="prize-title daily">WEEK</p>

        <div class="spacing"></div>

        <RankingsPodium :other_rankingdata="students_weekly" 
        :user_ranking="userdata_individual.ranking_weekly" 
        :user_points="userdata_individual.total_points"
        :identity="'You'"
        :flag="true"
        :type="'Student'">
        </RankingsPodium>
      </div>
    </div>
    <div v-else>

      <div>
        <p class="prize-title daily">TODAY</p>
        
        <div class="spacing"></div>

        <RankingsPodium :other_rankingdata="squads_daily" 
        :user_ranking="userdata_squad.ranking_daily" 
        :user_points="userdata_squad.daily_points"
        :identity="identityy"
        :flag="user_squad_flag"
        :type="'Squad'">
        </RankingsPodium>

        <div class="spacing"></div>
      </div>

      <div>
        <p class="prize-title daily">WEEK</p>
        
        <div class="spacing"></div>

        <RankingsPodium :other_rankingdata="squads_weekly" 
        :user_ranking="userdata_squad.ranking_weekly" 
        :user_points="userdata_squad.total_points"
        :identity="identityy"
        :flag="user_squad_flag"
        :type="'Squad'">
        </RankingsPodium>

      </div>
    </div>

    
  </div>
  <div style="height: 20vh"></div>
</template>

<script>
import RankingsPodium from "@/components/RankingsPodium.vue";
import UserService from "../services/user.service";
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia';
import arrow from "../assets/chevron-compact-down.svg"


export default {
  name: "Rankings",
  components: {
    RankingsPodium,
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
      show: false,
      daily: true,
      identityy: String,
      rankingdata: [],
      user_squad_flag: true,
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
    },
    click_daily() {
      this.daily = true;
    }, click_week() {
      this.daily = false;
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

        if(this.rankingdata.squad_ranking == null){
          this.user_squad_flag = false;
        }else{
          this.user_squad_flag = true;
          this.userdata_squad = this.rankingdata.squad_ranking;

          //Already have a condition in endpoint that dont let two squads have the same name

          for(let i=0;i<this.squads_weekly.length;i++){
            if (this.squads_weekly[i].name == this.userdata_squad.name){
              this.squads_weekly[i].name = "Your Squad";
            }
          }

          for(let i=0;i<this.squads_daily.length;i++){
            if (this.squads_daily[i].name == this.userdata_squad.name){
              this.squads_daily[i].name = "Your Squad";
            }
          }
        }

        for(let i=0;i<this.students_weekly.length;i++){
          if (this.students_weekly[i].username == this.user.username){
            this.students_weekly[i].name = "you";
          }
        }

        for(let i=0;i<this.students_daily.length;i++){
          if (this.students_daily[i].username == this.user.username){
            this.students_daily[i].name = "you";
          }
        }
      },
    );


    
  },

};
</script>

<style scoped>
.spacing{
  height: 5vh;
}

.center{
  display: flex;
  justify-content: center;
}
.main-button-container{
  display:flex;
  justify-content:space-around;
  width: 90%;
}

.main-button{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 47%;
  height: 2.7vh;
  font-size: 90%;
  font-weight: 600;
  --border-width: 2px 0 0 0;
  background: none;
  font-family: "Lexend Exa";
  letter-spacing: 0.2vw;
}

.main-button::before{
  content: "";
}

#main-button-left{
  --border-radius: 20px 0px 0px 0px;
}

#main-button-right{
  --border-radius: 0px 20px 0px 0px;
}

.prize-title{
  text-align:center;
  padding-bottom:10px;
  font-size:30px;
  font-weight: bold;
  letter-spacing:5px;
}

.weekly{
  color:#F72585;
  text-shadow: 0px 0px 15px #F72585;
}

.daily{
  color:#4CC9F0;
  text-shadow: 0px 0px 15px #4CC9F0;
}


</style>