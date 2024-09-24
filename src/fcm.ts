var admin = require("firebase-admin");
import { getMessaging } from "firebase-admin/messaging";

// Fetch the service account key JSON file contents
var serviceAccount = require("/home/xtan/.secrets/employeemanager-8fc51-firebase-adminsdk-26tfh-95845a107a.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  // databaseURL:
  // "https://employeemanager-8fc51-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.firestore();
var ref = db.collection("fcmtokens");
ref
  .get()
  .then((snapshot: any) => {
    if (snapshot.empty) {
      console.log("not  matching any documents");
    } else {
      snapshot.forEach((doc: any) => {
        console.log(doc.id, "=>", doc.data());
      });
    }
  })
  .catch((error: any) => {
    console.log("error", error);
  });

setTimeout(() => {
  sendCloudMessagetoDevice();
}, 2000);

const sendCloudMessagetoDevice = () => {
  const registrationToken =
    "d3-A8375RXiCAT_f5Xm_kP:APA91bEGj_03XOXuV0oiNADPs8Ux10S8tYysxSAvnXk24l7IPp5Y-Iut-BbvQFt0SV24Pc016SaRLL5_3qIfce4epcN73Gn1iUXE7Wa0t5sIpks8C02Af6UwRnDFTZfQC8Yuba66lusf";

  const message = {
    data: {
      title: "Message From EasyEms",
      body: "Message Description Lorem Ipsum ",
    },
    token: registrationToken,
  };

  getMessaging()
    .send({
      data: {
        title: "Message From EasyEms",
        body: "Message Description Lorem Ipsum ",
      },
      token: registrationToken,

      android: {
        priority: "high",
      },
    })
    .then((response: any) => {
      console.log("successfully send message", response);
    })
    .catch((error: any) => {
      console.log("Error occured while sending message", error);
    });
};
