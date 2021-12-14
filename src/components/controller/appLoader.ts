import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'e870cbc5f4414eb9b6f12dc2e058b064',
        });
    }
}

export default AppLoader;
