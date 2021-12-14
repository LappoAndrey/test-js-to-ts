import News from './news/news';
import Sources from './sources/sources';

export interface NewsResponse {
	
    articles?: IArticles[];
    status?: string;
    totalResults?: number;
	
}

export interface SourcesResponse {
	
    id?: string;
    name?: string;
    sources?: ISource[];
    status?:string;
	
}

export interface IArticles {
	
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string; name: string };
    title: string;
    url: string;
    urlToImage: string;
	
}


export interface ISource {
	
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
	
}


export class AppView {
	
	news: News;
    sources: Sources;
	
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsResponse): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
