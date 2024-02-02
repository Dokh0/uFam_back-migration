const Notification = require('../models/notification.model')

async function getNotificationById(req, res) {
    try {
        const notification = await Notification.findById(req.params.id)
        if (notification) {
            return res.status(200).json(notification);
        } else {
            return res.status(404).send('Notification not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createNotification(arg) {
    try {
        const { action, userId, contentId, contentType, likeId } = arg;

        const notificationData = {
            content: `${action} on ${contentType}`,
            userId: userId,
            contentId: null,
            commentId: null,
            likeId: likeId,
            blogId: null,
        };

        if (contentType === 'content') {
            notificationData.contentId = contentId;
        } else if (contentType === 'comment') {
            notificationData.commentId = contentId;
        }

        const notification = await Notification.create(notificationData);

        return notification
    } catch (error) {
        console.error("Error creating notification:", error.message);
        throw error
    }
}



async function deleteNotification(req, res) {
    try {
        const deleted = await Notification.findByIdAndDelete(req.params.id)
        if (deleted) {
            return res.status(200).send({ message: 'Notification deleted' })
        }
        return res.status(404).send('Notification not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    createNotification,
    getNotificationById,
    deleteNotification
}