<template>
  <div class="rules">
    <div class="card">
      <center>
        <p class="title">Redeem Codes</p>
      </center>
      <p>
        Every activity, except for the job fair booths, has a redeem code. Each
        participant gets a one time use code after the activity is over. This
        way, we measure how many activities you've attended and keep track of
        your score. In the job fair there are no redeem codes, simply give your
        IST Id to the company and they will add the points to your account. You
        will receive points for each company booth you go to and can only do so
        once everyday.
      </p>
      <p>
        <b>
          All activity types have their own xp value and there are some special
          activities that have a bonus, these are called the daily quests.
        </b>
      </p>
      <center>
        <v-btn
          depressed
          @click.stop="goto_code"
          class="redeem white--text"
          color="secundary"
          >Go to Redeem Codes</v-btn
        >
      </center>
    </div>
    <div class="card">
      <center>
        <p class="title">Game Rules</p>
        <p>- In case of a draw, our system picks the winner randomly;</p>
        <p>
          - The current team of JEEC and NEECIST cannot participate in the game;
        </p>
        <p>
          - All activity types have their own xp value and there are some
          special activities that have a bonus, these are called the daily
          quests;
        </p>
        <p>
          - <b>You can only insert a code from an activity you were in.</b> Our
          team will be taking note of each participation and will know the
          veracity of the redeem. Breaking this rule will result in being banned
          from the JEEC Web App;
        </p>
        <p>- Codes are only valid on the day of their respective activity;</p>
        <p>
          - All points obtained before the start of the event are accounted for
          the first daily reward;
        </p>
        <p>
          - You can redeem someone else's referral code to gain extra points.
          The person whose code you redeemed will only earn points if you
          participate in, at least, one activity (You will only grant points to
          the person whose code you redeemed if you participate in an activity);
        </p>
        <p>
          - The use of inappropriate images or names results in a permanent ban
          from the APP;
        </p>
        <p>
          - In the case of activities that need previous registration, if the
          student does not attend the activity it will result in a permanent ban
          from the APP;
        </p>
        <p>
          <b
            >- It's possible to cancel your registration ahead of time through
            the Eventbrite page of the activity;</b
          >
        </p>
        <p>
          - Any kind of exploit will result in a permanent ban of the respective
          user from the APP;
        </p>
        <p>- If one member of the squad gets banned the squad is disbanded.</p>
      </center>
    </div>
    <div class="card">
      <center>
        <p>
          <b>
            If you have any doubts feel free to contact us through our social
            media or through the support chat at our website.
          </b>
        </p>
      </center>
      <center>
        <a
          :href="event_info.instagram_link"
          target="_blank"
          style="margin-right: 3vw"
        >
          <img src="../assets/instagram_icon.svg" class="icon" />
        </a>
        <a href="https://jeec.ist" style="margin-right: 3vw" target="_blank">
          <img src="../assets/globe_icon.svg" class="icon" />
        </a>
        <a :href="event_info.facebook_link" target="_blank">
          <img src="../assets/facebook_icon.svg" class="icon" />
        </a>
      </center>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeneralRules",
  data: function () {
    return {};
  },
  props: {
    event_info: Object,
  },
  computed: {},
  methods: {
    goto_code() {
      this.$router.push("/code");
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #FFFCF8;
  margin-bottom: 0.5vh;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5vw;
  padding-right: 5vw;
}

.rules {
  padding-top: 9vh;
}
.icon {
  height: 4vh;
  vertical-align: middle;
}
</style>
