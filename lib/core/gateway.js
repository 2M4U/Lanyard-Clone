const { EventEmitter } = require("events");
const { WebSocket } = require("ws");
const { token, activity } = require("./../../settings/config").config[0];
const fetchUser = require("./../modules/fetchUser");
const format = require("./../structs/format");
payload = {
  op: 2,
  d: {
    token: token,
    intents: 4867,
    properties: {
      $os: "lanyard-clone",
      $browser: "Discord iOS",
      $device: "Discord iOS",
    },
    compress: false,
    presence: {
      activities: [
        {
          name: activity,
          type: 1,
        },
      ],
      large_threshold: 250,
      status: "dnd",
      since: 91879201,
      afk: false,
    },
  },
};
class DiscordGateway extends EventEmitter {
  constructor() {
    super();
    this.ws = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json");
    this.ws.addEventListener("open", () => {
      this.ws.send(JSON.stringify(payload));
      this.emit("Websocket Open");
    });
    this.ws.addEventListener("message", (res) => {
      try {
        this.message(JSON.parse(res.data));
      } catch (error) {}
    });
    this.ws.addEventListener("close", (e) => {
      clearInterval(this.heartbeart);
    });
  }
  send(op, d) {
    if (this.ws.readyState !== this.ws.OPEN) return;
    return this.ws.send(JSON.stringify({ op, d }));
  }

  sendHeartbeat() {
    return this.ws.send(JSON.stringify({ op: 1, d: null }));
  }
  async message(data) {
    const { t, event, op, d } = data;
    switch (op) {
      case 10:
        const { heartbeat_interval } = d;
        this.heartbeart = setInterval(() => {
          this.sendHeartbeat();
        }, heartbeat_interval);
        break;
    }
    switch (t) {
      case "READY":
      case "PRESENCE_UPDATE":
        let user = await fetchUser(d.user.id);
        const { avatar, discriminator, id, username } = user;
        let activities = d.activities;
        for (const acts in activities) {
          const { type, timestamps, state, details, name, created_at, assets } =
            activities[acts];
          let struct = format(
            type,
            timestamps,
            state,
            details,
            name,
            created_at,
            assets,
            avatar,
            discriminator,
            id,
            username
          );
          this.emit("lanyard", struct);
        }
    }
  }
}
module.exports = DiscordGateway;
