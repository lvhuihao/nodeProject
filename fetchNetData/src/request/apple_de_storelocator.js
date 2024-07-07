import logger from "./tools/logger.js";

function fetchAppleStoreLocations(lat, lon) {
    const url = `https://locate.apple.com/api/v1/grlui/de/en/sales?pt=all&lat=${lat}&lon=${lon}&carrier=&maxrad=100&maxResult=9999&repairType=`;

    return fetch(url, {
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "geo=US; POD=cn~zh; s_fid=52C929FA7193705F-0D383251543A13E0; s_cc=true; route=1720262959.23.109.640585|90c93c2533ff58fc0c23c45e84411b26; as_dc=ucp3; s_vi=[CS]v1|3344909AA6405012-400016FA233E1128[CE]; dssf=1; dssid2=3b6a4d4f-dc0c-49e8-b170-38e83195d4af; at_check=true; as_pcts=Ei4vv2w3W_g9SIupdZgZOaEGl7Zi922ZylwCPrFcgqjkl00bNSnp0mRguiUeyY74MRG4EibXITcqnv0K8iU5-av6SbAfQc_9DhmA3xm44S:OJuuuO7+yYLsEtpTmuf+77IAgIxdLkxohXmelWdU1GpEqmESS8A:4s8Lejrvh_LF5C0elgd_bcaWRRi2JX8PBXCnbVv-wpeBu6YjSc7jIN6k:l76ywYquX+hx; mk_epub=%7B%22btuid%22%3A%221vta2kt%22%2C%22prop57%22%3A%22www.us.homepage%22%7D; mbox=session#2e5b1d5d44e94ad5ba03dba4266b2baf#1720264955|PC#2e5b1d5d44e94ad5ba03dba4266b2baf.35_0#1720264898; s_sq=%5B%5BB%5D%5D; SESSION=6ad6e73d-e023-4b8f-b186-c36ff0b76799; i18next=en-AT; s_ppvl=acs%253A%253Atools%253A%253Acontact%253A%253Afind%2520locations%253A%253Asales%2520%2528en-at%2529%2C100%2C70%2C2105%2C1280%2C182%2C1280%2C800%2C2%2CP; s_ppv=acs%253A%253Atools%253A%253Acontact%253A%253Afind%2520locations%253A%253Asales%2520%2528en-at%2529%2C33%2C33%2C182%2C1280%2C182%2C1280%2C800%2C2%2CP",
            "Referer": `https://locate.apple.com/at/en/sales?pt=all&lat=${lat}&lon=${lon}`,
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: null,
        method: "GET"
    })
        .then(response => {
            // console.info(response)
            return response.json()
        })
        .then(data => {
            // console.log(data);
            return data.results.stores
        })
        .catch(error => console.error('Error:', error));
}

export default fetchAppleStoreLocations