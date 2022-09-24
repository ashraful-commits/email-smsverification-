const axios = require('axios');

const sendSMSfuction = async (to, mess) => {
  await axios
    .get(
      `https://bulksmsbd.net/api/smsapi?api_key=FoQplkCZCruJJvsZAmFn&type=text&number=${to}&senderid=8809612443871&message=${mess}`
    )
    .then((res) => {
      console.log('done');
    })
    .catch((err) => {
      console.log('failed');
    });
};
module.exports = sendSMSfuction;
