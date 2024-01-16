<template>
    <div class="bottom-bar">
        <div class="top-sub-bar">
            <div class="qr-background">
                <router-link :to="{ name: 'QRCode' }">
                <img :src="qr_logo" class="qr-image">
                </router-link>
            </div>
            
        </div>
        <div class="bottom-sub-bar">
           
                <router-link :to="{ name: 'Home' }">
                    <img :src="home_icon" class="icon">
                </router-link>
                <router-link :to="{ name: 'Schedule' }">
                    <img :src="schedule_icon" class="icon">
                </router-link>
                <router-link :to="{ name: 'Squad' }">
                <img :src="squad_icon" style="margin-left:10vw" class="icon">
                </router-link>
                <router-link :to="{ name: 'Profile' }">
                <img :src="profile_icon" class="icon">
                </router-link>  
        </div>
        
    </div>
</template>
<script>
export default{
    data: function(){
        return{
            qr_logo:require("../assets/icons/qr_icon.svg"),
            home_icon: require('../assets/icons/home_icon.svg'),
            schedule_icon: require('../assets/icons/schedule_icon.svg'),
            squad_icon: require('../assets/icons/squad_icon.svg'),
            profile_icon: require('../assets/icons/profile_icon.svg'),
        }
    }
}
</script>
<style>

.qr-image{
    width:6vh;
    height:6vh;
    position:relative;
    top:1vh;
    left:1vh;
}
.qr-background{
    background: linear-gradient(202.19deg, #1A9CD8 7.38%, #03618C 158.76%);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 100%;
    width:8vh;
    height:8vh;
    position:relative;
    bottom:-6vh;
    margin-left:auto;
    margin-right:auto;
    display:block;
    z-index:2;
    border-radius:30px;
    box-shadow: 0px 5px 15px;
}
.bottom-bar{
    height:20vh;
    position:fixed;
    bottom:3vh;
    right:0;
    bottom:0;
    width:100vw;
}
.top-sub-bar{
    height:10vh
}
.bottom-sub-bar{
    height:10vh;
    display:flex;
    background: linear-gradient(14.72deg, #03618C -98.67%, #1A9CD8 89.83%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    justify-content: space-evenly;
    align-items:center;
    width:100vw;
    
}

.icon{
    height: 5vh;
}


</style>