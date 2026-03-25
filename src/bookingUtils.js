// bookingUtils.js
export const getBookings = () => {
  const data = localStorage.getItem('sentul_bookings');
  return data ? JSON.parse(data) : [];
};

export const saveBookings = (bookings) => {
  localStorage.setItem('sentul_bookings', JSON.stringify(bookings));
};

export const calculateBufferEnd = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const totalMins = hours * 60 + minutes;

  let newTotalMins;
  if (totalMins % 30 === 0) {
      newTotalMins = totalMins + 30;
  } else {
      newTotalMins = Math.ceil(totalMins / 30) * 30;
  }

  const newDate = new Date(timestamp);
  newDate.setHours(Math.floor(newTotalMins / 60));
  newDate.setMinutes(newTotalMins % 60);
  newDate.setSeconds(0);
  return newDate.getTime();
};

export const isSlotAvailable = (roomId, proposedIn, proposedOut) => {
  const bookings = getBookings();
  const roomBookings = bookings.filter(b => b.roomId === roomId);
  const bufferEnd = calculateBufferEnd(proposedOut);

  for (let b of roomBookings) {
    if (proposedIn < b.bufferEnd && bufferEnd > b.checkIn) {
      return false;
    }
  }
  return true;
};
