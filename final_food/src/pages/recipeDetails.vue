<template>
    <el-row class="wrapper" v-if="foodItem" :span="24">
        <el-card class="food-title" >{{ foodItem.title }}</el-card>
        <el-row class="content" :span="24">
            <el-col class="first-half" :span="12" :xs="24">
                <img :src=foodItem.image class='food-image' alt="receptImage">
                <div class="other-info">
                    <div class="readyTime"><el-icon><Timer /></el-icon>Cooking time: {{ foodItem.readyInMinutes }} min</div>
                    <div class="dishType">Dish type:<div v-for="dish of foodItem.dishTypes" :key="dish">{{ dish }}</div></div>
                </div>
                <el-card class="desc" v-html="foodItem.summary"></el-card>
            </el-col>
            <el-col class="second-half" :span="12" :xs="24">
                <el-card class="UList">
                    <template #header>
                        <li >Necessary ingredients</li>
                    </template>
                    <li class="ingredients" v-for="(ingredient, index) of foodItem.extendedIngredients" :key="index">
                        {{ index }} - {{ ingredient.name }}
                    </li>   
                </el-card>
                <el-card class="UList">
                    <template #header>
                        <li>Steps</li>
                    </template>
                    <li class="steps" v-for="(step, index) of foodItem.analyzedInstructions[0].steps" :key="index">
                        {{ index }} - {{ step.step }}
                    </li>   
                </el-card>
            </el-col>
        </el-row>
    </el-row>
    <div v-else-if="!foodItem" style="height:30vw" v-loading="loading"></div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { useFoodsStore } from '../stores/foods'

const foodsStore = useFoodsStore()

const props = defineProps<{
    id: string;
}>()

const foodItem: Ref<FoodDetail | null> = ref(null)

interface FoodDetail {
    id: number
    title: string
    readyInMinutes: number
    image: string
    dishTypes: object
    analyzedInstructions: {
        steps: {
            step:string
        }[]
    }[]
    summary: string
    extendedIngredients: {
        name: string
    }[]
}

const loading = ref(true)

onMounted(async() => {
    foodItem.value = await foodsStore.getOne(props.id)
})
</script>
  
<style lang="scss" scoped>
.wrapper{
    height: calc(100% - 50px);
    width: 98%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.food-title{
    height: 15%;
    width: 100%;
    font-size:200%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content{
    height: 85%;
    width: 100%;
    display:flex;
    justify-content: space-between;
}

.first-half{
    display: flex;
    flex-direction: column;
    width: 49%;
    height: 100%;
    padding:10px;
    // justify-content: center;
    // align-items: center;
}

.second-half{
    display: flex;
    flex-direction: column;
    width: 49%;
    height: 100%;
    padding: 10px;
}
.other-info{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 10px 0px;
}

.desc{
    padding:10px;
}
.UList{
    list-style-type: none;
    margin-bottom: 10%;
}
.food-image{
    align-self: center;
    height: 60%;
    width: 90%;
}
// .example-showcase .el-loading-mask {
//   z-index: 9;
// }
</style>