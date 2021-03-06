const url = 'http://localhost:3000/'

export async function postBooking(booking) {
  let extras = []

  if(booking.extra1) extras.push(booking.extra1.id)
  if(booking.extra2) extras.push(booking.extra2.id)
  if(booking.extra3) extras.push(booking.extra3.id)

  let serviceBookings = booking.selectedService.bookings
  serviceBookings.push(booking.bookingDate.toISOString())

  await Promise.all([
    fetch(`${url}bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client: booking.clientName,
        service: booking.selectedService.id,
        extras: extras,
        datetime: booking.bookingDate.toISOString(),
        price: booking.bookingPrice,
      })
    }),
    fetch(`${url}services/${booking.selectedService.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookings: serviceBookings })
    })
  ])
}

export async function deleteBooking(booking) {
  const updatedBookings = await fetch(`${url}services/${booking.service}`)
    .then(res => res.json())
    .then(service => service.bookings.filter(i => i!== booking.datetime))

  await fetch(`${url}bookings/${booking.id}`, {
    method: 'DELETE'
  })

  await fetch(`${url}services/${booking.service}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookings: updatedBookings })
  })
}
