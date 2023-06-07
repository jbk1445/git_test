<template>
    <div>
      <span
        class="toggle-wrapper"
        role="checkbox"
        :area-checked="value.toString()"
        tabindex="disabled ? -1 : 0"
        @click="toggle"
        @keydown.space.prevent="toggle"
      >
        <span :class="backgroundStyles" class="toggle-background" />
        <span :style="indicatorStyles" class="toggle-indicator" />
      </span>
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    backgroundStyles () {
      return {
        'gold-mid': this.value,
        'gray-lighter': !this.value,
        disabled: !this.disabled
      }
    },
    indicatorStyles () {
      return { transform: this.value ? 'translateX(30px)' : 'translateX(0)' }
    }
  },
  methods: {
    toggle () {
      if (!this.disabled) {
        this.$emit('input', !this.value)
      }
    }
  }
}
</script>

<style>
.gold-mid {
  background-color: #666666;
}

.gray-lighter {
  background-color: #c2c2c2;
}

.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.toggle-wrapper {
  display: inline-block;
  position: relative;
  cursor: pointer;
  width: 64px;
  height: 36px;
  border-radius: 9999px;
}

.toggle-wrapper:focus {
  outline: 0;
}

.toggle-background {
  display: inline-block;
  border-radius: 9999px;
  height: 100%;
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.4s ease;
}

.toggle-indicator {
  position: absolute;
  height: 28px;
  width: 28px;
  left: 4px;
  bottom: 4px;
  background-color: #ffffff;
  border-radius: 9999px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease;
}
</style>
