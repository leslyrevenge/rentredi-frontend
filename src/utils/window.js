const getUserLocation = async (setMaster) => {
  try {
    async function callback(position) {
      var coords = position.coords || {};
      await setMaster({
        key: "user_current_position",
        payload: coords,
      });
      return coords;
    }
    var output = await navigator.geolocation.getCurrentPosition(callback);

    return output;
  } catch (error) {}
};

export default getUserLocation;
