import { defineStore } from 'pinia'
import { foodService } from '../services/api'

const dishTypes = [
    'main course',
    'side dish',
    'dessert',
    'appetizer',
    'salad',
    'bread',
    'breakfast',
    'soup',
    'beverage',
    'sauce',
    'marinade',
    'fingerfood',
    'snack',
    'drink'
]

export const useFoodsStore = defineStore('foodsStore', {
    state: () => ({
        dishTypes,
    }),
    actions: {
        async getAll(params: { type: string, titleMatch: string, number: number, offset: number }) {
            const result = await foodService.getAll(params)
            return {
                items: result.results, 
                total: result.totalResults 
            }
        },
        async getOne(id: number | string) {
            return await foodService.getOne(id)
        },
    },
})