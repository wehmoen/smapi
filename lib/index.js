class BaseAPI {
    // API Key. Get yours at https://developers.skymavis.com/console
    #apiKey;

    #baseUrl;

    #routes;

    #disableAuthentication = false
    constructor(apiKey, routes, baseUrl, disableAuthentication = false) {
        this.#apiKey = apiKey;
        this.#baseUrl = baseUrl;
        this.#routes = routes;
        this.#disableAuthentication = disableAuthentication;
        return this;
    }

    /**
     *
     * @param url
     * @param params
     * @returns {string}
     * @private
     * @description Prepare URL with params
     */
    #prepareUrl(url, params) {
        if (params === undefined) {
            return url;
        }

        if (params.path && params.path.length > 0) {
            for (const param of params.path) {
                url = url.replace(`:${param[0]}`, param[1]);
            }
        }

        if (params.query) {
            Object.keys(params.query).forEach(key => params.query[key] === undefined && delete params.query[key])
            url += "?" + new URLSearchParams(params.query).toString();
        }

        return url;
    }

    /**
     * @description Do a GET request to the API
     * @param endpoint
     * @param params
     * @returns {Promise<Object>}
     */
    async get(endpoint, params = undefined) {
        const url = this.#prepareUrl(`${this.#baseUrl}/${this.#routes.get(endpoint)}`, params);
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        if (!this.#disableAuthentication) {
            headers["X-API-KEY"] = this.#apiKey;
        }

        const response = await fetch(url, {
            method: "GET",
            headers,
        });

        try {
            return await response.json();
        } catch (error) {
            throw new Error(error.message);
        }

    }

    /**
     * @description Do a POST request to the API
     * @param endpoint
     * @param params
     * @returns {Promise<Object>}
     */
    async post(endpoint, params = undefined) {
        const url = this.#prepareUrl(`${this.#baseUrl}/${this.#routes.get(endpoint)}`, params);
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        if (!this.#disableAuthentication) {
            headers["X-API-KEY"] = this.#apiKey;
        }

        const body = JSON.stringify(params.body);

        const response = await fetch(url, {
            method: "POST",
            headers,
            body,
        });

        try {
            return await response.json();
        } catch (error) {
            throw new Error(error.message);
        }
    }
}


module.exports.BaseAPI = BaseAPI;
