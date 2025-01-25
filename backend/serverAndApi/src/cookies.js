//cookie parser code
function parser(req, res, next) {
    let cookies = {};
    const cookie = req.headers.cookie;
    if (cookie != undefined) {
        const rawCookies = cookie.split('; ');
        for (let pair of rawCookies) {
            const values = pair.split("=")
            if (values < 2) continue;
            cookies[values[0]] = values[1];
        }
    }
    req.cookies = cookies;
    next()
}

module.exports = {parser}