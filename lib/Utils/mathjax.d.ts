export interface LatexRenderOptions {
    scale?: number | string
    outputScale?: string | number
    density?: number
    background?: any
    transparent?: boolean
}

export declare const scaleMap: Record<string, number>
export declare const unsupportedCommands: string[]

export declare const getMathJax: () => {
    adaptor: any
    htmlDoc: any
}

export declare const convertLatexToSvg: (latexInput: string, scale?: number | string) => string

export declare const renderLatexToPng: (
    latexExpr: string,
    options?: number | string | LatexRenderOptions
) => Promise<{ buffer: Buffer, width: number, height: number }>

export declare const convertLatexToPng: (
    latexExpr: string,
    options?: number | string | LatexRenderOptions
) => Promise<{ buffer: Buffer, width: number, height: number }>
