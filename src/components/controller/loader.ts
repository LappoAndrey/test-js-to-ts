import { NewsResponse, SourcesResponse } from '../view/appView';
import { ICallback } from './controller';

type TUrlOptions = {
    [prop: string]: string;
}

interface IOptions {
    apiKey: string;
}
interface IRespOptions {
    sources?: string | null;
}

class Loader {

    baseLink: string
    options: IOptions

    constructor(baseLink: string, options: IOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} } : {endpoint: string,   options?: IRespOptions   },
        callback: ICallback<NewsResponse | SourcesResponse> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: {
        sources?: string
    }, endpoint: string): string {
        const urlOptions: TUrlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).map((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: RequestInit['method'],
        endpoint: string,
        callback: ICallback<NewsResponse | SourcesResponse>,
        options = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: SourcesResponse | NewsResponse) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
