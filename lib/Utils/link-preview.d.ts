import { WAMediaUploadFunction, WAUrlInfo } from '../Types'
import { ILogger } from './logger'

export type URLGenerationOptions = {
    thumbnailWidth: number
    fetchOpts: {
        timeout: number
        proxyUrl?: string
        headers?: HeadersInit
        maxContentLength?: number
    }
    uploadImage?: WAMediaUploadFunction
    logger?: ILogger
}

/**
 * Given a piece of text, checks for any URL present, generates link preview for the same and returns it
 * Return undefined if the fetch failed or no URL was found
 * @param text first matched URL in text
 * @returns the URL info required to generate link preview
 */
export declare const getUrlInfo: (text: string, opts?: URLGenerationOptions) => Promise<WAUrlInfo | undefined>