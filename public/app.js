/** @type {HTMLButtonElement} */
const connectButton = document.querySelector("#connect");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");

/** @type {BluetoothRemoteGATTCharacteristic} */
let characteristic;

connectButton.addEventListener("click", async () => {
  // Request HC-05 Bluetooth device
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
  });
  console.log("Bluetooth device selected:", device.name);
  // Connect to the device
  const server = await device.gatt.connect().catch(reason => {
    console.error("Failed to connect", reason);
  });
  if (server) console.log("Connected to Bluetooth device GATT server");
  else return;
  // Access services and characteristics
  // For example:
  const service = await server.getPrimaryService(
    "0000ffe0-0000-1000-8000-00805f9b34fb",
  ); // Service UUID of HC-05
  console.log("Got service:", service.uuid);
  // Access characteristics and interact with the device
  // For example:
  characteristic = await service.getCharacteristic(
    "0000ffe1-0000-1000-8000-00805f9b34fb",
  ); // Characteristic UUID of HC-05
  console.log("Got characteristic:", characteristic.uuid);
});

/** @param {Uint8Array} data */
function sendData(data) {
  characteristic
    .writeValue(data)
    .then(() => {
      console.log("Data sent successfully");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
