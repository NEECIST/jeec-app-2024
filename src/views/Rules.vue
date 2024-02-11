<template>
  <div>
    <p style="font-size: 2rem;" >Rules:</p>
    <p>&nbsp;</p>
    <p>You can earn points through the following activities:</p>
    <p>&nbsp;</p>
    <p>   Job Fair: 25 points</p>
    <p>&nbsp;</p>
    <p>   15/15: 300 points</p>
    <p>&nbsp;</p>
    <p>   Workshop, Inside Talks, Discussion Panel and Main Speaker: 500 points</p>
    <p>&nbsp;</p>
    <p>   Submitting your CV: 500 points</p>
    <p>&nbsp;</p>
    <p>   Submitting your LinkedIn: 25 points</p>
    <p>&nbsp;</p>
    <p>The points are only awarded if you stay for the whole period of the activity. Claiming the points and then leaving the activity will get you banned.</p>
    <p>&nbsp;</p>
    <p>To earn points for activities that are not performed in the app, you must use your QR Code. </p>
    <p>&nbsp;</p>
    <p>For the Job Fair activity, you must present the QR Code to the people in the booth. For other activities, you present it to the JEEC members stationed at that activity.</p>
    <p>&nbsp;</p>
    <p>Points are divided into daily points and total points. Daily points are the points gained in the present day. Total points are all points gained throughout the week, including the daily points.</p>
    <p>&nbsp;</p>
    <p>You can also create a squad to earn squad points. Squad points are only earned by their members while they are in the squad. If a member of the squad leaves it or gets banned, all points earned by that member are deleted from the squad. Squads can have up to 4 members.</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p style="font-size: 2rem;" >Prizes:</p>
    <p>&nbsp;</p>
    <p>Tickets: Tickets can be earned with daily points. Every day, up to 3 tickets can be earned. The first ticket is obtained at 50 points, the second at 550, and the third at 1100. Spend the tickets in the daily spin for a chance to win prizes.</p>
    <p>&nbsp;</p>
    <p>Daily Prizes: The individual and the squad with the highest number of daily points will receive, at the end of that day, the corresponding daily prize.</p>
    <p>&nbsp;</p>
    <p>Final Lottery: Every individual who reaches 3000 total points participates in the final lottery. These prizes will be randomly attributed to the participants. Every participant can only receive one prize, and having more points does not increase the chances of winning a prize.</p>
    <p>&nbsp;</p>
    <p>Weekly Prizes: The third, second and first individuals and squads with the highest total number of points at the end of the event will receive the corresponding weekly prizes.</p>

  </div>
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import GeneralRules from "@/components/GeneralRules.vue";
import PrizeRules from "@/components/PrizeRules.vue";
import ActivityRules from "@/components/ActivityRules.vue";
import UserService from "../services/user.service";

export default {
  name: "Rules",
  components: {
    Buttons,
    GeneralRules,
    PrizeRules,
    ActivityRules,
  },
  data: function () {
    return {
      button: "Rules",
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      event_info: [],
      loading_event: true,
    };
  },
  methods: {
    click(name) {
      this.button = name;
    },
  },
};
</script>

<style scoped>
.rules-page {
  background-color: #FFFCF8;
  padding-bottom:20vh;
}

.loading {
  text-align: center;
  margin-top: 35vh;
}

.rules-page {
  overflow-y: auto;
}

p {
    font-family: "Lexend Exa";
    font-size: 0.95rem;
  }

</style>
