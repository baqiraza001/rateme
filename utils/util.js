const jwt = require("jsonwebtoken");
const moment = require("moment/moment");

const userTypes = {
  USER_TYPE_SUPER: 1,
  USER_TYPE_STANDARD: 2,
}

//create jwt token function
function createJWTToken(user, expiryInHours = 6) {
  const payload = {
    uid: user._id,
    iat: moment().unix(),
    exp: moment().add(expiryInHours, "hours").unix(),
    claims: {
      name: user.name,
      email: user.email,
    },
  };

  // pormise is used for asyn tasks
  let myPromise =  new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_ENCRYPTION_KEY, (err, token) => {
      if(err)
        reject(err);
      else
        resolve(token);
    });
  });
  return myPromise;
}


module.exports = {
  userTypes,
  createJWTToken
};