const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
    userId: { type: String },
    guildId: { type: String },
    coins: { type: Number, default:0 },
});

UsersSchema.statics.get = async function (guildId, userId) {
  const oldData = await this.findOne({ guildId, userId });
  return oldData? oldData : await this.create({ guildId, userId });
};

module.exports = model("Users", UsersSchema);