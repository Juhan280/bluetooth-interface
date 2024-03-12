/** @type {HTMLButtonElement} */
const button = document.querySelector("#connect");

button.addEventListener("click", async () => {
  // Request HC-05 Bluetooth device
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
  });
  console.log("Bluetooth device selected:", device.name);
  // Connect to the device
  const server = await device.gatt.connect();
  console.log("Connected to Bluetooth device GATT server");
  // Access services and characteristics
  // For example:
  const service = await server.getPrimaryService(
    "0000ffe0-0000-1000-8000-00805f9b34fb",
  ); // Service UUID of HC-05
  console.log("Got service:", service.uuid);
  // Access characteristics and interact with the device
  // For example:
  const characteristic = await service.getCharacteristic(
    "0000ffe1-0000-1000-8000-00805f9b34fb",
  ); // Characteristic UUID of HC-05
  console.log("Got characteristic:", characteristic.uuid);
  // Now you can send data to the HC-05 module
  // For example:
  const data = new Uint8Array([1, 2, 3]); // Example data to send
  characteristic
    .writeValue(data)
    .then(() => {
      console.log("Data sent successfully");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
