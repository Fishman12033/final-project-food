<template>
   <div>
    <div class="filterForm">
        <el-input 
            class='input-find' 
            v-model="nameField" 
            placeholder="Please input dish name" 
            clearable 
            @clear="debounceSearch"
            v-on:keyup.enter="search" 
        />

        <el-select
            v-model="typeField"
            placeholder="Select type of dish"
            clearable 
            @clear="debounceSearch"
            v-on:keyup.enter="search"   
        >
            <el-option
                v-for="(item, index) in foodsStore.dishTypes"
                :key="index"
                :label="item"
                :value="item"
            />
        </el-select>
    </div>
    <div class="foodsList" v-loading="loading">
        <el-row 
            v-if="foods?.length"
            class="example-demonstration">
        
            <el-col
                v-for="(food, index) of foods"
                :key="index"
                :span="7"
                :xs="8"
            >
                <el-card :body-style="{ padding: '0px' }" >
                    <img
                        :src=food.image
                        class="image"
                    />
                    <div style="padding: 14px">
                        <span class="title">{{ food.title }}</span>
                        <div class="bottom">
                            <el-button
                                text 
                                class="button" 
                                @click="router.push({ name: 'recipeDetails', params: { id: food.id }})"
                            >
                                More
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-empty description="Нет данных" v-else />
        <!-- eslint-disable -->
        <el-pagination
            layout="prev, pager, next"
            :page-count="Math.ceil(total/foodsPerPage)"
            v-model:current-page="currentPage"
            @current-change="scrollToTop"
        />
        <!-- eslint-enable -->
    </div>    
    </div>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import { useFoodsStore } from '../stores/foods'

const foodsStore = useFoodsStore()

interface Food {
    id: number,
    title: string, 
    image: string,
    dishTypes: string[],
}


const foodsPerPage = 10
const currentPage = ref(1)
const loading = ref(false)
const total = ref(0)

const scrollToTop = () => {
    const foodsList = document.querySelector("html");
    if(foodsList!=null){
        foodsList.scrollTop = 0;          
    }
}


// const checkState = () => {
//     if (foods.value.length) loading.value = false
//     else if (!foods.value.length) return
//     else loading.value = true
// }

const checkTotal = (totalFoods:number) =>{
    if (totalFoods > 900){
        return 900
    } else {
        return totalFoods
    }
}

const load = async () => {
    console.log(currentPage.value)
    loading.value = true
    const { items, total: totalFoods } = await foodsStore.getAll({
        titleMatch: nameField.value,
        type: typeField.value,
        offset: (currentPage.value - 1) * foodsPerPage,
        number: foodsPerPage,
    })
    foods.value = items
    total.value = checkTotal(totalFoods)
    loading.value = false
}

onMounted(async () => {
    loading.value = true
    const { items, total: totalFoods } = await foodsStore.getAll({
        titleMatch: nameField.value,
        type: typeField.value,
        offset:0,
        number:foodsPerPage,
    })

    foods.value = items
    total.value = checkTotal(totalFoods)
    // total.value = totalFoods
    loading.value = false
})

const router = useRouter()
const foods = ref<Food[]>([])


const nameField = ref('')
const typeField = ref('')

interface Food {
    id: number,
    title: string, 
    image: string,
    dishTypes: string[],
}

const search = async () => {
    loading.value = true
    currentPage.value = 1
    const { items, total: totalFoods } = await foodsStore.getAll({
        titleMatch: nameField.value,
        type: typeField.value,
        offset: 0,
        number: 10,
    })

    foods.value = items
    total.value = checkTotal(totalFoods)
    // total.value = totalFoods
    loading.value = false
}

const useDebounce = (func: Function, delay: number) => {
    let timeoutId: number
    return ( ...args: any[]) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(...args), delay)
    }
}
const search_delay_time = 700
const debounceSearch = useDebounce(search, search_delay_time)

watch(nameField, debounceSearch)
watch(typeField, debounceSearch)

watch(currentPage, load)
</script>
  
<style lang="scss" scoped>
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image {
  width: 100%;
  display: block;
}
.button {
  padding: 0;
  min-height: auto;
}
.el-row{
    display: flex;
    justify-content: center;
    gap: 3%;
    width: 100%;
}

.el-col{
    margin:20px 0px;
}

.el-card{
    height: 100%;
}

.filterForm{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    gap: 10px;
}
.input-find{
    width: 40%;
}

.infinite-list .infinite-list-item {
    width: 100%;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
    margin-top: 10px;
}

.empty{
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>