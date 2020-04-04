
<script>
export default {
  created () {
    this.$store.dispatch('logout')
    this.$router.push({ name: 'login' })
  }
}
</script>

<template>
  <div />
</template>

<style></style>
