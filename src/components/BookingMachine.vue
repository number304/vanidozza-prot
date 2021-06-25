<template>
  <v-container class="mt-4">
    <v-card max-width="360" class="text-center mx-auto pa-4">

      <h3 class="text-h4 font-weight-medium">Book a service</h3>
      <p class="text-overline">Your new look awaits you</p>

      <v-form v-model="isValid">

        <v-text-field
          v-model="clientName"
          label="Your name"
          :rules="rules"
        ></v-text-field>
        <v-select :items="services" label="services" v-model="selectedService" :rules="rules"></v-select>
        <v-select :items="extras" label="optional extras" v-model="selectedExtra"></v-select>
        <date-picker
          type="datetime"
          v-model="bookingDate"
          format="ddd D MMM, hh:mm a"
          :time-picker-options="timeOptions"
        />
        <v-card-actions class="d-flex justify-center">
          <v-btn class="px-4" :disabled="!isValid">Confirm</v-btn>
        </v-card-actions>

      </v-form>

    </v-card>
  </v-container>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  components: { DatePicker },
  data() {
    return {
      isValid: false,
      clientName: '',
      services: ['Haircut', 'Dye', 'Keratin Treatment', 'Hair straightener'],
      extras: ['Extra 1', 'Extra Attention', 'Extra 3', 'Premium Kelp Shampoo'],
      selectedService: null,
      selectedExtra: null,
      bookingDate: null,
      timeOptions: {
        start: '08:30',
        step: '00:30',
        end: '18:30',
        format: 'ddd, hh:mm a'
      },
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'At least 3 characters.',
      ],
    }
  },
}
</script>
