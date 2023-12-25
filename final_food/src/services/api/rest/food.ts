import makeRequest from '../httpClient'

interface FoodGetAllParams {
    type: string
    titleMatch: string
    number: number
    offset: number 
}

type Id = number | string

const getAll = (params: FoodGetAllParams) => 
    makeRequest({
        url: '/recipes/complexSearch/',
        params,
    })

const getOne = (id: Id) =>
    makeRequest({
        url: `/recipes/${ id }/information`,
    })

export default {
    getAll,
    getOne,
}