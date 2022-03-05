function Structure(
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
) {
  let typeText;
  switch (type) {
    case 0:
      typeText = "Playing";
      break;
    case 1:
      typeText = "Streaming";
      break;
    case 2:
      typeText = "Listening to";
      break;
    case 3:
      typeText = "Streaming";
      break;
    case 4:
      typeText = null;
      break;
    case 5:
      typeText = "Competing";
      break;
  }
  const struct = {
    username: username,
    tag: `${username}#${discriminator}`,
    discriminator: discriminator,
    avatar: `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp?size=32`,
    name: name,
    type: typeText,
    state: state || null,
    details: details || null,
    created: created_at,
    assets: assets || null,
    timestamps: timestamps || null,
  };
  return struct;
}
module.exports = Structure;
