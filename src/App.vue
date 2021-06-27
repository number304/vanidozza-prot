<template>
  <v-app>
    <TheHeader/>
    <v-main>
        <BookingMachine/>
        <BookingList/>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from './components/TheHeader'
import BookingMachine from './components/BookingMachine'
import BookingList from './components/BookingList'

export default {
  name: 'App',
  components: {
    TheHeader,
    BookingMachine,
    BookingList
  },
};
</script>
