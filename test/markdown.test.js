const { extractIE, generateMarkdownContent, generateRichMessageContent } = require('../lib/Utils/message-composer')

describe('Markdown Hyperlinks and Inline Entities', () => {
    test('extractIE parses standard markdown hyperlink [comment](url)', () => {
        const text = 'Here is a link: [some comments](https://example.com) for more info.'
        const result = extractIE(text)

        expect(result.text).toBe('Here is a link: {{HYPERLINK_0}}https://example.com{{/HYPERLINK_0}} for more info.')
        expect(result.inline_entities).toHaveLength(1)
        expect(result.inline_entities[0]).toEqual({
            key: 'HYPERLINK_0',
            metadata: {
                display_name: 'some comments',
                is_trusted: true,
                url: 'https://example.com',
                __typename: 'GenAIInlineLinkItem'
            }
        })
    })

    test('extractIE parses untrusted markdown hyperlink with exclamation mark [comment](!url)', () => {
        const text = 'Untrusted link: [warning link](!https://suspicious.site)'
        const result = extractIE(text)

        expect(result.text).toBe('Untrusted link: {{HYPERLINK_0}}https://suspicious.site{{/HYPERLINK_0}}')
        expect(result.inline_entities).toHaveLength(1)
        expect(result.inline_entities[0]).toEqual({
            key: 'HYPERLINK_0',
            metadata: {
                display_name: 'warning link',
                is_trusted: false,
                url: 'https://suspicious.site',
                __typename: 'GenAIInlineLinkItem'
            }
        })
    })

    test('extractIE parses citations [](url)', () => {
        const text = 'Fact reference [](https://wikipedia.org/wiki/Node.js)'
        const result = extractIE(text)

        expect(result.text).toBe('Fact reference {{CITATION_0}}https://wikipedia.org/wiki/Node.js{{/CITATION_0}}')
        expect(result.inline_entities).toHaveLength(1)
        expect(result.inline_entities[0]).toEqual({
            key: 'CITATION_0',
            metadata: {
                reference_id: 1,
                reference_url: 'https://wikipedia.org/wiki/Node.js',
                reference_title: 'https://wikipedia.org/wiki/Node.js',
                reference_display_name: 'https://wikipedia.org/wiki/Node.js',
                sources: [],
                __typename: 'GenAISearchCitationItem'
            }
        })
    })

    test('extractIE parses multiple links in a single text', () => {
        const text = 'Visit [Google](https://google.com) or [GitHub](https://github.com) now!'
        const result = extractIE(text)

        expect(result.text).toBe('Visit {{HYPERLINK_0}}https://google.com{{/HYPERLINK_0}} or {{HYPERLINK_1}}https://github.com{{/HYPERLINK_1}} now!')
        expect(result.inline_entities).toHaveLength(2)
        expect(result.inline_entities[0].metadata.display_name).toBe('Google')
        expect(result.inline_entities[0].metadata.url).toBe('https://google.com')
        expect(result.inline_entities[1].metadata.display_name).toBe('GitHub')
        expect(result.inline_entities[1].metadata.url).toBe('https://github.com')
    })

    test('extractIE correctly handles non-link brackets without corrupting stack', () => {
        const text = 'Array index arr[0] and then [Click Here](https://example.com)'
        const result = extractIE(text)

        expect(result.text).toBe('Array index arr[0] and then {{HYPERLINK_0}}https://example.com{{/HYPERLINK_0}}')
        expect(result.inline_entities).toHaveLength(1)
        expect(result.inline_entities[0].metadata.display_name).toBe('Click Here')
    })

    test('generateMarkdownContent generates proper unifiedResponse with inline_entities', () => {
        const text = '# Title\nClick [Official Website](https://example.com) to read docs.'
        const { message, messageId } = generateMarkdownContent(text)

        expect(messageId).toBeDefined()
        expect(message.botForwardedMessage).toBeDefined()

        const rich = message.botForwardedMessage.message.richResponseMessage
        expect(rich).toBeDefined()
        expect(rich.submessages).toHaveLength(1)
        expect(rich.submessages[0].messageText).toBe(text)

        const decodedUnified = JSON.parse(Buffer.from(rich.unifiedResponse.data, 'base64').toString('utf8'))
        expect(decodedUnified.sections).toHaveLength(1)
        
        const primitive = decodedUnified.sections[0].view_model.primitive
        expect(primitive.__typename).toBe('GenAIMarkdownTextUXPrimitive')
        expect(primitive.text).toBe('# Title\nClick {{HYPERLINK_0}}https://example.com{{/HYPERLINK_0}} to read docs.')
        expect(primitive.inline_entities).toHaveLength(1)
        expect(primitive.inline_entities[0].metadata.display_name).toBe('Official Website')
        expect(primitive.inline_entities[0].metadata.url).toBe('https://example.com')
    })

    test('generateMarkdownContent accepts options as 2nd parameter when quoted is omitted', () => {
        const text = 'Check [Link](https://test.com)'
        const { message } = generateMarkdownContent(text, { botJid: '12345@bot' })

        const ctxInfo = message.botForwardedMessage.message.richResponseMessage.contextInfo
        expect(ctxInfo.forwardedAiBotMessageInfo.botJid).toBe('12345@bot')
    })

    test('generateRichMessageContent parses inline links when useMarkdown is true', () => {
        const submessages = [
            {
                messageType: 2,
                messageText: 'See [Documentation](https://docs.example.com)'
            }
        ]
        const { message } = generateRichMessageContent(submessages, null, { useMarkdown: true })
        const rich = message.botForwardedMessage.message.richResponseMessage
        const decodedUnified = JSON.parse(Buffer.from(rich.unifiedResponse.data, 'base64').toString('utf8'))
        
        const primitive = decodedUnified.sections[0].view_model.primitive
        expect(primitive.__typename).toBe('GenAIMarkdownTextUXPrimitive')
        expect(primitive.text).toBe('See {{HYPERLINK_0}}https://docs.example.com{{/HYPERLINK_0}}')
        expect(primitive.inline_entities).toHaveLength(1)
        expect(primitive.inline_entities[0].metadata.display_name).toBe('Documentation')
    })

    test('MessageBuilder Toolkit.extractIE uses shared extractIE implementation', () => {
        const { Toolkit } = require('../assets/buttonsbuilder/MessageBuilder')
        const result = Toolkit.extractIE('Check [GitHub](https://github.com)')
        expect(result.text).toBe('Check {{HYPERLINK_0}}https://github.com{{/HYPERLINK_0}}')
        expect(result.inline_entities).toHaveLength(1)
        expect(result.inline_entities[0].metadata.display_name).toBe('GitHub')
    })
})
