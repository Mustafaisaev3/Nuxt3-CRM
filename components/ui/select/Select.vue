<template>
  <div class="relative w-auto" ref="wrapper">
    <div class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" @click="toggleOptions">
      <span v-if="modelValue">{{ getSelectedOptionLabel }}</span>
      <span v-else>{{ label }}</span>
    </div>
    <div class="bg-gray-50 border border-gray-300 text-gray-900 max-h-40 overflow-y-auto text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" v-if="showOptions">
      <div class="p-2 cursor-pointer hover:bg-[#6B7280] hover:text-[#ffffff]" v-for="(option, index) in options" :key="index" @click="selectOption(option)">
        {{ option.label || option[optionLabelKey] }}
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, computed } from 'vue'

export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: null
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

    const getSelectedOptionLabel = computed(() => {
      const selectedOption = props.options.find(option => option[props.optionValueKey] === props.modelValue)
      return selectedOption ? selectedOption[props.optionLabelKey] : ''
    })

    const toggleOptions = () => {
      showOptions.value = !showOptions.value
    }

    const selectOption = (option) => {
      emit('update:modelValue', option[props.optionValueKey])
      showOptions.value = false
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
      selectOption,
      getSelectedOptionLabel
    }
  }
}
</script>