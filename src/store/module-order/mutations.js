export function updateOrder (state, order) {
  state.orders[order.ID] = order
}
