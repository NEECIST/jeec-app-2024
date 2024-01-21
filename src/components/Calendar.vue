<template>
  <div>
    <!-- <div>
      <button
        class="hide-button"
        v-show="showFenix"
        @click.stop="toggleFenix()"
      >
        Hide Classes
      </button>
      <button
        class="show-button"
        v-show="!showFenix"
        @click.stop="showwFenix()"
      >
        Show Classes
      </button>
    </div> -->
    <!-- <DayPilotCalendar id="dp" :config="config" ref="calendar" /> -->
  </div>
</template>

<script>
// import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-vue";
// import axios from "axios";

// export default {
//   name: "Calendar",
//   data: function () {
//     return {
//       dates: [],
//       calendar_date: "",
//       i: 0,
//       showFenix: true,
//       eventss: [],
//       error: "",
//       navigatorConfig: {
//         selectMode: "Day",
//         onTimeRangeSelected: (args) => {
//           this.config.startDate = args.day;
//         },
//       },
//       config: {
//         viewType: "Day",
//         startDate: "2012-03-04",
//         durationBarVisible: false,
//         timeRangeSelectedHandling: "Disabled",
//         /*onTimeRangeSelected: async (args) => {
//             const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
//             const dp = args.control;
//             dp.clearSelection();
//             if (modal.canceled) {
//               return;
//             }
//             dp.events.add({
//               start: args.start,
//               end: args.end,
//               id: DayPilot.guid(),
//               text: modal.result
//             });
//           },*/
//         eventDeleteHandling: "Disabled",
//         eventMoveHandling: "Disabled",
//         eventResizeHandling: "Disabled",
//         /*onEventMoved: () => {
//             console.log("Event moved");
//           },
//           onEventResized: () => {
//             console.log("Event resized");
//           },*/
//         contextMenu: new DayPilot.Menu({
//           items: [
//             // ...
//             {
//               text: "Duplicate",
//               onClick: (args) => this.duplicateEvent(args.source),
//             },
//             {
//               text: "Postpone",
//               symbol: "daypilot.svg#minichevron-right-4",
//               onClick: (args) => this.postponeEvent(args.source),
//             },
//             {
//               text: "Delete",
//               symbol: "daypilot.svg#x-4",
//               onClick: (args) => this.deleteEvent(args.source),
//             },
//             // ....
//           ],
//         }),
//       },
//     };
//   },
//   props: ["day"],
//   components: {
//     DayPilotCalendar,
//   },
//   computed: {
//     // DayPilot.Calendar object - https://api.daypilot.org/daypilot-calendar-class/
//     calendar() {
//       return this.$refs.calendar.control;
//     },
//     currentUser() {
//       return this.$store.state.auth.user;
//     },
//   },
//   methods: {
//     duplicateEvent(e) {
//       const newEvent = {
//         ...e.data,
//         id: DayPilot.guid(),
//       };
//       this.month.events.add(newEvent);
//     },
//     postponeEvent(e) {
//       e.data.start = e.start().addDays(1);
//       e.data.end = e.end().addDays(1);
//       this.month.events.update(e);
//     },
//     showwFenix() {
//       axios
//         .post(
//           process.env.VUE_APP_JEEC_BRAIN_URL + "/student/showww_classes_vue",
//           { student_ist_id: this.currentUser.ist_id }
//         )
//         .then((response) => {
//           const data = response.data; // [{}, {}]
//           this.error = data.error;
//           this.resetEvents();
//         });
//       axios
//         .post(process.env.VUE_APP_JEEC_BRAIN_URL + "/student/get_classes_vue", {
//           student_ist_id: this.currentUser.ist_id,
//         })
//         .then((response) => {
//           const data = response.data; // [{}, {}]
//           this.eventss = data.classes;
//           this.error = data.error;
//           this.showFenix = data.showFenix;
//           this.loadEvents();
//         });
//     },
//     toggleFenix() {
//       axios
//         .post(
//           process.env.VUE_APP_JEEC_BRAIN_URL + "/student/toggle_classes_vue",
//           { student_ist_id: this.currentUser.ist_id }
//         )
//         .then((response) => {
//           const data = response.data; // [{}, {}]
//           this.error = data.error;
//           this.resetEvents();
//         });
//       axios
//         .post(process.env.VUE_APP_JEEC_BRAIN_URL + "/student/get_classes_vue", {
//           student_ist_id: this.currentUser.ist_id,
//         })
//         .then((response) => {
//           const data = response.data; // [{}, {}]
//           this.eventss = data.classes;
//           this.error = data.error;
//           this.showFenix = data.showFenix;
//           this.loadEvents();
//         });
//     },
//     async deleteEvent(e) {
//       const modal = await DayPilot.Modal.confirm(
//         "Do you really want to delete this event?"
//       );
//       if (modal.canceled) {
//         return;
//       }
//       this.month.events.remove(e);
//     },
//     resetEvents() {
//       for (this.i = 0; this.i < this.eventss.length; this.i++) {
//         this.calendar.events.remove(this.eventss[this.i]);
//       }
//     },
//     async loadEvents() {
//       for (this.i = 0; this.i < this.eventss.length; this.i++) {
//         this.calendar.events.add(this.eventss[this.i]);
//       }
//       this.calendar.update();
//     },
//   },
//   mounted() {
//     axios
//       .post(process.env.VUE_APP_JEEC_BRAIN_URL + "/student/get_classes_vue", {
//         student_ist_id: this.currentUser.ist_id,
//       })
//       .then((response) => {
//         const data = response.data; // [{}, {}]
//         this.eventss = data.classes;
//         this.error = data.error;
//         this.showFenix = data.showFenix;
//         this.loadEvents();
//         this.dates = data.dates;
//         if (this.day == 0) {
//           this.calendar_date = this.dates[0];
//         }
//         if (this.day == 1) {
//           this.calendar_date = this.dates[1];
//         }
//         if (this.day == 2) {
//           this.calendar_date = this.dates[2];
//         }
//         if (this.day == 3) {
//           this.calendar_date = this.dates[3];
//         }
//         if (this.day == 4) {
//           this.calendar_date = this.dates[4];
//         }
//         this.config.startDate = this.calendar_date;
//         console.log(this.calendar_date);
//       });
//   },
// };
</script>

<style>
.wrap {
  display: flex;
}

.left {
  margin-right: 10px;
}

.content {
  flex-grow: 1;
}

.calendar_default_event_inner {
  background: #2e78d6;
  color: white;
  border-radius: 5px;
  opacity: 0.9;
}

.hide-button {
  background-color: #e9a6af;
  color: white;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  width: 150px;
  height: 30px;
  border-radius: 14px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10vw;
}

.show-button {
  background-color: #d93046;
  color: white;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  width: 150px;
  height: 30px;
  border-radius: 14px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10vw;
}
</style>
