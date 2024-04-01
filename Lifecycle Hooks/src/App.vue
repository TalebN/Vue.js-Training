<template>
  <div id="app">
    <div class="section" style="background-color: #EBF5FB">
      <h1 class="section-title">Lifecycle Hooks</h1>
      <ParentComponent/>
    </div>
    <hr class="divider">
    <div class="section" style="background-color: #EBF5FB;">
      <h1 class="section-title">Mixins</h1>
      <div class="counter-section">
        <ClickCounter />
        <HoverCounter />
      </div>
    </div>
    <hr class="divider">
    <div class="section" style="background-color: #EBF5FB;">
      <h1 class="section-title">Mounted Function</h1>
      <TemplateRefComponent/>
    </div>
    <hr class="divider">
    <div class="section" style="background-color: #EBF5FB;">
      <h1 class="section-title">{JSON} Placeholder</h1>
      <div class="json-section">
        <CreatePost/>
        <PostList/>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from './components/PosList.vue'
import CreatePost from './components/createPost.vue'
import ParentComponent from './components/Parent.vue'
import TemplateRefComponent from './components/TemplateRef.vue'
import HoverCounter from './components/HoverCounter.vue'
import ClickCounter from './components/ClickCounter.vue'

export default {
  name: 'App',
  components: {
    PostList,
    CreatePost,
    ParentComponent,
    TemplateRefComponent,
    HoverCounter,
    ClickCounter
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
}

.section {
  margin-bottom: 40px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 4px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.divider {
  border: none;
  border-top: 2px solid #ccc;
  margin: 20px 0;
}

.counter-section {
  display: flex;
  justify-content: space-around;
}

.json-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>
