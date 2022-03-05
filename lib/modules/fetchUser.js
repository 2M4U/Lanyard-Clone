const { token } = require("./../../settings/config").config[0];
const fetch = require("axios");
const fetchUser = async (id) => {
  const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
    headers: {
      Authorization: `Bot ${token}`,
    },
  });
  if (!response.statusText === "OK")
    throw new Error(`Error status code: ${response.status}`);
  return await response.data;
};
module.exports = fetchUser;
