
fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchLocation)}`)
    .then(res => res.json())
    .then(data => {
        if (data && data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;

            // Initialize map at the geocoded coordinates
            var map = L.map('map').setView([lat, lon], 15);

            // Add MapTiler tiles
            L.tileLayer(`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${mapApi}`, {
                attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors & <a href="https://www.maptiler.com/">MapTiler</a>'
            }).addTo(map);

            // Add a marker
            L.marker([lat, lon]).addTo(map)
                .bindPopup(`${searchLocation}`)
                .openPopup();
        } else {
            console.error("No results from geocoder");
        }
    })
    .catch(err => console.error(err));
