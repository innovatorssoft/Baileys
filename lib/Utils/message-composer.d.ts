import { proto } from '../../WAProto'

export declare const JS_KEYWORDS: Set<string>
export declare const PYTHON_KEYWORDS: Set<string>
export declare const LANGUAGE_KEYWORDS: { [key: string]: Set<string> }

export declare enum CodeHighlightType {
    DEFAULT = 0,
    KEYWORD = 1,
    STR = 2,
    NUMBER = 3,
    METHOD = 4,
    COMMENT = 5
}

export declare enum RichSubMessageType {
    IMAGE = 3,
    TABLE = 4,
    CODE_BLOCK = 5,
    LATEX = 8
}

export interface CodeBlockToken {
    highlightType: CodeHighlightType
    codeContent: string
}

export interface RichContextInfo {
    stanzaId: string
    participant: string
    quotedMessage: proto.IMessage
}

export interface LatexExpression {
    latexExpression: string
    url?: string
    width?: number
    height?: number
}

export declare const tokenizeCode: (code: string, language?: string) => CodeBlockToken[]

export declare const buildRichContextInfo: (quoted?: any, options?: { botJid?: string, mentions?: string[] }) => proto.IContextInfo | undefined

export declare const buildBotForwardedMessage: (
    submessages: any[],
    ctxInfo?: proto.IContextInfo,
    unifiedResponse?: { data: Buffer }
) => proto.IMessage

export declare const generateTableContent: (
    title: string,
    headers: string[],
    rows: string[][],
    quoted?: any,
    options?: { headerText?: string, footer?: string }
) => { message: proto.IMessage, messageId: string }

export declare const generateListContent: (
    title: string,
    items: string[] | string[][],
    quoted?: any,
    options?: { headerText?: string, footer?: string }
) => { message: proto.IMessage, messageId: string }

export declare const generateCodeBlockContent: (
    code: string,
    quoted?: any,
    options?: { title?: string, footer?: string, language?: string }
) => { message: proto.IMessage, messageId: string }

export declare const generateLatexContent: (
    quoted?: any,
    options?: { text?: string, expressions: LatexExpression[], headerText?: string, footer?: string }
) => { message: proto.IMessage, messageId: string }

export declare const generateLatexImageContent: (
    quoted: any,
    options: { text?: string, expressions: LatexExpression[], headerText?: string, footer?: string },
    uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string, directPath?: string }>,
    renderLatexToPng: (latexExpr: string) => Promise<{ buffer: Buffer, width: number, height: number }>
) => Promise<{ message: proto.IMessage, messageId: string }>

export declare const generateLatexInlineImageContent: (
    quoted: any,
    options: { text?: string, expressions: LatexExpression[], headerText?: string, footer?: string },
    uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string, directPath?: string }>,
    renderLatexToPng: (latexExpr: string) => Promise<{ buffer: Buffer, width: number, height: number }>
) => Promise<{ message: proto.IMessage, messageId: string }>

export declare const captureUnifiedResponse: (msg: proto.IMessage) => {
    unifiedResponse: { data: Buffer },
    submessages: any[],
    contextInfo: any
} | null

export declare const generateUnifiedResponseContent: (
    quoted: any,
    captured: { submessages: any[], unifiedResponse: { data: Buffer } }
) => { message: proto.IMessage, messageId: string }

export interface InlineEntityItem {
    key: string
    metadata: {
        display_name?: string
        is_trusted?: boolean
        url?: string
        reference_id?: number
        reference_url?: string
        reference_title?: string
        reference_display_name?: string
        sources?: any[]
        latex_expression?: string
        latex_image?: { url?: string, width?: number, height?: number }
        font_height?: number
        padding?: number
        __typename?: string
    }
}

export interface ExtractedIE {
    text: string
    ie: any[]
    inline_entities: InlineEntityItem[]
}

export declare const extractIE: (
    text: string,
    options?: { extract?: boolean, hyperlink?: boolean, citation?: boolean, latex?: boolean }
) => ExtractedIE

export declare const generateMarkdownContent: (
    text: string,
    quoted?: any,
    options?: { botJid?: string, mentions?: string[], extract?: boolean, hyperlink?: boolean, citation?: boolean, latex?: boolean }
) => { message: proto.IMessage, messageId: string }

export declare const generateRichMessageContent: (
    submessages: any[],
    quoted?: any,
    options?: { botJid?: string, mentions?: string[], useMarkdown?: boolean, unifiedResponse?: any, extract?: boolean, hyperlink?: boolean, citation?: boolean, latex?: boolean }
) => { message: proto.IMessage, messageId: string }
