<template>
  <v-container>
    <h2 class="text-center text-h4 font-weight-medium mb-4">
      Current Reservations
    </h2>
    <BookedItem
      v-for="booking in bookings"
      :key="booking.id"
      :booking="booking"
    />
  </v-container>
</template>

<script>
import BookedItem from './BookedItem'

export default {
  components: {
    BookedItem,
  },
  data: () => ({
    bookings: null,
  }),
  async mounted() {
    this.bookings = await fetch('http://localhost:3000/bookings')
      .then(res => res.json())
  }
}
</script>
