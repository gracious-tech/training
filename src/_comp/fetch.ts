
import {BibleClient, passage_str_to_obj} from '@gracious.tech/fetch-client'

import '@gracious.tech/fetch-client/client.css'

import type {BibleBookHtml} from '@gracious.tech/fetch-client/dist/esm/book'


const client = new BibleClient()
const collection_promise = client.fetch_collection()
const books_cache:Record<string, Promise<BibleBookHtml>> = {}


export async function get_passage(ref:string){
    const collection = await collection_promise
    const passage = passage_str_to_obj(ref, collection.get_books('eng_bsb'))
    if (!passage){
        return null
    }
    if (! (passage.book in books_cache)){
        books_cache[passage.book] = collection.fetch_book('eng_bsb', passage.book)
    }
    const book = await books_cache[passage.book]
    return [passage, book.get_passage_from_obj(passage, {attribute: false})]
}
