<template>
  <div class="schedule">
    <div class="days"></div>
    <div class="schedule-events">
      <div id="line"></div>
        <EventSchedule color="blue" start="12h45" end="15h00" title="Título 1" text="Exemplo texto 1?" link="/home"></EventSchedule>
        <EventSchedule color="purple" start="15h00" end="16h00" title="Título 2" text="Exemplo texto 2!" link="/squads"></EventSchedule>
        <EventSchedule color="blue" start="12h45" end="15h00" title="Título 1" text="Exemplo texto 1?" link="/home"></EventSchedule>
        <EventSchedule color="purple" start="15h00" end="16h00" title="Título 2" text="Exemplo texto 2!" link="/squads"></EventSchedule>
        <EventSchedule color="blue" start="12h45" end="15h00" title="Título 1" text="Exemplo texto 1?" link="/home"></EventSchedule>
        <EventSchedule color="purple" start="15h00" end="16h00" title="Título 2" text="Exemplo texto 2!" link="/squads"></EventSchedule>
        <EventSchedule color="blue" start="12h45" end="15h00" title="Título 1" text="Exemplo texto 1?" link="/home"></EventSchedule>
        <EventSchedule color="purple" start="15h00" end="16h00" title="Título 2" text="Exemplo texto 2!" link="/squads"></EventSchedule>
        <EventSchedule color="blue" start="12h45" end="15h00" title="Título 1" text="Exemplo texto 1?" link="/home"></EventSchedule>
        <EventSchedule color="purple" start="15h00" end="16h00" title="Título 2" text="Exemplo texto 2!" link="/squads"></EventSchedule>
        <EventSchedule color="blue" start="12h45" end="15h00" title="Título 1" text="Exemplo texto 1?" link="/home"></EventSchedule>
        <EventSchedule color="purple" start="15h00" end="16h00" title="Título 2" text="Exemplo texto 2!" link="/squads"></EventSchedule>
        <EventSchedule color="blue" start="12h45" end="15h00" title="Título 1" text="Exemplo texto 1?" link="/home"></EventSchedule>
        <EventSchedule color="purple" start="15h00" end="16h00" title="Título 2" text="Exemplo texto 2!" link="/squads"></EventSchedule>
        <EventSchedule color="blue" start="12h45" end="15h00" title="Título 1" text="Exemplo texto 1?" link="/home"></EventSchedule>
        <EventSchedule color="purple" start="15h00" end="16h00" title="Título 2" text="Exemplo texto 2!" link="/squads"></EventSchedule>
        <EventSchedule color="blue" start="12h45" end="15h00" title="Título 1" text="Exemplo texto 1?" link="/home"></EventSchedule>
        <EventSchedule color="purple" start="15h00" end="16h00" title="Título 2" text="Exemplo texto 2!" link="/squads"></EventSchedule>
        <EventSchedule color="blue" start="12h45" end="15h00" title="Título 1" text="Exemplo texto 1?" link="/home"></EventSchedule>
        <EventSchedule color="purple" start="15h00" end="16h00" title="Título 2" text="Exemplo texto 2!" link="/squads"></EventSchedule>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia'
import { useRouter } from 'vue-router'
import EventSchedule from "@/components/EventSchedule.vue";


const router = useRouter()

export default {
  name: "Schedule",
  components: { EventSchedule },
  mounted() {
    if (!this.user) {
      // router.push("/");
    }
  },
};
</script>

<style scoped>
.days {
  background-color: #630808;
  width: 100%;
  height: 30px;
}

.schedule-events {
  width: 100%;
  height: 600px;
  margin-top: 20px;
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
}
.event {
  width: 100%;
}

#line {
  height: 595px;
  width: 2px;
  position: fixed;
  background-color: white;
  margin-left: 4px;
  margin-top: 5px;
}

</style>
