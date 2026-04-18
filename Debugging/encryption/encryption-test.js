import dotenv from 'dotenv'; //import env lib
dotenv.config({ path: '../.env' }); //sets the path of the env cause its not in same directory as this test file

import { encrypt } from '$lib/server/encryption.js';
 // Import the encryption functions from encryption.js

const test_key = "THIS IS A TEST SECRET KEY" // The key that is being encrypted. In production this will be the key the user inputs in settings

console.log ("ORIGINAL given key - " + test_key); // Shows orignal key to ensure that the key is correct

const encrypted = encrypt(test_key); // Encrypt the key with the function from encryption.js
console.log("ENCRYPTED - " + encrypted); // Prints the encrypted key to ensure it is in fact being encrypted properly

const decrypted = decrypt(encrypted); // Decrypts the key with the function from encryption.js
console.log("DECRYPTED - " + decrypted); // shows the decrypted key NOTE THIS SHOULD BE THE SAME AS THE INPUT KEY.