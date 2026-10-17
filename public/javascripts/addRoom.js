async function addRoom(url) {
    let hotelId = parseInt(prompt("Provide the hotel ID for the new room"))
    let capacity = parseInt(prompt("Provide the new room's capacity"))
    let pricePerDay = parseFloat(prompt("Provide the new room's price per day"))
    if (hotelId === null || capacity === null || pricePerDay === null)
        return;
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            HotelId: hotelId,
            Capacity: capacity,
            PricePerDay: pricePerDay
        })
    }).then((response) => {
        if (response.ok) {
            const resData = 'Created a new room';
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
    })
      .catch((response) => {
        alert(response.statusText);
      });
}