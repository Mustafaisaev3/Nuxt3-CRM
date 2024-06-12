<template>
  <div>
     <button
      class="btn-common btn-additional"
      @click="toggleList"
    >
      <!--svg
        class="w-4 h-4 mr-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2.5"
          d="M4.5 19A3.5 3.5 0 0 1 1 15.5V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v13.5A3.5 3.5 0 0 1 4.5 19Zm0 0H18a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-4.938a1 1 0 0 0-.697.283l-4.238 4.124a1.046 1.046 0 0 0-.164.208C6.986 18.228 6.184 18.705 4.5 19Zm0-4h.01m8.925-12.293 3.536 3.536a1 1 0 0 1 0 1.414L8 16.627v-9.9l4.02-4.02a1 1 0 0 1 1.415 0Z"
        ></path>
      </svg-->
      <!-- <span class="w-6 h-4 rounded ml-2 dark:bg-secondary-light-text"></span> -->
          <span class="hidden">Change color</span>
          <!-- <h1>Color mode: {{ colorMode.preference }}</h1> -->
          <select v-model="colorMode.preference" class="custom-select">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="sepia">Sepia</option>
        </select>
    </button>
  </div>
</template>

<script>
export default {
  props: ['colorMode']
}
</script>

<style scoped>
select {
  /* Удаление стандартного стиля элемента Select */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  /* пользовательские стилей */
  padding: 0.2rem;
  border-radius: 0.3rem;
  background-color: #87719f;
  color: #f9f9f9;
}

/* Стили для опций внутри элемента Select */
option {
  color: #87719f;
  background-color: #fff;
}

select:hover, select:focus {
  border-color: #666;
}
</style>