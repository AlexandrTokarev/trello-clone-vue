<template>
  <button :class="$style.button">
    <slot />
  </button>
</template>

<style module>
.button {
  background: var(--color-primary);
  color: var(--color-text-main);
  border: none;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: var(--color-primary-hover);
  }
}
</style>
