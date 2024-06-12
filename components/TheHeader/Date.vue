<template>
    <div class='dateContainer'>
      <NuxtTime :datetime="new Date()" weekday="short" class="dateName "/>
      <NuxtTime :datetime="new Date()" day="numeric" class="dateNumber"/>
    </div>
</template>

<style scoped>
.dateName {
  text-transform: capitalize;
  font-size: 0.8em;
  padding-bottom: 0;
  margin-bottom: 0;
}
.dateNumber {
  font-size: 1.5em;
  padding-top: 0;
  margin-top: 0;
}
.dateContainer {
  border-right: 2px solid rgb(141, 150, 159);
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 10px;
}
</style>
