








const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/json-cleaning', (resp) => {
    let { statusCode } = resp
    let contentType = resp.headers['content-type']
    resp.setEncoding('utf-8')
    let data = '';

    // parse json data here...
    resp.on('data', (d) => {
        data += [d]
    })

    resp.on('end', () => {

        const obj = JSON.parse(data);
        // const sliced = Object.fromEntries(
        //     Object.entries(obj).slice(0, 2)
        // );
        const sanitize = (obj) => {
            return JSON.parse(JSON.stringify(obj, (key, value) => {
                return (value === '' ? undefined : value);
            }));
        };
        console.log(JSON.stringify(sanitize(obj)));
    })
    resp.on("error", (e) => {
        console.log("error", e)
    })

});

