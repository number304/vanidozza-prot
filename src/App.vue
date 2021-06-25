<template>
  <v-app>
    <TheHeader/>
    <v-main>
      <BookingMachine/>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from './components/TheHeader'
import BookingMachine from './components/BookingMachine'

export default {
  name: 'App',

  components: {
    TheHeader,
    BookingMachine
  },

  data: () => ({
    //
  }),
};
</script>
