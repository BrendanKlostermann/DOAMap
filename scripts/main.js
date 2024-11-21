console.log("Script is loaded.");


document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM has been loaded");

    fetch('https://api.mydoa.org/FetchData')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const dataArray = data.data;

            ProcessData(dataArray)
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});

function ProcessData(data) {
    data.forEach(player => {
        const name = player[0];
        const latitude = Number(player[1]);
        const longitude = Number(player[2]);

        const y = ((latitude + 90) / 180) * 100;
        const x = ((longitude + 180) / 360) * 100;

        const adjustedY = 100-y;

        const pin = document.createElement('div');
        const tag = document.createElement('span');

        pin.id = name
        pin.style.position = 'absolute';
        pin.style.left = `${x}%`;
        pin.style.top = `${adjustedY}%`;

        pin.classList.add("pinpoint");

        tag.textContent = name;
        tag.classList.add("name-tag");

        const container = document.getElementById('PinPointContainer');
        // Append the new div to the container
        if (container) {
            container.appendChild(pin);
            pin.appendChild(tag);
        } else {
            console.error("PinPointContainer not found.");
        }
    });


    document.querySelectorAll('.pinpoint').forEach(pin =>{
        const tag = pin.querySelector('.name-tag');

        pin.addEventListener('mouseover', (event) => {
            if(tag){
                tag.style.display = 'block';
            }
        });
    
        pin.addEventListener('mouseout', (event) =>{
            if(tag){
                tag.style.display = 'none';
            }
        });
    });
}
