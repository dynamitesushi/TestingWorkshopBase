export function tokenCreate(name, amount) {
    return new Promise((resolve, reject) => {
        window.MDS.cmd(`tokencreate name:${encodeURIComponent(name)} amount:${amount}`, function (token) {
            if (token.response) {
                return resolve(token.response);
            }

            return reject();
        });
    });
}
