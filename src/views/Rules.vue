<template>
  <div class="rules-page">
    <h2>Rules:</h2>
    <ol>
      <li>
        <p>You can earn points through the following activities:</p>
        <ul>
          <li>Job Fair: 25 points</li>
          <li>15/15: 300 points</li>
          <li>Workshop, Inside Talks, Discussion Panel and Main Speaker: 500 points</li>
          <li>Submitting your CV: 500 points</li>
          <li>Submitting your LinkedIn: 25 points</li>
        </ul>
      </li>
      <li>The points are only awarded if you stay for the whole period of the activity. Claiming the points and then leaving the activity will get you banned.</li>
      <li>To earn points for activities that are not performed in the app, you must use your QR Code.</li>
      <li>For the Job Fair activity, you must present the QR Code to the people in the booth. For other activities, you present it to the JEEC members stationed at that activity.</li>
      <li>Points are divided into daily points and total points. Daily points are the points gained in the present day. Total points are all tne points gained throughout the week, including the daily points.</li>
      <li>You can also create a squad to earn squad points. Squad points are only earned by their members while they are in the squad. If a member of the squad leaves it or gets banned, all points earned by that member are deleted from the squad. Squads can have up to 4 members.</li>
    </ol>

    <h2>Prizes:</h2>
    <ol>
      <li>Tickets: Tickets can be earned with daily points. Every day, up to 3 tickets can be earned. The first ticket is obtained at 50 points, the second at 550, and the third at 1100. Spend the tickets in the daily spin for a chance to win prizes.</li>
      <li>Daily Prizes: The individual and the squad with the highest number of daily points will receive, at the end of that day, the corresponding daily prize.</li>
      <li>Final Lottery: Every individual who reaches 3000 total points participates in the final lottery. These prizes will be randomly attributed to the participants. Every participant can only receive one prize, and having more points does not increase the chances of winning a prize.</li>
      <li>Weekly Prizes: The third, second and first individuals and squads with the highest total number of points at the end of the event will receive the corresponding weekly prizes.</li>
    </ol>
  </div>
</template>

<style scoped>
.rules-page {
  padding: 0 2ch;
  padding-bottom: 130px;
  margin: 0 auto;
  max-width: 900px;
}

h2 {
  font-family: "Lexend Exa";
  letter-spacing: 0.3ch;
  padding: 4rem 0 2rem 0;
  font-size: 2rem;
  text-align: center;
}

h2:first-of-type {
  padding-top: 2rem;
}

li, p {
  font-family: "Lexend Exa", sans-serif;
  color: var(--clr-dark-font);
  font-size: 1.1rem;
  line-height: 1.4;
}

li > p {
  padding-bottom: 0.5rem;
}

ol > li {
  padding-bottom: 0.6rem;
}

ul {
  padding-left: 2ch;
}

ul > li {
  padding-bottom: 0.5rem;
}
</style>
