/* const User = require("../api/models/user.model");
const Blog = require("../api/models/blog.model");
const Family = require("../api/models/family.model");
const Message = require("../api/models/message.model");
const Notification = require("../api/models/notification.model");
const Like = require("../api/models/like.model");
const VerifiedEmail = require("../api/models/verified_email.model");
const Contents = require("../api/models/content.model");
const Comment_Contents = require("../api/models/comment_contents.model");

function setRelations() {
  try {

    User.hasMany(Contents)
    Contents.belongsTo(User)

    User.hasMany(Like)
    Like.belongsTo(User)

    User.hasMany(Notification)
    Notification.belongsTo(User)

    User.hasMany(Blog)
    Blog.belongsTo(User)

    User.hasMany(Message)
    Message.belongsTo(User)

    User.hasMany(Comment_Contents)
    Comment_Contents.belongsTo(User)

    Family.hasMany(User)
    User.belongsTo(Family)

    Family.hasMany(VerifiedEmail)
    VerifiedEmail.belongsTo(Family)

    Contents.hasMany(Like)
    Like.belongsTo(Contents)

  } catch (error) {
    console.log(error);
  }
}

module.exports = { setRelations };
 */