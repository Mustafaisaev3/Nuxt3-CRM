<template>
  <div class="relative w-auto" ref="wrapper">
    <div class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" @click="toggleOptions">
      <span v-if="modelValue.length > 0">Выбранно - {{ modelValue.length }}</span>
      <span v-else>{{ label }}</span>
    </div>
    <div class="bg-gray-50 border border-gray-300 text-gray-900 max-h-40 overflow-y-auto text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" v-if="showOptions">
      <div class="p-2 cursor-pointer hover:bg-[#6B7280] hover:text-[#ffffff]" v-for="(option, index) in options" :key="index" @click="toggleOption(option)"
        :class="{ 'text-[#1dff1d] font-semibold': modelValue.includes(option.value || option[optionValueKey]) }">
        {{ option.label || option[optionLabelKey] }}
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'

export default {
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    optionValueKey: {
      type: String,
      required: false
    },
    optionLabelKey: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    }
  },
  setup(props, { emit }) {
    const wrapper = ref(null)
    const showOptions = ref(false)

    const toggleOptions = () => {
      showOptions.value = !showOptions.value
    }

    const toggleOption = (option) => {
      let newValue = [...props.modelValue]
      if (props.modelValue.includes(option[props.optionValueKey])) {
        newValue = newValue.filter(o => o !== option[props.optionValueKey])
      } else {
        newValue.push(option[props.optionValueKey])
      }
      console.log(option, newValue)
      emit('update:modelValue', [...newValue])
    }

    const handleClickOutside = (event) => {
      if (wrapper.value && !wrapper.value.contains(event.target)) {
        showOptions.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      window.removeEventListener('click', handleClickOutside)
    })

    return {
      wrapper,
      showOptions,
      toggleOptions,
      toggleOption
    }
  }
}
</script>