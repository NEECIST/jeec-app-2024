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

    <div class="main-button-container">
      <button  @click.stop="click_daily()" class="main-button" style="border-top-left-radius:20px">
        SOLO
      </button>
      <button @click.stop="click_week()" class="main-button" style="border-top-right-radius:20px">
        SQUAD
      </button>
    </div>

    <div v-if="daily">
      <div>
        <p class="prize-title daily">TODAY</p>

        <RankingsPodium :other_rankingdata="students_daily"
        :user_ranking="userdata_individual.ranking_daily"
        :user_points="userdata_individual.daily_points"
        :identity="'You'"
        :flag="true">
        </RankingsPodium>

      </div>

      <div>
        <p class="prize-title daily">WEEK</p>

        <RankingsPodium :other_rankingdata="students_weekly" 
        :user_ranking="userdata_individual.ranking_weekly" 
        :user_points="userdata_individual.total_points"
        :identity="'You'"
        :flag="true">
        </RankingsPodium>

      </div>
    </div>
    <div v-else>

      <div>
        <p class="prize-title daily">TODAY</p>
        
        <RankingsPodium :other_rankingdata="squads_daily" 
        :user_ranking="userdata_squad.ranking_daily" 
        :user_points="userdata_squad.daily_points"
        :identity="identityy"
        :flag="user_squad_flag">
        </RankingsPodium>

      </div>

      <div>
        <p class="prize-title daily">WEEK</p>
        
        <RankingsPodium :other_rankingdata="squads_weekly" 
        :user_ranking="userdata_squad.ranking_weekly" 
        :user_points="userdata_squad.total_points"
        :identity="identityy"
        :flag="user_squad_flag">
        </RankingsPodium>

      </div>
    </div>

    
  </div>
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

.main-button-container{
  display:flex;
  justify-content:space-around;
}
.main-button{
  width:45vw;
  background:none;
  border-left:none;
  border-right:none;
  font-size:20px;
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