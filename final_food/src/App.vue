
<template>
 <div>
  <div class="bedding"></div>
  <el-menu
    class="el-menu-demo nav"
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item index="0">
      <el-icon size="50px">
        <ForkSpoon />
      </el-icon>
    </el-menu-item>   
    <el-button 
      class="btnBack"
      v-if="route.name === 'recipeDetails'" 
      @click="$router.push('/')"
    >
      Back
    </el-button>
  </el-menu>
  <router-view></router-view>
</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0px;
  width:100%;
  height: 50px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
.bedding{
  height: 50px;
  position: relative;
}

.btnBack{
  width: 5%;
  margin-right: 10px;
}
</style>