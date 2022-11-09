export function tokenCreate(name, amount) {
    return new Promise((resolve, reject) => {
        window.MDS.cmd(`tokencreate name:{"name":"${name}", "description":"test", "url":"", "ticker":""} amount:${amount}`, function (token) {
            if (token.response) {
                return resolve(token.response);
            }

            return reject();
        });
    });
}
