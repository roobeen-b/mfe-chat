// import CryptoJS from "crypto-js";

// const SECRET_KEY = "your-secure-shared-key"; // Must be 32 characters

// const encryptData = (
//   data: Record<string, any>,
//   key: string = SECRET_KEY
// ): string => {
//   const dataString = JSON.stringify(data);
//   const encrypted = CryptoJS.AES.encrypt(
//     dataString,
//     CryptoJS.enc.Utf8.parse(key),
//     {
//       iv: CryptoJS.enc.Utf8.parse(key.substring(0, 16)), // Use the first 16 chars of the key as IV
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     }
//   );

//   return encrypted.toString();
// };
// const decryptData = (
//   encryptedMessage: string,
//   key: string = SECRET_KEY
// ): Record<string, any> => {
//   const decryptedBytes = CryptoJS.AES.decrypt(
//     encryptedMessage,
//     CryptoJS.enc.Utf8.parse(key),
//     {
//       iv: CryptoJS.enc.Utf8.parse(key.substring(0, 16)), // Use the first 16 chars of the key as IV
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     }
//   );

//   const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

//   // Parse the JSON string back into an object
//   return JSON.parse(decryptedText);
// };
// // --nodejs--
// // const ALGORITHM = "aes-256-cbc";
// // const decryptData = (
// //   encryptedMessage: string,
// //   key: string = SECRET_KEY
// // ): Record<string, any> => {
// //   const iv = Buffer.from(key.substring(0, 16), "utf8"); // Use the first 16 chars of the key as IV
// //   const decipher = CryptoJS.createDecipheriv(
// //     // const decipher = crypto.createDecipheriv(
// //     ALGORITHM,
// //     Buffer.from(key, "utf8"),
// //     iv
// //   );

// //   const decrypted = Buffer.concat([
// //     decipher.update(Buffer.from(encryptedMessage, "base64")),
// //     decipher.final(),
// //   ]);
// //   return JSON.parse(decrypted.toString());
// // };

// // Example usage:
// // const payload = { email: "user@example.com", convo_id: "12345", message: "Hello, Chat B!" };
// // const encryptedMessage = encryptMessage(payload);
// // --- php ---
// // function encryptMessage($data, $secretKey) {
// //   $iv = substr($secretKey, 0, 16); // Use the first 16 chars of the key as IV
// //   $jsonData = json_encode($data);

// //   $encrypted = openssl_encrypt(
// //       $jsonData,
// //       'aes-256-cbc',
// //       $secretKey,
// //       0, // Options
// //       $iv
// //   );

// //   return $encrypted;
// // }
// // Example usage:
// // $data = ['email' => 'user@example.com', 'convo_id' => '12345', 'message' => 'Hello, Chat B!'];
// // $secretKey = 'your-secure-shared-key'; // Must be 32 characters
// // $encryptedMessage = encryptMessage($data, $secretKey);
// export { encryptData, decryptData };
