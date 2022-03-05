const DiscordGateway = require("./lib/core/gateway");
const Lanyard = new DiscordGateway();
Lanyard.on("lanyard", console.log);
