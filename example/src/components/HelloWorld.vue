<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      进入
      <code>components/HelloWorld.vue</code> 查看使用范例
    </p>
  </div>

  <h2>
    可使用小驼峰法引用 className
  </h2>
  <!-- 若要在 js 中使用驼峰变量名，注意需要在 vite.config.ts 中配置 css.modules.localsConvention = 'camelCase' -->
  <p class="hint">className 使用 snake-case，或者 kebab-case 皆可</p>
  <p class="test_abc">
    className: {{$style.testAbc}} // snake-case
  </p>
  <p class="test-bcd">
    className: {{$style.testBcd}} // kebab-case 
  </p>
  <div class="other_abc">
    支持多 css modules
  </div>
</template>

<style module>
h2{
  margin-top: 20px;
}
.test_abc {
  color: #666;
}
.test-bcd {
  color: #888;
}

/* 全局样式，不受 css modules 影响  */
:global .hint {
  color: #333;
}
</style>

<style module='b'>
.other_abc {
  color: #999;
}
</style>
