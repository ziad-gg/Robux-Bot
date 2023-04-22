const { Schema, model } = require('mongoose');

const guildsSchema = new Schema({
  guildId: String,
  language: {type: String, default: "ar"},
  prefix: {type: String, default: "-"},
  cookie: {type: String, default: ""},
  status: Boolean,
  proofchannel: {type: String, default: ""},
  thanksChannel: {type: String, default: ""},
  blacklisted: {type: Boolean, default: false},
  groupId: {type: Number, default: 0},
  timer: {type: Boolean, default: false},
  clientRole: {type: String, default: ""},
  price: {type: Number, default: 1000},
  owner: {type: String, default: ""},
  thankschannel: {type: String, default: ""},
  logsChannel: {type: String, default: ""},
  boostRole: {type: String, default: ""},
  xscrf: {
    data: String,
    cookie: String,
    value: String,
  },
  limit: {
    buy: {type: Number, default: 1},
    transfer: {type: Number, default: 1},
  },
});

guildsSchema.statics.get = async function (guildId) {
    let oldData = await this.findOne({ guildId });
    return oldData? oldData : await this.create({ guildId });
}

module.exports = model("Guilds", guildsSchema);