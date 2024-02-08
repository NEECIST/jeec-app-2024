<style>
.activity {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    flex-direction: column;
}

.activity:hover {
    transform: scale(1.05);
}

.activity-time {
    display: flex;
    align-items: start;
}

.activity-time p {
    margin: 0;
    font-weight: bold;
    color: #ffffff;
}
.activity-tab {
    display: flex;
    align-items: start;
    justify-content: center;
    text-align: start;
    flex-direction: row;
    background-color: #426ca3;

    .bottom-part{
        display: flex;
        justify-content: space-between;
    }
}

.activity-type{
    display: flex;
}

.activity-img{
    display: block;
    border-radius: 50%;
    background-color: aqua;
    margin: 0.5rem;
}
.activity-logo{
    border-radius: 50%;
    width: 100%;
    height: 100%;
}



</style>

<template>
    <div class="activity"
    :class="{
        interest: activity.interest,
        participated: activity.participated,
        past: activity.past,
        type: activity.type
    }">

        <div class="activity-time">
            <p>{{ activity.time }}</p>
        </div>

        <div class="activity-tab">
            <div class="activity-text">
                <div class="upper-part">
                    <div class="activity-type">
                        <h3> {{ activity.type }} </h3>
                        <img src="" alt=" type-img ">
                    </div>
                    
                    <h4 class="activity-name">{{ activity.name }}</h4>
                </div>
                

                <div class="bottom-part">
                    <a class="plus-info" href="">+ info</a>
                    <img class="add-interested" src="" alt="add to interested" >
                </div>
            </div>

            <div class="activity-img">
                <img class= "activity-logo" src="" alt="">
            </div>
            
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia'

export default {
    name: 'Activity',
    props: {
        activity: Object
    },
    computed: {
        ...mapState(useUserStore, ['user'])
    },
    mounted() {
        const activity_img = document.querySelector('.activity-img');
        const activity_tab = document.querySelector('.activity-tab');
        activity_img.style.height = activity_tab.clientHeight + 'px';
        activity_img.style.width = activity_tab.clientHeight + 'px';

        console.log(activity_img.clientHeight);
        console.log(activity_tab.clientHeight);
    }
}

</script>