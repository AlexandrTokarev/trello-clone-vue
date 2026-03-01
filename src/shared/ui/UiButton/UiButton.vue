<script setup lang="ts">
import { useSlots, type ButtonHTMLAttributes } from 'vue';
import { IconLoader2 } from '@tabler/icons-vue';

export interface UiButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  /** Вариант оформления */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Размер кнопки */
  size?: 'sm' | 'md' | 'lg';
  /** Состояние загрузки */
  loading?: boolean;
  /** Отключенное состояние */
  disabled?: boolean;
  /** Кнопка на всю ширину */
  fullWidth?: boolean;
  /** HTML тип кнопки */
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<UiButtonProps>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  fullWidth: false,
  type: 'button',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const slots = useSlots();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<template>
  <button
    :class="[
      $style.button,
      $style[`variant-${variant}`],
      $style[`size-${size}`],
      {
        [$style.loading]: loading,
        [$style.fullWidth]: fullWidth,
        [$style.hasIconLeft]: !!slots['icon-left'],
        [$style.hasIconRight]: !!slots['icon-right'],
      },
    ]"
    :type="type"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <span v-if="loading" :class="$style.spinner">
      <IconLoader2 />
    </span>

    <!-- Left Icon -->
    <span v-if="slots['icon-left'] && !loading" :class="$style.iconLeft">
      <slot name="icon-left" />
    </span>

    <!-- Content -->
    <span :class="$style.content">
      <slot />
    </span>

    <!-- Right Icon -->
    <span v-if="slots['icon-right']" :class="$style.iconRight">
      <slot name="icon-right" />
    </span>
  </button>
</template>

<style module>
.button {
  /* Local CSS Variables */
  --btn-height: var(--ds-spacing-10);
  --btn-padding-x: var(--ds-spacing-4);
  --btn-padding-y: var(--ds-spacing-2);
  --btn-font-size: var(--ds-font-size-sm);
  --btn-font-weight: var(--ds-font-weight-medium);
  --btn-radius: var(--ds-radius-lg);
  --btn-gap: var(--ds-spacing-2);

  --btn-bg: var(--ds-color-primary-600);
  --btn-bg-hover: var(--ds-color-primary-700);
  --btn-bg-active: var(--ds-color-primary-800);
  --btn-text: var(--ds-color-neutral-0);
  --btn-border: transparent;
  --btn-shadow: var(--ds-shadow-sm);
  --btn-shadow-hover: var(--ds-shadow-md);

  /* Base Styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--btn-gap);

  height: var(--btn-height);
  padding: var(--btn-padding-y) var(--btn-padding-x);

  font-family: var(--ds-font-family-sans);
  font-size: var(--btn-font-size);
  font-weight: var(--btn-font-weight);
  line-height: var(--ds-line-height-tight);
  text-decoration: none;
  white-space: nowrap;

  color: var(--btn-text);
  background: var(--btn-bg);
  border: 1px solid var(--btn-border);
  border-radius: var(--btn-radius);
  box-shadow: var(--btn-shadow);

  cursor: pointer;
  user-select: none;
  transition:
    background-color var(--ds-transition-fast),
    border-color var(--ds-transition-fast),
    box-shadow var(--ds-transition-fast),
    transform var(--ds-transition-fast);
}

.button:hover:not(:disabled) {
  background-color: var(--btn-bg-hover);
  box-shadow: var(--btn-shadow-hover);
}

.button:active:not(:disabled) {
  background-color: var(--btn-bg-active);
  transform: translateY(1px);
}

.button:focus-visible {
  outline: 2px solid var(--ds-color-primary-500);
  outline-offset: 2px;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ═══════════════════════════════════════════════════════════
   VARIANTS
   ═══════════════════════════════════════════════════════════ */

.variant-primary {
  --btn-bg: linear-gradient(180deg, var(--ds-color-primary-500), var(--ds-color-primary-600));
  --btn-bg-hover: linear-gradient(180deg, var(--ds-color-primary-400), var(--ds-color-primary-500));
  --btn-bg-active: var(--ds-color-primary-700);
  --btn-text: var(--ds-color-neutral-0);
  --btn-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 6px 16px rgba(79, 70, 229, 0.35);
  --btn-shadow-hover: 0 2px 4px rgba(0, 0, 0, 0.12), 0 10px 24px rgba(79, 70, 229, 0.45);
}

/* SECONDARY — мягкая, “карточная” */
.variant-secondary {
  --btn-bg: var(--ds-color-neutral-0);
  --btn-bg-hover: var(--ds-color-neutral-100);
  --btn-bg-active: var(--ds-color-neutral-200);
  --btn-text: var(--ds-color-neutral-800);
  --btn-border: var(--ds-color-neutral-200);
  --btn-shadow: var(--ds-shadow-sm);
  --btn-shadow-hover: var(--ds-shadow-md);
}

/* OUTLINE — легкая рамка */
.variant-outline {
  --btn-bg: transparent;
  --btn-bg-hover: var(--ds-color-primary-50);
  --btn-bg-active: var(--ds-color-primary-100);
  --btn-text: var(--ds-color-primary-600);
  --btn-border: var(--ds-color-primary-300);
  --btn-shadow: none;
  --btn-shadow-hover: none;
}

/* GHOST — как текстовая кнопка */
.variant-ghost {
  --btn-bg: transparent;
  --btn-bg-hover: var(--ds-color-neutral-100);
  --btn-bg-active: var(--ds-color-neutral-200);
  --btn-text: var(--ds-color-neutral-700);
  --btn-border: transparent;
  --btn-shadow: none;
  --btn-shadow-hover: none;
}

/* DANGER — тревожная */
.variant-danger {
  --btn-bg: linear-gradient(180deg, var(--ds-color-error-500), var(--ds-color-error-600));
  --btn-bg-hover: linear-gradient(180deg, var(--ds-color-error-400), var(--ds-color-error-500));
  --btn-bg-active: var(--ds-color-error-700);
  --btn-text: var(--ds-color-neutral-0);
  --btn-shadow: 0 6px 16px rgba(220, 38, 38, 0.35);
  --btn-shadow-hover: 0 10px 24px rgba(220, 38, 38, 0.45);
}
/* ═══════════════════════════════════════════════════════════
   SIZES
   ═══════════════════════════════════════════════════════════ */

.size-sm {
  --btn-height: var(--ds-spacing-8);
  --btn-padding-x: var(--ds-spacing-3);
  --btn-font-size: var(--ds-font-size-xs);
  --btn-gap: var(--ds-spacing-1);
}

.size-md {
  --btn-height: var(--ds-spacing-10);
  --btn-padding-x: var(--ds-spacing-4);
  --btn-font-size: var(--ds-font-size-sm);
}

.size-lg {
  --btn-height: var(--ds-spacing-12);
  --btn-padding-x: var(--ds-spacing-6);
  --btn-font-size: var(--ds-font-size-base);
  --btn-gap: var(--ds-spacing-3);
}

/* ═══════════════════════════════════════════════════════════
   MODIFIERS
   ═══════════════════════════════════════════════════════════ */

.fullWidth {
  width: 100%;
}

.loading {
  pointer-events: none;
}

/* ═══════════════════════════════════════════════════════════
   INNER ELEMENTS
   ═══════════════════════════════════════════════════════════ */

.content {
  display: inline-flex;
  align-items: center;
}

.iconLeft,
.iconRight {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.iconLeft svg,
.iconRight svg {
  width: 1em;
  height: 1em;
  font-size: 1.25em;
}

.spinner {
  display: inline-flex;
  animation: spin 1s linear infinite;
}

.spinner svg {
  width: 1.25em;
  height: 1.25em;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Icon spacing adjustments */
.hasIconLeft .content {
  margin-left: calc(var(--btn-gap) * -0.25);
}

.hasIconRight .content {
  margin-right: calc(var(--btn-gap) * -0.25);
}
</style>
