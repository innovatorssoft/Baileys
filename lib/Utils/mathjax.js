"use strict"

Object.defineProperty(exports, "__esModule", { value: true })

let _mathjaxInstance = null

/**
 * Lazy initializer for MathJax components (pure Node.js LaTeX rendering).
 */
function getMathJax() {
    if (!_mathjaxInstance) {
        const { mathjax } = require('mathjax-full/js/mathjax.js')
        const { TeX } = require('mathjax-full/js/input/tex.js')
        const { SVG } = require('mathjax-full/js/output/svg.js')
        const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js')
        const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js')
        const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js')

        // Initialize MathJax adaptor & HTML handler
        const adaptor = liteAdaptor()
        RegisterHTMLHandler(adaptor)

        // Configure TeX input with full AMS, physics, symbols, etc.
        const tex = new TeX({
            packages: AllPackages,
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']]
        })
        const svgOutput = new SVG({ fontCache: 'local' })
        const htmlDoc = mathjax.document('', { InputJax: tex, OutputJax: svgOutput })

        _mathjaxInstance = { adaptor, htmlDoc }
    }
    return _mathjaxInstance
}

// Maps scales into numeric multipliers
const scaleMap = {
    '10%': 0.1,
    '25%': 0.25,
    '50%': 0.5,
    '75%': 0.75,
    '100%': 1.0,
    '125%': 1.25,
    '150%': 1.5,
    '200%': 2.0,
    '500%': 5.0,
    '1000%': 10.0
}

// Unsupported security-sensitive commands
const unsupportedCommands = ['\\input', '\\include', '\\write18', '\\immediate', '\\verbatiminput']

/**
 * Converts LaTeX equation into clean SVG string using MathJax.
 * @param {string} latexInput
 * @param {number|string} [scale=1.0]
 * @returns {string} SVG string
 */
function convertLatexToSvg(latexInput, scale = 1.0) {
    if (!latexInput) {
        throw new Error('[convertLatexToSvg] No LaTeX input provided.')
    }

    let eq = latexInput.trim()

    const unsupportedCommandsPresent = unsupportedCommands.filter(cmd => eq.includes(cmd))
    if (unsupportedCommandsPresent.length > 0) {
        throw new Error(`Unsupported command(s) found: ${unsupportedCommandsPresent.join(', ')}. Please remove them and try again.`)
    }

    // Strip document-level wrappers if passed by the user
    eq = eq.replace(/\\documentclass(?:\[[^\]]*\])?\{[^}]+\}/g, '')
    eq = eq.replace(/\\usepackage(?:\[[^\]]*\])?\{[^}]+\}/g, '')
    eq = eq.replace(/\\thispagestyle\{[^}]+\}/g, '')
    eq = eq.replace(/\\begin\{document\}/g, '')
    eq = eq.replace(/\\end\{document\}/g, '')
    eq = eq.trim()

    const { adaptor, htmlDoc } = getMathJax()
    const node = htmlDoc.convert(eq, { display: true })

    // Check for LaTeX syntax errors
    const merror = adaptor.tags(node, 'g').find(g => adaptor.getAttribute(g, 'data-mml-node') === 'merror')
    if (merror) {
        const errorMsg = adaptor.getAttribute(merror, 'data-mjx-error') || 'Syntax error in LaTeX equation'
        throw new Error(`LaTeX Error: ${errorMsg}`)
    }

    let svgString = adaptor.innerHTML(node)

    // Scale SVG dimensions if scale != 1.0
    const numScale = typeof scale === 'string' ? (scaleMap[scale] ?? parseFloat(scale)) : scale
    if (numScale && numScale !== 1.0) {
        svgString = svgString.replace(
            /width="([0-9.]+)ex"\s+height="([0-9.]+)ex"/,
            (match, w, h) => `width="${(parseFloat(w) * numScale).toFixed(3)}ex" height="${(parseFloat(h) * numScale).toFixed(3)}ex"`
        )
    }

    return svgString
}

/**
 * Render LaTeX equation to PNG image using MathJax and Sharp.
 * Pure Node.js local rendering without external API dependencies.
 * 
 * @param {string} latexExpr - LaTeX expression
 * @param {Object|number|string} [options] - Options or scale multiplier (defaults to 2.0 / 200% for crisp display)
 * @returns {Promise<{ buffer: Buffer, width: number, height: number }>}
 */
async function renderLatexToPng(latexExpr, options = {}) {
    const sharp = require('sharp')

    if (!latexExpr) {
        throw new Error('[renderLatexToPng] No LaTeX input provided.')
    }

    let outputScale = 2.0
    if (typeof options === 'number') {
        outputScale = options
    } else if (typeof options === 'string') {
        outputScale = scaleMap[options] !== undefined ? scaleMap[options] : (parseFloat(options) || 2.0)
    } else if (options && typeof options === 'object') {
        if (options.scale !== undefined) {
            outputScale = typeof options.scale === 'string' ? (scaleMap[options.scale] ?? parseFloat(options.scale)) : options.scale
        } else if (options.outputScale !== undefined) {
            outputScale = typeof options.outputScale === 'string' ? (scaleMap[options.outputScale] ?? parseFloat(options.outputScale)) : options.outputScale
        }
    }

    if (isNaN(outputScale) || outputScale <= 0) {
        outputScale = 2.0
    }

    // Render LaTeX to SVG string in pure Node.js
    const svgString = convertLatexToSvg(latexExpr, outputScale)

    // Compute density: allow custom density override or scale-based (default 96 * outputScale)
    const density = (options && typeof options === 'object' && options.density)
        ? Math.round(options.density)
        : Math.round(96 * outputScale)

    let sharpInstance = sharp(Buffer.from(svgString), { density })

    // Optional background flattening (defaults to white for WhatsApp dark/light contrast)
    const isTransparent = options && typeof options === 'object' && (options.transparent || options.background === null)
    if (!isTransparent) {
        const bg = (options && typeof options === 'object' && options.background) ? options.background : { r: 255, g: 255, b: 255 }
        sharpInstance = sharpInstance.flatten({ background: bg })
    }

    const { data, info } = await sharpInstance.png().toBuffer({ resolveWithObject: true })

    return {
        buffer: data,
        width: info.width,
        height: info.height
    }
}

// Alias for convenience
const convertLatexToPng = renderLatexToPng

module.exports = {
    getMathJax,
    scaleMap,
    unsupportedCommands,
    convertLatexToSvg,
    renderLatexToPng,
    convertLatexToPng
}
