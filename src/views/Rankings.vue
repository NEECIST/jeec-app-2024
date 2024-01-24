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
     <!-- <Buttons
      @_click="click"
      class="-buttons"
      :names="{
        personal: button === 'personal',
        squads: button === 'squads',
      }"
    />
    <Buttons
      @_click="click"
      class="-big-buttons"
      :names="{
        personal: button === 'personal',
        squads: button === 'squads',
      }"
    />  -->

    <div>
      {{ user.name }}
    </div>
       <div class="btns">
       <button class="personal-btn unselected" :class="{selected: personal}" @click="Personal">Personal</button>
       <button class="squad-btn unselected" :class="{selected: squad}" @click="Squad">Squad</button>
      </div> 

    <div style="height: 8vh"></div>

    <div v-if="!loading_students && !loading_squads && !loading_daily">
      <div v-show="personal">
      <div class="podium">
        <div class="stand" v-if="students.length>1">
          <img :src="students[1].photo" class="podium-img second">              <!-- mudar o index -->   
          <p class="podium-text">{{names[1]}}</p>
          <div class="second pilar">
            <span>2</span><sup class="super">nd</sup>
          </div>
        </div>
        <div class="stand">
          <img :src="students[0].photo" class="podium-img first">
          <p class="podium-text">{{names[0]}}</p>
          <div class="first pilar">
            <span>1</span><sup class="super">st</sup>
          </div>
        </div>
        <div class="stand" v-if="students.length>2">
          <img :src="students[2].photo" class="podium-img third">
          <p class="podium-text">{{names[2]}}</p>
          <div class="third pilar">
            <span>3</span><sup class="super">rd</sup>
          </div>
        </div>
      </div>


        <Rank
          v-for="(student, index) in other_students"
          v-show="personal"
          :key="student.ist_id"
          :name="student.name"
          :rank="rank(index, students)"
          :level="student.level.data.value"
          :img_src="student.photo"
          :total = "other_students.length"
          :index="index"
        />
        </div>
        <div v-show="squad">
      <div class="podium">
        <div class="stand" v-if="squads.length>1">
          <img :src="jeec_brain_url + squads[1].image" class="podium-img second">        <!-- mudar o index -->          
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
  </div>
</template>

<script>
import Rank from "@/components/Rank.vue";
import UserService from "../services/user.service";
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia'
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
    };
  },
  methods: {
    nameArray() {
      this.names=[]
      for(let i=0;i<this.students.length;i++){
        var names = this.students[i].name.split(" ");
        if(names.length>1){
          this.names.push(names[0]+' '+names[names.length-1])
        }
        else{
          this.names.push(names[0])
        }
      }
      
    },
    Personal(){
      this.personal=true
      this.squad=false
    },
    Squad(){
      this.personal=false
      this.squad=true
    },
    click(name) {
      if (name !== this.button) {
        this.button = name;
      }
    },
    rank(index, items) {
      if (index == 0) return 1;
      else {
        var aux = index;
        while (
          aux >= 0 &&
          items[index].total_points == items[aux].total_points
        ) {
          aux--;
        }

        return aux + 2;
      }
    },
  },
  created() {
    // console.log(this.currentUser);
    // if (!this.currentUser) {
    //   this.$router.push("/");
    // }

    UserService.getStudentsRanking().then(
      (response) => {
        this.students = response.data.data;
        if (!Array.isArray(this.students)) this.students = [this.students];
        this.loading_students = false;
        this.other_students = []
        for(let i=3;i<this.students.length;i++){
          this.other_students.push(this.students[i])
        }
        this.nameArray()
      },
      (error) => {
        console.log(error);
        this.loading_students = false;
      }
    );

    UserService.getSquadsRanking().then(
      (response) => {
        this.squads = response.data.data;
        if (!Array.isArray(this.squads)) this.squads = [this.squads];
        this.loading_squads = false;
        this.other_squads = []
        for(let i=3;i<this.squads.length;i++){
          this.other_squads.push(this.squads[i])
        }
      },
      (error) => {
        console.log(error);
        this.loading_squads = false;
      }
    );

    UserService.getDailySquadsRanking().then(
      (response) => {
        this.daily_squads = response.data.data;
        if (!Array.isArray(this.daily_squads)) this.daily_squads = [this.daily_squads];
        this.loading_daily = false;
      },
      (error) => {
        console.log(error);
        this.loading_daily = false;
      }
    );
    console.log(this.students);
  },
 
  
};
</script>

<style scoped>


.rankings {
  display: flex;
  background-color: #1F1F1F;
  justify-content: center;
  align-content: center;
  height: 900px;

} 

.select{
  display: flex;
  position: relative;
  top: 102px;
  height: 33px;
  width: 384px;
  justify-content: center;
}

.select{
  position: relative;
  justify-content: center;
  align-content: center;
}


/* .super{
  font-size:30px;
  vertical-align: super;
}

.podium{
  width:90vw;
  margin-left:5vw;
  display:flex;
  justify-content: space-around;
  align-items: end;
}

.pilar{
  text-align: center;
  color:white;
  vertical-align: middle;
  display: table-cell;
  width:30vw;
  font-family: Montserrat;
  font-size: 64px;
  font-weight: 700;
  border-top-right-radius: 5vw;
  border-top-left-radius: 5vw;
}



.podium-text{
  text-align:center;
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 600;

}

.podium-img{
  position:relative;
  margin-left:auto;
  margin-right:auto;
  display:block;
  width: 12vh;
  height: 12vh;
  border-radius: 50%;
  border-width: 3px;
  border-style: solid;
}

.first{
  border-color:#CEBD25;
  background-color:#D9D004
}

.first.pilar{
  height:20vh;
}

.second{
  border-color:#1A9CD8;
  background-color:#1A9CD8
}

.second.pilar{
  height:15vh;
}

.third{
  border-color:#D93046;
  background-color:#D93046
}

.third.pilar{
  height:10vh;
}

.stand{
  width:30vw;
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
} */
</style>