<template>
  <v-container>
    <h2 class="text-center text-h4 font-weight-medium mb-4">
      Current Reservations
    </h2>
    <BookedItem
      v-for="(booking, index) in bookings"
      :key="index"
      :booking="booking"
      @update-bookings="updateList"
    />
    <p v-if="!bookings || bookings.length === 0" class="text-center">
      No reservations, for now 😉.
    </p>
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
  },
  methods: {
    updateList(id) {
      this.bookings = this.bookings.filter(i => i.id !== id)
    }
  }
}
</script>
