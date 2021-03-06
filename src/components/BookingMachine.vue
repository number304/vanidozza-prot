<template>
  <v-container class="mt-4">
    <v-card max-width="360" class="text-center mx-auto pa-4">

      <h3 class="text-h4 font-weight-medium">Book a service</h3>
      <p class="text-overline">Your new look awaits you</p>

      <v-form
        v-model="isValid"
        @submit="postBooking({
          clientName, selectedService, bookingDate, bookingPrice, extra1, extra2, extra3
        })"
      >

        <v-text-field
          v-model="clientName"
          label="Your name"
          :rules="rules"
        ></v-text-field>
        <v-select
          v-model="selectedService"
          label="services" return-object
          :items="services" item-text="name"
          :rules="[ value => !!value || 'Required.' ]"
          @change="setPrice" clearable
        ></v-select>
        <v-select
          :items="extras" item-text="name" return-object
          label="optional extras"
          v-model="extra1" @change="setPrice"
          :disabled="!selectedService" clearable
        ></v-select>
        <v-select
          :items="extras" item-text="name" return-object
          label="optional extras" v-if="extra1"
          v-model="extra2" @change="setPrice"
          :disabled="!extra1" clearable
        ></v-select>
        <v-select
          :items="extras" item-text="name" return-object
          label="optional extras" v-if="extra2"
          v-model="extra3" @change="setPrice"
          :disabled="!extra2" clearable
        ></v-select>
        <date-picker
          type="datetime"
          v-model="bookingDate"
          format="ddd D MMM, hh:mm a"
          :time-picker-options="{
            start: '08:30',
            step: setStep,
            end: '18:30',
            format: 'ddd, hh:mm a'
          }"
          :disabled-date="notBeforeToday"
          :disabled-time="disabledHours"
          :disabled="!selectedService"
        />
        <v-card-actions class="d-flex justify-center">
          <v-btn
            class="px-4"
            type="submit"
            :disabled="!isValid || !bookingDate"
          >
            Confirm
          </v-btn>
        </v-card-actions>

        <p v-if="selectedService">The price is {{ bookingPrice }} dollars.</p>

      </v-form>

    </v-card>
  </v-container>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { postBooking } from '../services/api'

export default {
  components: { DatePicker },
  data() {
    return {
      isValid: false,
      clientName: '',
      services: [],
      extras: [],
      selectedService: null,
      extra1: null,
      extra2: null,
      extra3: null,
      bookingPrice: null,
      bookingDate: null,
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'At least 3 characters.',
      ],
    }
  },
  async mounted() {
    this.services = await fetch('http://localhost:3000/services')
      .then(res => res.json())

    this.extras = await fetch('http://localhost:3000/extras')
      .then(res => res.json())
  },
  computed: {
    setStep() {
      return this.selectedService !== null ? this.selectedService.step : '00:30'
    }
  },
  methods: {
    setPrice() {
      let extraPrice1 = 0
      if (this.extra1) extraPrice1 = this.extra1.price

      let extraPrice2 = 0
      if (this.extra2) extraPrice2 = this.extra2.price

      let extraPrice3 = 0
      if (this.extra3) extraPrice3 = this.extra3.price

      this.bookingPrice = this.selectedService.price + extraPrice1 + extraPrice2 + extraPrice3
    },
    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0,0,0,0))
    },
    disabledHours(date) {
      return this.selectedService.bookings.includes(date.toISOString())
    },
    postBooking,
  }
}
</script>
