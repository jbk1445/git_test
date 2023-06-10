<template>
    <div class="image-view">
        <div class="head-view"><img class="logo" src="@/assets/New_logo.png"/></div>
        <div class="image-container">
            <img class="image" src="@/assets/finalapp.jpeg"/>
        </div>
    </div>
</template>

<style scoped>
.image {
    position: relative;
    left: 10%;
    height: 90%;
    width: 80%;
    background-color: #0E1D31;
}
.image-view {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
}
.head-view {
    position: relative;
    top: 5%;
    font-size: 35px;
    color: #008A71;
    margin-bottom: 10px;
}

.logo {
    width: 200px;
    height: 180px;
    -webkit-filter: opacity(.5) drop-shadow(0 0 0 #0E1D31);
    filter: opacity(.5) drop-shadow(0 0 0 #0E1D31);
}

</style>
