import { Notify  } from 'quasar'

export const waiting = function (msg) {
  return Notify.create({
    type: 'ongoing',
    message: msg
  })
}

export const success = function (notif, msg) {
  if (notif == undefined) {
    Notify.create({
      type: 'positive',
      message: msg
    })
    return
  }

  notif({
    type: 'positive',
    message: msg
  })
}

export const fail = function (notif, msg, error) {
  var data = error

  if (error.response != undefined) {
    data = error.response.data
  }

  if (notif == undefined) {
    Notify.create({
      type: 'negative',
      message: msg + ": " + error,
      caption: JSON.stringify(data)
    })
    return
  }

  console.log(notif)
  
  notif({
    type: 'negative',
    message: msg + ": " + error,
    caption: JSON.stringify(data)
  })
}

export default (
  success,
  fail,
  waiting
)