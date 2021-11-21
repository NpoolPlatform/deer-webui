import { Notify  } from 'quasar'

export const waiting = function (msg) {
  return Notify.create({
    type: 'ongoing',
    message: msg
  })
}

export const success = function (notif, msg) {
  if (notif === undefined) {
    Notify.create({
      type: 'positive',
      message: msg
    })
  }

  notif({
    type: 'positive',
    message: msg
  })
}

export const fail = function (notif, msg) {
  if (notif === undefined) {
    Notify.create({
      type: 'negative',
      message: msg
    })
  }
  
  notif({
    type: 'negative',
    message: msg
  })
}

export default (
  success,
  fail,
  waiting
)