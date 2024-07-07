export default async function fetchLocations(latitude, longitude) {
    const url = 'https://papi.gethatch.com/locations/5c88b7e546e0fb000143fc7c/geo/list';

    const headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Priority': 'u=1, i',
        'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'Referer': 'https://www.samsung.com/',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
    };

    const body = JSON.stringify({
        countryCode: 'AU',
        geoCenterArea: {
            center: {
                latitude: latitude.toString(),
                longitude: longitude.toString()
            },
            distance: 10000
        },
        filters: []
    });

    const options = {
        method: 'POST',
        headers: headers,
        body: body
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return beforeProcess(data.locations);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

function beforeProcess(data) {
    return data.map(location => {
        return {
            ...location,
            country_code: location.country.code,
            country_name: location.country.name,
            country_id: location.country.id
        }
    })
}

// // Example usage:
// const latitude = -35.2812211;
// const longitude = 149.1291486;

// fetchLocations(latitude, longitude)
//     .then(data => {
//         console.log('Response from API:', data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
