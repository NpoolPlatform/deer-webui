export function updatePayment (state, payment) {
  state.payments[payment.ID] = payment
}
