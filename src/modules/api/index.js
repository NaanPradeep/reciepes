import axios from 'axios'
 
export const getReciepes = async (offset, limit, filter, searchString) => {
    const baseURL = `https://api.edamam.com/search?app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=${offset}&to=${limit}`
    let url = `${baseURL}${filter.length > 0 ? `&mealType=${filter}` : ''}${searchString.length > 0 ? `&q=${searchString}` : '&q=chicken'}`
    const rawData = await fetch(url);
    const parsedData = await rawData.json();
    return {
        reciepes: parsedData.hits.map((reciepe) => reciepe.recipe) // extracting the reciepe list from json response
    }
}

// function to get absolute path for the assets
export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname