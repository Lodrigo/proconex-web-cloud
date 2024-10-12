import { HttpParams } from '@angular/common/http';
import { FilterType } from './filterType';


/**
 * An object used to get page information from the server
 */
export class Page {
    // The number of elements in the page
    per_page: number;

    // The total number of elements
    total: number;

    // The total number of pages
    pages: number;

    // The current page number
    page: number;
    filter: FilterType;
    order: string;

    messages: { emptyMessage: string; totalMessage: string };
}

export const filterToQueryString = (pagination: Page) => {
    if (pagination.filter) {
        return Object.keys(pagination.filter).reduce((prev, curr) => {
            prev[curr] = pagination.filter[curr];
            return prev;
        }, {} as { [key: string]: any });
    }
    return {};
};

export const filterToParamsFormatter = (pagination: Page) => {
    let httpParams = new HttpParams();

    if (pagination.filter) {
        Object.keys(pagination.filter).forEach((key) => {
            if (pagination.filter[key])
                httpParams = httpParams.set(key, pagination.filter[key].toString());
        });
    }

    return httpParams
};