<template>
  <v-card max-width="320px" class="mx-auto text-center pa-4 mb-4">
    <h4>{{ booking.client }}</h4>
    <p class="mb-0">
      Reserved a {{ service }} for {{ bookingDate }} with
      <span v-for="(extra, index) in extras" :key="index">
         {{ extra }}<span v-if="index < extras.length - 2">,</span>
        <span v-else-if="index === extras.length - 2"> and</span>
      </span>
       for {{ booking.price }} dollars.
    </p>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      options: {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      },
      extras: [],
      service: '',
    }
  },
  props: {
    booking: null,
  },
  computed: {
    bookingDate() {
      const date = new Date(this.booking.datetime)
      return date.toLocaleDateString('en', this.options).toLowerCase()
    }
  },
  async mounted() {
    this.service = await fetch(`http://localhost:3000/services/${this.booking.service}`)
      .then(res => res.json()).then(data => data.name.toLowerCase())

    this.extras = await Promise.all(this.booking.extras
      .map((id) => {
        const extra = fetch(`http://localhost:3000/extras/${id}`)
          .then(res => res.json())
          .then(data => data.name.toLowerCase())
        return extra
      })
    )
  }
}
</script>