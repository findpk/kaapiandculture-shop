const uuid = require('uuid'),
  _ = require('lodash'),
  moment = require('moment'),
  BaseWorker = require('./base-worker'),
  Enum = require('./../common/enum'),
  LotEventsDbAccessor = require('./../db-accessors/lot-events-accessor'),
  NotificationsDbAccessor = require('./../db-accessors/notifications-accessor'),
  MessageHistoryDbAccessor = require('./../db-accessors/message-history-accessor');

class ScheduleEventUpdateNotificationsWorker extends BaseWorker {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context)
  }

  async setDependencies() {
    const me = this
    try {
      this.lotEventsDbAccessor = new LotEventsDbAccessor(me.dependencies, me.configs, me.context)
      this.notificationsDbAccessor = new NotificationsDbAccessor(me.dependencies, me.configs, me.context)
      this.messageHistoryDbAccessor = new MessageHistoryDbAccessor(me.dependencies, me.configs, me.context)
    } catch (e) {
      throw e
    }
  }

  async run() {
    const me = this
    try {
      let activeEvents = await me.lotEventsDbAccessor.getActiveEvents()
      activeEvents = _.map(activeEvents, 'data')
      for (let event of activeEvents) {
        let eventId = _.get(event, 'event_id')
        let currentDate = moment().format('DD-MM-YYYY')
        let notificationType = Enum.NotificationTypes.WhatsApp
        let scheduledNotification = await me.notificationsDbAccessor.getByEventIdTypeAndDate(eventId, notificationType, currentDate)
        if (!_.isEmpty(scheduledNotification)) {
          me.dependencies.pgp.tx('schedule-notification', async t => {
            let notificationData = {
              id: uuid.v4(),
              status: Enum.NotificationStatus.Scheduled,
              event_id: eventId,
              date: currentDate,
              type: notificationType,
              content: `Reminder for today's update`
            }
            let messageHistoryData = {
              id: uuid.v4(),
              status: Enum.MessageHistoryStatus.Queued,
              exchange: Enum.Exchanges.Notifications,
              retry_count: 0,
              delay_in_secs: 0,
              message_data: {
                notification_id: notificationData.id
              },
              meta_data: {}
            }
            await me.notificationsDbAccessor.insert(notificationData)
            await me.messageHistoryDbAccessor.insert(messageHistoryData)
          })
            .then(data => {
              console.log('Scheduled notification successfully')
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    } catch (e) {
      throw e
    }
  }

}

let scheduleEventUpdateNotificationsWorker = new ScheduleEventUpdateNotificationsWorker({}, {}, {})
scheduleEventUpdateNotificationsWorker.start()