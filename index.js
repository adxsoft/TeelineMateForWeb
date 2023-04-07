// TODO: Checkout on iphone and iPad
// DONE: Check blends at start of word Y height
// DONE: Scroll the canvas horizontally
// DONE: Moving leftwards over words not displaying label at right time
// DONE: Show word labels (allow for colored text)
//       - In Word Array
//         - store x,y,row coordinates to display floating labels
//         - store html of word label including font tags
// DONE: Zoom in and out of Canvas
// DONE: Complete renders for all blends
// DONE: Complete last x and y locations for all blends
// DONE: Clear button for input area
// DONE: parseSentence Unit tests all working (mode = local) 2023-02-19 20:09:15
// DONE: alternate coloring - black/grey option
// DONE: FR - R should leave top of the F
// DONE:     FH should use top exit
// DONE: Get prefix plots working at correct ypos
// DONE: Get sufffix plots working at correct ypos
// LATER: Show segment labels (allow for colored text)
//       - In Word Array, segments array
//         - store x,y,row coordinates to display floating labels
//         - store html of word label including font tags
// LATER: Add further prefix plots
// LATER: Vertical display OPTION 1
//       - with rendered teeline symbols on left, (colored) on right


var options = {
    useCompression: false,
    useAbbreviations: false,
    useBlends: false,
    usePrefixes: false,
    useSuffixes: false,
    useIndicators: false,
    useBlackGray: false,
    showlabels: false,
    useJoinedLetters: false //TODO:
}

var abbrsFullWordsArray = {
    "AND": "N-ABBR",     // DONE:
    "ARE": "R-ABBR",     // DONE:
    "AN": "N-ABBR",     // DONE:
    "AT": "T-ABBR",     // DONE:
    "BE": "B-ABBR",     // DONE:
    "DO": "D-ABBR",     // DONE:
    "EQUAL": "Q-ABBR",  // DONE:
    "FROM": "F-ABBR",     // DONE:
    "GO": "G-ABBR",     // DONE:
    "HE": "H-ABBR",     // DONE:
    "IN": "N-ABBR",     // DONE:
    "IS": "S-ABBR",     // DONE:
    "IT": "T-ABBR",     // DONE:
    "KIND": "K-ABBR",     // DONE:
    "LETTER": "L-ABBR",     // DONE:
    "ME": "M-ABBR",     // DONE:
    "OF": "O-ABBR",     // DONE:
    "ONCE": "ONCE-ABBR",  // DONE:
    "PAGE": "P-ABBR",  // DONE:
    "QUESTION": "Q-ABBR",     // DONE:
    "SOUTH": "S-ABBR",     // DONE:
    "THE": "THE-ABBR",  // DONE:
    "THEY": "THEY-ABBR",  // DONE:
    "TO": "T-ABBR",  // DONE:
    "VERY": "V-ABBR",     // DONE:
    "WE": "W-ABBR",     // DONE:
    "YOU": "Y-ABBR",     // DONE:
    "YOUR": "Y-ABBR",     // DONE:
    "OUR": "OUR-ABBR",  // DONE:
    "OUT": "OUT-ABBR"  // DONE:
}

var abbrsPartialWordsArray = {
    "CH": "CH-INDICATOR",   // DONE:
    "SH": "SH-INDICATOR",   // DONE:
    "TCH": "TCH-INDICATOR",  // DONE:
    "WH": "WH-INDICATOR"  // DONE:
}

var blendsArray = [
    'CM', // DONE:
    'CN', // DONE:
    'DN', // DONE:
    'DR', // DONE:
    'FB', // DONE:
    'FL', // DONE:
    'FM', // DONE:
    'FR', // DONE:
    'HV', // DONE:
    'LR', // TODO: Starts below the line!!
    'MR', // DONE: 
    'PL', // DONE:
    'TH', // DONE:
    'TR', // DONE:
    'THR', // DONE:
    'TN', // DONE:
    'WR'// DONE:
]
var prefixesArray = {
    "CHR": "CHR-PREFIX", // DONE:
    "CH": "CH-PREFIX",  // DONE:
    "COM": "COM-PREFIX", // DONE:
    "CON": "CON-PREFIX",  // DONE:
    "EX": "EX-PREFIX", // DONE:
}

var suffixesArray = {
    "ABLE": "ABLE-SUFFIX",  // DONE:
    "AE": "AE-SUFFIX",      // DONE:
    "ANT": "ANT-SUFFIX",    // DONE:
    "ANCE": "CH-SUFFIX",    // DONE:
    "AY": "AY-SUFFIX",      // DONE:
    "CH": "CH-SUFFIX",      // DONE:
    "CIAL": "CIAL-SUFFIX",  // DONE:
    "EE": "E-SUFFIX",       // DONE:
    "ENT": "ANT-SUFFIX",    // DONE:
    "ENCE": "CH-SUFFIX",    // DONE:
    "EVER": "V-SUFFIX",     // DONE:
    "IBLE": "I-SUFFIX",     // DONE:
    "IE": "I-SUFFIX",       // DONE:
    "ING": "ING-SUFFIX",    // DONE:
    "MENT": "M-SUFFIX",     // DONE:
    "OE": "O-SUFFIX",       // DONE:
    "OO": "O-SUFFIX",       // DONE:
    "OY": "Y-SUFFIX",       // DONE:
    "SH": "SH-SUFFIX",      // DONE:
    "SHL": "SHL-SUFFIX",    // DONE:
    "SHIP": "SHIP-SUFFIX",  // DONE:
    "TCH": "CH-SUFFIX",     // DONE:
    "TIAL": "TIAL-SUFFIX",  // DONE:
    "TION": "N-SUFFIX",     // DONE:
    "UE": "U-SUFFIX",       // DONE:
    "Y": "I-SUFFIX",       // DONE:
}

var indicatorsArray = {
    'A': "A-INDICATOR",
    'E': "E-INDICATOR",
    'I': "I-INDICATOR",
}



function setOptions(newoptions) {
    options = {
        useAbbreviations: false,
        useBlends: false,
        usePrefixes: false,
        useSuffixes: false,
        useIndicators: false,
        useCompression: false,
        useJoinedLetters: false
    }
    Object.entries(newoptions).
        forEach(([k, v]) => options[k] = v);
}


function loadOptionsFromWebPage() {
    options = {
        useCompression: false,
        useAbbreviations: false,
        useBlends: false,
        usePrefixes: false,
        useSuffixes: false,
        useIndicators: false,
        useBlackGray: false,
        showlabels: false,
        useJoinedLetters: false
    }
    options.useCompression = document.getElementById("usecompressionoption").checked;
    options.useAbbreviations = document.getElementById("useabbreviationsoption").checked;
    options.useBlends = document.getElementById("useblendsoption").checked;
    options.usePrefixes = document.getElementById("useprefixesoption").checked;
    options.useSuffixes = document.getElementById("usesuffixesoption").checked;
    options.useIndicators = document.getElementById("useindicatorsoption").checked;
    options.useJoinedLetters = document.getElementById("usejoinedlettersoption").checked;
    options.useBlackGray = document.getElementById("useblackgray").checked;
    options.showlabels = document.getElementById("showlabels").checked;
    // options.testcombinations = document.getElementById("testcombinations").checked;
    // options.chkShowStartEndPoints = document.getElementById("showstartandendpointsoption").checked;
    // state.currentrow = document.getElementById("rownum").value;
    // options.chkSlowLetterDrawing = document.getElementById("slowletterdrawingoption").checked;
    // options.chkSingleStepLetters = TLMap["Settings"]["View"]["chkSingleStepLetters"]
    // options.chkSingleStepWords = TLMap["Settings"]["View"]["chkSingleStepWords"]
    return options
}

function formatSegment(segment, ctx, color, overidecolor = color) {
    if (overidecolor != color) {
        color = overidecolor
    }

    if (segment.endsWith('-ABBR')) { color = 'abbreviation' }
    if (segment.endsWith('-BLEND')) { color = 'blend' }
    if (segment.endsWith('-PREFIX')) { color = 'prefix' }
    if (segment.endsWith('-SUFFIX')) { color = 'suffix' }
    if (segment.endsWith('-INDICATOR')) { color = 'indicator' }

    if (options.useBlackGray) {
        if (lastalternatecolor == "black") {
            color = "gray"
        }
        if (lastalternatecolor == "gray") {
            color = "black"
        }
        lastalternatecolor = color

    }

    ctx.lineWidth = 1.4
    switch (color) {
        case 'black':
            ctx.strokeStyle = "#000000"
            break
        case 'gray':
            ctx.strokeStyle = "#808080" // dark grey
            break
        case 'darkgrey':
            ctx.strokeStyle = "#9C9C9C" // dark grey
            break
        case 'lightgrey':
            ctx.strokeStyle = "#808080" // light grey
            break
        case 'indicator':
            ctx.strokeStyle = "#FF0000" // red
            break
        case 'red':
            ctx.strokeStyle = "#FF0000"
            break
        case 'separator':
            ctx.strokeStyle = "#009999"
            ctx.lineWidth = 2
            break
        case 'fixed':
            ctx.strokeStyle = "#CC00CC" // purple
            break
        case 'abbreviation':
            ctx.strokeStyle = "#008000" // green
            break
        case 'blend':
            ctx.strokeStyle = "#FF8000" // orange
            break
        case 'prefix':
            ctx.strokeStyle = "#008B8B" // dark golden rod
            break
        case 'suffix':
            ctx.strokeStyle = "#B8860B" // dark golden rod
            break
        case 'green':
            ctx.strokeStyle = "#00FF00"
            break
        case 'blue':
            ctx.strokeStyle = "#0000FF"
            break
        default:
            ctx.strokeStyle = "#000000"
    }
}
function plotSegment(segment, x, y, last) {
    var radius, startAngle, endAngle, finalXAdjustment, finalYAdjustment

    finalXAdjustment = 0
    finalYAdjustment = 0
    prefixYpos = 100 - 24
    suffixYpos = 100 - 24

    switch (segment) {
        case 'A':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y)
            ctx.lineTo(x + 6, y - 8)
            ctx.stroke()
            ctx.lineTo(x + 12, y)
            ctx.stroke()
            x += 12
            break
        case 'A-INDICATOR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y)
            ctx.lineTo(x + 12, y + 6)
            ctx.stroke()
            x += 12
            y += 6
            break
        case 'A-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y)
            ctx.lineTo(x + 12, y + 6)
            ctx.stroke()
            x += 12
            y += 6
            break
        case 'ABLE-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, prefixYpos)
            ctx.lineTo(x + 12, prefixYpos + 6)
            ctx.stroke()
            x += 12
            break
        case 'AE-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, prefixYpos)
            ctx.lineTo(x + 12, prefixYpos + 6)
            ctx.stroke()
            x += 12
            break
        case 'AY-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, prefixYpos)
            ctx.lineTo(x + 12, prefixYpos + 6)
            ctx.stroke()
            x += 12
            break
        case 'ANT-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, prefixYpos)
            ctx.lineTo(x + 12, prefixYpos)
            ctx.stroke()
            x += 12
            break
        case 'A-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, prefixYpos)
            ctx.lineTo(x + 4, prefixYpos - 6)
            ctx.stroke()
            ctx.lineTo(x + 8, prefixYpos)
            ctx.stroke()
            x += 12
            break
        case 'B':
        case 'B-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            if (last[0] == '' || last[0] == ' ') {
                finalYAdjustment = -13
                y += finalYAdjustment
            }

            radius = 7;                       // Arc radius
            startAngle = 0 * Math.PI          // Starting point on circle
            endAngle = 2 * Math.PI // End point on circle
            ctx.arc(x + 7, y + finalYAdjustment + (radius * 2) + 5, radius, startAngle, endAngle, true);
            ctx.stroke()

            ctx.beginPath()
            radius = 30;                       // Arc radius
            startAngle = 1.15 * Math.PI             // Starting point on circle
            endAngle = 0.9 * Math.PI // End point on circle
            ctx.arc(x + radius - 2, y + finalYAdjustment + 13, radius, startAngle, endAngle, true);
            ctx.stroke()
            x += 11
            y += 13
            break
        case 'C':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            if (last[0] == 'C'
                || last[0] == 'I'
                || last[0] == 'J'
                || last[0] == 'P'
                || last[0] == 'R'
                || last[0] == 'S'
                || last[0] == 'U'
                || last[0] == 'V'
                || last[0] == 'X'
            ) {
                finalYAdjustment = 0
                y += finalYAdjustment
                finalXAdjustment = 7
                x += finalXAdjustment
            }
            if (last[0] == 'Q'
                || last[0] == 'W'
            ) {
                finalYAdjustment = -2
                y += finalYAdjustment
                finalXAdjustment = 5
                x += finalXAdjustment
            }
            if (last[0] == 'O'
            ) {
                finalYAdjustment = -3
                y += finalYAdjustment
                finalXAdjustment = 9
                x += finalXAdjustment
            }
            if (last[0].endsWith("-PREFIX")
            ) {
                finalYAdjustment = -6
                y += finalYAdjustment
                finalXAdjustment = 9
                x += finalXAdjustment
            }
            ctx.moveTo(x, y)
            ctx.lineTo(x - 6, y)
            ctx.stroke()
            ctx.lineTo(x - 6, y + 6) // make this segment an arc
            ctx.stroke()
            ctx.lineTo(x, y + 6)
            ctx.stroke()
            y += 6
            break
        case 'CH-INDICATOR':
        case 'TCH-INDICATOR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            finalYAdjustment = 0
            finalXAdjustment = 12

            ctx.moveTo(x + finalXAdjustment, y + finalYAdjustment)
            ctx.lineTo(x + finalXAdjustment - 12, y + finalYAdjustment)
            ctx.stroke()
            ctx.lineTo(x + finalXAdjustment - 12, y + 12 + finalYAdjustment) // make this segment an arc
            ctx.stroke()
            ctx.lineTo(x + finalXAdjustment, y + 12 + finalYAdjustment)
            ctx.stroke()
            x += 12
            y += 12
            break
        case 'CH-PREFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            finalYAdjustment = -12
            ctx.moveTo(x, prefixYpos)
            ctx.lineTo(x - 12, prefixYpos)
            ctx.stroke()
            ctx.lineTo(x - 12, prefixYpos + 12) // make this segment an arc
            ctx.stroke()
            ctx.lineTo(x, prefixYpos + 12)
            ctx.stroke()
            // y += 3
            break
        case 'CH-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, prefixYpos)
            ctx.lineTo(x - 6, prefixYpos)
            ctx.stroke()
            ctx.lineTo(x - 6, prefixYpos + 6) // make this segment an arc
            ctx.stroke()
            ctx.lineTo(x, prefixYpos + 6)
            ctx.stroke()
            break
        case "CHR-PREFIX":
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            finalXAdjustment = 0
            finalYAdjustment = 0
            radius = 4
            startAngle = 1.5 * Math.PI;             // Starting point on circle
            endAngle = 0.15 * Math.PI // End point on circle
            ctx.arc(x + finalXAdjustment + (radius / 2) + 2, prefixYpos + finalYAdjustment, radius, startAngle, endAngle, true)
            ctx.moveTo(x + 7, prefixYpos + 3)
            ctx.lineTo(x + 19, prefixYpos - 12)
            ctx.stroke()
            x += 19
            break
        case 'COM-PREFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            finalYAdjustment = -16
            ctx.moveTo(x, prefixYpos + finalYAdjustment)
            ctx.lineTo(x - 12, prefixYpos + finalYAdjustment)
            ctx.stroke()
            ctx.lineTo(x - 12, prefixYpos + 12 + finalYAdjustment) // make this segment an arc
            ctx.stroke()
            ctx.lineTo(x + 8, prefixYpos + 12 + finalYAdjustment)
            ctx.stroke()
            x += 12
            break
        case "CM-BLEND":
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            finalXAdjustment = 12
            finalYAdjustment = 0
            ctx.moveTo(x + finalXAdjustment, y + finalYAdjustment)
            ctx.lineTo(x + finalXAdjustment - 12, y + finalYAdjustment)
            ctx.stroke()
            ctx.lineTo(x + finalXAdjustment - 12, y + 12 + finalYAdjustment) // make this segment an arc
            ctx.stroke()
            ctx.lineTo(x + finalXAdjustment + 8, y + 12 + finalYAdjustment)
            ctx.stroke()
            x += 18
            y += 12
            break
        case 'CN-BLEND':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            finalXAdjustment = 4
            finalYAdjustment = -6
            radius = 2.5                       // Arc radius
            ctx.moveTo(x + finalXAdjustment, y + finalYAdjustment)
            startAngle = -0.1;             // Starting point on circle
            endAngle = 3.241592653589793 // End point on circle
            ctx.beginPath()
            ctx.arc(x + finalXAdjustment + (radius / 2) + 2, y + finalYAdjustment, radius, startAngle, endAngle, true)
            x += radius * 2
            ctx.moveTo(x + finalXAdjustment + (radius / 2) - 6, y + finalYAdjustment - 1)
            ctx.lineTo(x + finalXAdjustment + (radius / 2) - 6, y + finalYAdjustment + 7)
            ctx.stroke()
            x += (radius / 2) - 1
            y += 2
            break
        case 'CON-PREFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 2.5                       // Arc radius
            ctx.moveTo(x, prefixYpos)
            startAngle = -0.1;             // Starting point on circle
            endAngle = 3.241592653589793 // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 2, prefixYpos, radius, startAngle, endAngle, true)
            x += radius * 2
            ctx.moveTo(x + (radius / 2) - 6, prefixYpos - 1)
            ctx.lineTo(x + (radius / 2) - 6, prefixYpos + 7)
            ctx.stroke()
            x += (radius / 2) - 1
            break

        case 'D':
        case 'D-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            if (last[0] == 'T' || last[0] == 'D') {
                finalYAdjustment = 3
                y += finalYAdjustment
            }
            ctx.moveTo(x, y - 2 + finalYAdjustment)
            ctx.lineTo(x + 12, y - 2 + finalYAdjustment)
            ctx.stroke()
            x += 12
            break
        case 'DN-BLEND':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            if (last[0] == 'T' || last[0] == 'D') {
                finalYAdjustment = 3
                y += finalYAdjustment
            }
            ctx.moveTo(x, y - 2 + finalYAdjustment)
            ctx.lineTo(x + 12, y - 2 + finalYAdjustment)
            ctx.stroke()
            x += 12
            y += 5
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 4                       // Arc radius
            ctx.moveTo(x + (radius / 2) - 1, y)
            startAngle = 1.3 * Math.PI             // Starting point on circle
            endAngle = 0.1 * Math.PI // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 1, y - 3, radius, startAngle, endAngle, false);
            ctx.stroke()
            ctx.lineTo(x + (radius / 2) + 5, y + 5 + finalYAdjustment)
            ctx.stroke()
            x += 6
            y += 4
            break
        case 'DR-BLEND':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            if (last[0] == 'T' || last[0] == 'D') {
                finalYAdjustment = 3
                y += finalYAdjustment
            }
            ctx.moveTo(x, y - 2 + finalYAdjustment)
            ctx.lineTo(x + 28, y - 2 + finalYAdjustment)
            ctx.stroke()
            x += 26
            y -= 1
            break
        case 'E':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y)
            ctx.lineTo(x, y + 8)
            ctx.stroke()
            ctx.lineTo(x + 8, y + 8)
            ctx.stroke()
            x += 8
            y += 8
            break
        case 'E-INDICATOR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y)
            ctx.lineTo(x, y + 12)
            ctx.stroke()
            y += 12
            break
        case 'E-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, prefixYpos)
            ctx.lineTo(x, prefixYpos + 8)
            ctx.stroke()
            break
        case 'EX-PREFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, prefixYpos)
            ctx.lineTo(x + 12, prefixYpos - 12)
            ctx.moveTo(x, prefixYpos - 12)
            ctx.lineTo(x + 12, prefixYpos)
            ctx.stroke()
            x += 12
            break

        case 'F':
        case 'F-ABBR':
            ctx.beginPath() // left arc
            formatSegment(segment, ctx, '')
            radius = 36;                       // Arc radius
            startAngle = 1.26 * Math.PI             // Starting point on circle
            endAngle = 1.08 * Math.PI // End point on circle
            ctx.arc(x + 35, y + 10, radius, startAngle, endAngle, true);
            ctx.stroke()

            ctx.beginPath() // right arc
            radius = 40;                       // Arc radius
            startAngle = 2.25 * Math.PI          // Starting point on circle
            endAngle = 2.1 * Math.PI // End point on circle
            ctx.arc(x - 27, y - 28, radius, startAngle, endAngle, true);
            ctx.stroke()

            break
        case 'FB-BLEND':
            finalYAdjustment = 16
            finalXAdjustment = -8
            ctx.beginPath() // left arc
            formatSegment(segment, ctx, '')
            radius = 36;                       // Arc radius
            startAngle = 1.26 * Math.PI             // Starting point on circle
            endAngle = 1.08 * Math.PI // End point on circle
            ctx.arc(x + 35 + finalXAdjustment, y + finalYAdjustment + 10, radius, startAngle, endAngle, true);
            ctx.stroke()

            ctx.beginPath() // right arc
            radius = 40;                       // Arc radius
            startAngle = 2.25 * Math.PI          // Starting point on circle
            endAngle = 2.1 * Math.PI // End point on circle
            ctx.arc(x - 27 + finalXAdjustment, y + finalYAdjustment - 28, radius, startAngle, endAngle, true);
            ctx.stroke()

            ctx.beginPath() // right arc
            radius = 7;                       // Arc radius
            startAngle = 0 * Math.PI          // Starting point on circle
            endAngle = 2 * Math.PI // End point on circle
            ctx.arc(x + 6 + finalXAdjustment, y + finalYAdjustment + 6, radius, startAngle, endAngle, true);
            ctx.stroke()

            x -= 5
            y += 16


            break
        case 'FL-BLEND':
            finalXAdjustment = 0
            finalYAdjustment = -9

            ctx.beginPath() // left arc
            formatSegment(segment, ctx, '')
            y += 8 // force F across the line to denote FL Blend
            radius = 36;                       // Arc radius
            startAngle = 1.26 * Math.PI             // Starting point on circle
            endAngle = 1.08 * Math.PI // End point on circle
            ctx.arc(x + 35, y + finalYAdjustment + 10, radius, startAngle, endAngle, true);
            ctx.stroke()

            ctx.beginPath() // right arc
            radius = 40;                       // Arc radius
            startAngle = 2.25 * Math.PI          // Starting point on circle
            endAngle = 2.1 * Math.PI // End point on circle
            ctx.arc(x - 27, y + finalYAdjustment - 28, radius, startAngle, endAngle, true);
            ctx.stroke()

            x += 1
            y -= 7

            break
        case 'FM-BLEND':

            finalXAdjustment = 0
            finalYAdjustment = -2

            // F segment
            ctx.beginPath() // left arc
            formatSegment(segment, ctx, '')
            radius = 36;                       // Arc radius
            startAngle = 1.26 * Math.PI             // Starting point on circle
            endAngle = 1.08 * Math.PI // End point on circle
            ctx.arc(x + finalXAdjustment + 35, y + finalYAdjustment + 10, radius, startAngle, endAngle, true);
            ctx.stroke()

            ctx.beginPath() // right arc
            radius = 40;                       // Arc radius
            startAngle = 2.25 * Math.PI          // Starting point on circle
            endAngle = 2.1 * Math.PI // End point on circle
            ctx.arc(x + finalXAdjustment - 27, y + finalYAdjustment - 28, radius, startAngle, endAngle, true);
            ctx.stroke()
            y += 6
            x -= 18

            // M segment
            x += 24
            y -= 1
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 26;                       // Arc radius
            ctx.moveTo(x + (radius / 2), y)
            startAngle = 1.94 * Math.PI;             // Starting point on circle
            endAngle = 1.39 * Math.PI // End point on circle
            ctx.beginPath()
            ctx.arc(x + finalXAdjustment + (radius / 2) + 0, y + finalYAdjustment + 3, radius, startAngle, endAngle, true)
            ctx.stroke()

            x += (radius * 2) - 15
            y -= 4


            break
        case "FR-BLEND":
            ctx.beginPath() // left arc
            formatSegment(segment, ctx, '')

            radius = 36;                       // Arc radius
            startAngle = 1.26 * Math.PI             // Starting point on circle
            endAngle = 1.08 * Math.PI // End point on circle
            ctx.arc(x + 35, y + 10, radius, startAngle, endAngle, true);
            ctx.stroke()

            ctx.beginPath() // right arc
            radius = 40;                       // Arc radius
            startAngle = 2.25 * Math.PI          // Starting point on circle
            endAngle = 2.1 * Math.PI // End point on circle
            ctx.arc(x - 27, y - 28, radius, startAngle, endAngle, true);
            ctx.stroke()

            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x + 6, y - 12)
            ctx.lineTo(x + 16, y - 28)
            ctx.stroke()
            y -= 28
            x += 16
            break
        case 'G':
        case 'G-ABBR':
            formatSegment(segment, ctx, '')
            radius = 20;                       // Arc radius

            ctx.beginPath()
            startAngle = 0.7             // Starting point on circle
            endAngle = 5.7 // End point on circle
            ctx.arc(x + (radius / 2) - 20, y + 8, radius, startAngle, endAngle, true);
            ctx.stroke()

            ctx.beginPath()
            radius = 7;                       // Arc radius
            startAngle = 5.1             // Starting point on circle
            endAngle = 4 // End point on circle
            ctx.arc(x + (radius * 2.5) + (radius) - 20, y + 4, radius, startAngle, endAngle, true);
            ctx.stroke()

            x += 6
            y += (radius * 3)
            break
        case 'G-INDICATOR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x + 10, 100 - 40)
            ctx.lineTo(x + 10, 100 - 30)
            ctx.stroke()
            x += 20
            y = 100
            break
        case 'H':
            finalXAdjustment = 1
            finalYAdjustment = 0
            // Fixed height segment
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x + finalXAdjustment + 2, y + finalYAdjustment)
            ctx.lineTo(x + finalXAdjustment + 2, y + finalYAdjustment + 20)
            ctx.stroke()
            x += 3
            y += 20
            break
        case 'H-ABBR':
            // allow for H following T
            if (last[0] == 'T') {
                finalYAdjustment = 10
                y += finalYAdjustment
            }
            if (last[0] == 'F') {
                finalXAdjustment = 10
                x += finalXAdjustment
            }
            // Fixed height segment
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x + finalXAdjustment + 2, y + finalYAdjustment - 20)
            ctx.lineTo(x + finalXAdjustment + 2, y + finalYAdjustment)
            ctx.stroke()
            x += 2
            y += finalYAdjustment
            break
        case 'HV-BLEND':
            finalXAdjustment = 0
            finalYAdjustment = 20
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x + finalXAdjustment, y + finalYAdjustment - 20)
            ctx.lineTo(x + finalXAdjustment + 6, y + finalYAdjustment)
            ctx.lineTo(x + finalXAdjustment + 10, y + finalYAdjustment - 6)
            ctx.stroke()
            x += 10
            y += 15
            break
        case 'I':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y)
            ctx.lineTo(x + 8, y - 9)
            ctx.stroke()
            ctx.moveTo(x, y)
            ctx.lineTo(x + 9, y - 6)
            ctx.stroke()
            x += 9
            y -= 6
            break
        case 'I-INDICATOR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y)
            ctx.lineTo(x + 8, y - 8)
            ctx.stroke()
            x += 7
            y -= 7
            break
        case 'I-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, prefixYpos)
            ctx.lineTo(x + 8, prefixYpos - 8)
            ctx.stroke()
            x += 7
            break
        case 'ING-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x + 6, suffixYpos)
            ctx.lineTo(x + 6 + 8, suffixYpos - 8)
            ctx.stroke()
            x += 7
            y -= 7
            break
        case 'J':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 5                       // Arc radius
            ctx.moveTo(x + (radius / 2), y)
            startAngle = 0 * Math.PI;             // Starting point on circle
            endAngle = 1 * Math.PI// End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 2, y - 4, radius, startAngle, endAngle, false)
            x += radius * 2
            ctx.moveTo(x + (radius / 2) - 3, y - 19)
            ctx.lineTo(x + (radius / 2) - 3, y - 4)
            ctx.stroke()
            y -= 19
            break
        case 'K':
        case 'K-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y)
            ctx.lineTo(x - 8, y + 7)
            ctx.lineTo(x, y + 12)
            ctx.stroke()
            y += 12
            break
        case 'L':
        case 'L-ABBR':
            formatSegment(segment, ctx, '')
            y += 11
            radius = 20;                       // Arc radius
            ctx.beginPath()
            startAngle = 0.6            // Starting point on circle
            endAngle = 5.7 // End point on circle
            ctx.arc(x + (radius / 2) - 27, y, radius, startAngle, endAngle, true);
            ctx.stroke()
            x += 1
            y += 11
            break
        case 'LR-BLEND':
            formatSegment(segment, ctx, '')
            finalXAdjustment = -30
            finalYAdjustment = +8
            radius = 36;                       // Arc radius
            ctx.beginPath()
            startAngle = 0.7             // Starting point on circle
            endAngle = 5.7 // End point on circle
            ctx.arc(x + finalXAdjustment, y + 11 + finalYAdjustment, radius, startAngle, endAngle, true);
            ctx.stroke()
            x -= 2
            y += radius + 7
            break
        case 'M':
        case 'M-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 6;                       // Arc radius
            ctx.moveTo(x + (radius / 2), y)
            startAngle = -0.1;             // Starting point on circle
            endAngle = 3.241592653589793 // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 3, y, radius, startAngle, endAngle, true)
            ctx.stroke()
            x += radius * 2
            y -= 1
            break
        case 'M-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 6;                       // Arc radius
            ctx.moveTo(x + (radius / 2), y)
            startAngle = -0.1;             // Starting point on circle
            endAngle = 3.241592653589793 // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 3, prefixYpos, radius, startAngle, endAngle, true)
            ctx.stroke()
            x += radius * 2
            y -= 1
            break
        case 'MR-BLEND':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 16;                       // Arc radius
            ctx.moveTo(x + (radius / 2), y)
            startAngle = 1.9 * Math.PI;             // Starting point on circle
            endAngle = 1.1 * Math.PI // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 6, y + 5, radius, startAngle, endAngle, true)
            ctx.stroke()
            x += (radius * 2) - 2
            y -= 1
            break
        case 'N':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 2.5                       // Arc radius
            ctx.moveTo(x, y)
            startAngle = -0.1;             // Starting point on circle
            endAngle = 3.241592653589793 // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 2, y, radius, startAngle, endAngle, true)
            x += radius * 2
            ctx.moveTo(x + (radius / 2) - 1, y + 7)
            ctx.lineTo(x + (radius / 2) - 1, y)
            ctx.stroke()
            // x += (radius / 2) - 1
            y += 7
            break
        case 'N-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 2.5                       // Arc radius
            ctx.moveTo(x, y)
            startAngle = -0.1;             // Starting point on circle
            endAngle = 3.241592653589793 // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 2, y - 6, radius, startAngle, endAngle, true)
            x += radius * 2
            ctx.moveTo(x + (radius / 2) - 1, y - 6 + 7)
            ctx.lineTo(x + (radius / 2) - 1, y - 6 - 1)
            ctx.stroke()
            // x += (radius / 2) - 1
            // y += 7
            break
        case 'N-INDICATOR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 2.5                       // Arc radius
            ctx.moveTo(x, y)
            startAngle = -0.1;             // Starting point on circle
            endAngle = 3.241592653589793 // End point on circle
            y = 100 - 40
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 2, y, radius, startAngle, endAngle, true)
            x += radius * 2
            ctx.moveTo(x + (radius / 2) - 1, y + 7)
            ctx.lineTo(x + (radius / 2) - 1, y - 1)
            ctx.stroke()
            x += 20
            y = 100
            break
        case 'N-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 2.5                       // Arc radius
            ctx.moveTo(x, prefixYpos)
            startAngle = -0.1;             // Starting point on circle
            endAngle = 3.241592653589793 // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 2, prefixYpos, radius, startAngle, endAngle, true)
            x += radius * 2
            ctx.moveTo(x + (radius / 2) - 1, prefixYpos + 7)
            ctx.lineTo(x + (radius / 2) - 1, prefixYpos - 1)
            ctx.stroke()
            x += (radius / 2) - 1
            break
        case 'O':
        case 'O-ABBR':
            finalXAdjustment = 6
            finalYAdjustment = 0
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            // if (last[0] == 'B' || last[0] == 'F') {
            //     x += 4
            // }
            radius = 3                       // Arc radius
            ctx.moveTo(x, y)
            startAngle = 1.8 * Math.PI             // Starting point on circle
            endAngle = 1.2 * Math.PI // End point on circle
            ctx.beginPath()
            ctx.arc(x + finalXAdjustment - 2, y + finalYAdjustment + 2, radius, startAngle, endAngle, false);
            ctx.stroke()
            x += finalXAdjustment
            y += 0
            break
        case 'O-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 3                       // Arc radius
            ctx.moveTo(x + (radius / 2), prefixYpos)
            startAngle = 1.8 * Math.PI             // Starting point on circle
            endAngle = 1.2 * Math.PI // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 1, prefixYpos - 3, radius, startAngle, endAngle, false);
            ctx.stroke()
            x += 5
            break
        case 'ONCE-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 3                       // Arc radius
            ctx.moveTo(x + (radius / 2), y)
            startAngle = 1.8 * Math.PI             // Starting point on circle
            endAngle = 1.2 * Math.PI // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 1, y - 4, radius, startAngle, endAngle, false);
            ctx.stroke()
            x += 14
            y -= 8

            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y)
            ctx.lineTo(x - 6, y)
            ctx.stroke()
            ctx.lineTo(x - 6, y + 6) // make this segment an arc
            ctx.stroke()
            ctx.lineTo(x, y + 6)
            ctx.stroke()
            y += 3

            break
        case 'OUR-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 3                       // Arc radius
            ctx.moveTo(x + (radius / 2), y)
            startAngle = 1.8 * Math.PI             // Starting point on circle
            endAngle = 1.2 * Math.PI // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 1, y - 4, radius, startAngle, endAngle, false);
            ctx.stroke()
            x += 5
            y -= 6

            ctx.beginPath()
            formatSegment(segment, ctx, '')
            // allow for R following F
            if (last[0] == 'F') {
                finalXAdjustment = 6
                finalYAdjustment = -12
                x += finalXAdjustment
                y += finalYAdjustment
            }
            ctx.moveTo(x, y)
            ctx.lineTo(x + 16, y - 16)
            ctx.stroke()
            y -= 16
            x += 16
            break

        case 'OUT-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 3                       // Arc radius
            ctx.moveTo(x + (radius / 2), y)
            startAngle = 1.8 * Math.PI             // Starting point on circle
            endAngle = 1.2 * Math.PI // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 1, y - 4, radius, startAngle, endAngle, false);
            ctx.stroke()
            x += 5
            y -= 6

            ctx.beginPath()
            formatSegment(segment, ctx, '')
            if (last[0] == 'T' || last[0] == 'D') {
                finalYAdjustment = -4
                y += finalYAdjustment
            }

            ctx.moveTo(x, y + finalYAdjustment)
            ctx.lineTo(x + 20, y + finalYAdjustment)
            ctx.stroke()
            x += 19
            break
        case 'P':
            finalXAdjustment = 0
            finalYAdjustment = 20
            // Fixed height segment
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x + finalXAdjustment, y)
            ctx.lineTo(x + finalXAdjustment, y + finalYAdjustment)
            ctx.stroke()
            x += 1
            y += 20
            break
        case 'P-ABBR':
            // Fixed height segment
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x + 5, 100 - 8)
            ctx.lineTo(x + 5, 100 + 12)
            ctx.stroke()
            x += 6
            y += 12
            break
        case 'PL-BLEND':
            finalXAdjustment = 1
            finalYAdjustment = 10
            formatSegment(segment, ctx, '')
            y -= 10 // force L across the line for PL Blend
            radius = 20;                       // Arc radius
            ctx.beginPath()
            startAngle = 0.7             // Starting point on circle
            endAngle = 5.7 // End point on circle
            ctx.arc(x + finalXAdjustment + (radius / 2) - 27, y + finalYAdjustment + 11, radius, startAngle, endAngle, true);
            ctx.stroke()

            y += 34
            break
        case 'Q':
        case 'Q-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 3                          // Arc radius
            ctx.moveTo(x + (radius / 2), y)
            startAngle = 0;                           // Starting point on circle
            endAngle = 3.24 //Math.PI + (Math.PI * j) / 2 // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 3.5, 100 + 14, radius, startAngle, endAngle, false)
            ctx.moveTo(x + 2, 100 - 6)
            ctx.lineTo(x + 2, 100 + 14)
            ctx.moveTo(x + 2 + (radius * 2), 100 - 6)
            ctx.lineTo(x + 2 + (radius * 2), 100 + 14)
            ctx.stroke()
            x += 11
            y = 100 - 6
            break
        case 'R':
        case 'R-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            // allow for R following F
            if (last[0] == 'F') {
                finalXAdjustment = 6
                finalYAdjustment = -12
                x += finalXAdjustment
                y += finalYAdjustment
            }
            ctx.moveTo(x, y)
            ctx.lineTo(x + 16, y - 16)
            ctx.stroke()
            y -= 16
            x += 16
            break
        case 'S':
        case 'S-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 3                         // Arc radius
            ctx.moveTo(x + (radius / 2), y)
            startAngle = 0                           // Starting point on circle
            endAngle = Math.PI * 2 // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 1, y - 1 - 2, radius, startAngle, endAngle, false)
            ctx.stroke()
            x += (radius * 2) - 2
            y -= 5

            break
        case 'SH-INDICATOR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            // x += 6
            y -= 10
            radius = 3;                       // Arc radius
            startAngle = 1.4 * Math.PI          // Starting point on circle
            endAngle = 1 * Math.PI // End point on circle
            ctx.arc(x + 1, y + (radius * 2) + 13, radius, startAngle, endAngle, false);
            ctx.stroke()

            ctx.beginPath()
            radius = 3;                       // Arc radius
            startAngle = 1.9 * Math.PI             // Starting point on circle
            endAngle = 0.4 * Math.PI // End point on circle
            ctx.arc(x + radius - 2, y + 13, radius, startAngle, endAngle, true);
            ctx.stroke()

            y += 22
            break
        case 'SH-SUFFIX':
        case "SHIP-SUFFIX":
        case "CIAL-SUFFIX":
        case "TIAL-SUFFIX":
        case "SHL-SUFFIX":
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            x -= 2
            radius = 3;                       // Arc radius
            startAngle = 1.4 * Math.PI          // Starting point on circle
            endAngle = 1 * Math.PI // End point on circle
            ctx.arc(x + 6, prefixYpos + (radius * 2), radius, startAngle, endAngle, false);
            ctx.stroke()

            ctx.beginPath()
            radius = 3;                       // Arc radius
            startAngle = 1.9 * Math.PI             // Starting point on circle
            endAngle = 0.4 * Math.PI // End point on circle
            ctx.arc(x + radius + 3, prefixYpos, radius, startAngle, endAngle, true);
            ctx.stroke()
            break
        case 'T':
        case "TO-ABBR":
        case 'T-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            if (last[0] == 'T' || last[0] == 'D') {
                finalYAdjustment = -4
                y += finalYAdjustment
            }

            ctx.moveTo(x, y + finalYAdjustment)
            ctx.lineTo(x + 20, y + finalYAdjustment)
            ctx.stroke()
            x += 19
            break
        case 'TH-BLEND':
        case 'THR-BLEND':
            finalXAdjustment = 0
            finalYAdjustment = -20
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y)
            ctx.lineTo(x + 20, y)
            ctx.stroke()
            ctx.moveTo(x + 20, y)
            ctx.lineTo(x + 20, y + 20)
            ctx.stroke()
            x += 20
            y += 20
            break
        case 'THE-ABBR':
        case 'THEY-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y - 20)
            ctx.lineTo(x + 20, y - 20)
            ctx.stroke()
            ctx.moveTo(x + 20, y)
            ctx.lineTo(x + 20, y - 20)
            ctx.stroke()
            if (segment == 'THEY-ABBR') {
                ctx.moveTo(x + 20, y)
                ctx.lineTo(x + 28, y + 4)
                ctx.stroke()
            }
            x += 20
            break
        case 'TN-BLEND':
            finalXAdjustment = 0
            finalYAdjustment = 0
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y + finalYAdjustment)
            ctx.lineTo(x + 40, y + finalYAdjustment)
            ctx.stroke()
            radius = 7                     // Arc radius
            ctx.moveTo(x + 35 + (radius / 2), y + finalYAdjustment)
            startAngle = 1.5 * Math.PI             // Starting point on circle
            endAngle = 0.05 * Math.PI // End point on circle
            ctx.beginPath()
            ctx.arc(x + 35 + (radius / 2) + 1, y + finalYAdjustment + 7, radius, startAngle, endAngle, false);
            ctx.stroke()
            x += 46
            y += 9
            break
        case 'TR-BLEND':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            var heightadjustment = 5
            ctx.moveTo(x, y - heightadjustment)
            ctx.lineTo(x + 40, y - heightadjustment)
            ctx.stroke()
            x += 39
            y -= heightadjustment
            break
        case 'U':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 2                          // Arc radius
            ctx.moveTo(x + (radius / 2), y)
            y += 8
            startAngle = 0                           // Starting point on circle
            endAngle = 3.24 //Math.PI + (Math.PI * j) / 2; // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 1, y - 3, radius, startAngle, endAngle, false)
            ctx.moveTo(x, y - 9)
            ctx.lineTo(x, y - 3)
            ctx.moveTo(x + (radius * 2), y - 9)
            ctx.lineTo(x + (radius * 2), y - 3)
            ctx.stroke()
            x += (radius * 2)
            // y -= 9
            break
        case 'U-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 2                          // Arc radius
            ctx.moveTo(x + (radius / 2), prefixYpos)
            startAngle = 0                           // Starting point on circle
            endAngle = 3.24 //Math.PI + (Math.PI * j) / 2; // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 1, prefixYpos - 3, radius, startAngle, endAngle, false)
            ctx.moveTo(x, prefixYpos - 9)
            ctx.lineTo(x, prefixYpos - 3)
            ctx.moveTo(x + (radius * 2), prefixYpos - 9)
            ctx.lineTo(x + (radius * 2), prefixYpos - 3)
            ctx.stroke()
            x += (radius * 2)
            break
        case 'V':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y)
            ctx.lineTo(x + 4, y + 6)
            ctx.lineTo(x + 8, y)
            ctx.stroke()
            x += 8
            break
        case 'V-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            y -= 6
            ctx.moveTo(x, y)
            ctx.lineTo(x + 4, y + 6)
            ctx.lineTo(x + 8, y)
            ctx.stroke()
            x += 8
            break
        case 'V-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, prefixYpos)
            ctx.lineTo(x + 4, prefixYpos + 6)
            ctx.lineTo(x + 8, prefixYpos)
            ctx.stroke()
            x += 8
            break
        case 'W':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 8                        // Arc radius
            y += 5
            ctx.moveTo(x + (radius / 2), y)
            startAngle = 2.1 * Math.PI                          // Starting point on circle
            endAngle = 0.9 * Math.PI // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 4, y - 8, radius, startAngle, endAngle, false)
            ctx.stroke()
            x += (radius * 2) - 1
            y -= 4
            break
        case "WH-INDICATOR":
            y += 3
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 8                        // Arc radius
            ctx.moveTo(x, y)
            startAngle = 2.1 * Math.PI                          // Starting point on circle
            endAngle = 0.9 * Math.PI // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 4, y - 8, radius, startAngle, endAngle, false)
            ctx.stroke()
            x += (radius * 2)
            y -= 6
            break
        case 'W-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 8                        // Arc radius
            y += 1
            x -= 5
            ctx.moveTo(x + (radius / 2), y)
            startAngle = 2.1 * Math.PI                          // Starting point on circle
            endAngle = 0.9 * Math.PI // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 4, y - 8, radius, startAngle, endAngle, false)
            ctx.stroke()
            x += (radius * 2) - 1
            y -= 4
            break
        case 'WR-BLEND':
            finalXAdjustment = 3
            finalYAdjustment = 10
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 16                        // Arc radius
            ctx.moveTo(x + (radius / 2) + finalXAdjustment, y + finalYAdjustment)
            startAngle = 2.1 * Math.PI                          // Starting point on circle
            endAngle = 0.9 * Math.PI // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 4 + finalXAdjustment, y - 16 + finalYAdjustment, radius, startAngle, endAngle, false)
            ctx.stroke()
            x += (radius * 2) - 3
            y += 0
            break
        case 'X':
        case 'X-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x, y)
            ctx.lineTo(x + 12, y - 12)
            ctx.moveTo(x, y - 12)
            ctx.lineTo(x + 12, y)
            ctx.stroke()
            x += 12
            break
        case 'Y':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 4 // Arc radius
            if (last[0] == 'B') {
                x += 2
            }

            y -= 9
            ctx.moveTo(x + (radius / 2), y)
            startAngle = 13                           // Starting point on circle
            endAngle = 2.74 //Math.PI + (Math.PI * j) / 2 // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 3, y + 6, radius, startAngle, endAngle, false)
            ctx.lineTo(x, y)
            ctx.moveTo(x + 9, y)
            ctx.lineTo(x + 9, y + 15)
            ctx.stroke()
            x += radius * 2 + 3
            y += 14
            break
        case 'Y-ABBR':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 4 // Arc radius
            y -= 9
            ctx.moveTo(x + (radius / 2), y)
            startAngle = 13                           // Starting point on circle
            endAngle = 2.74 //Math.PI + (Math.PI * j) / 2 // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 3, y + 6, radius, startAngle, endAngle, false)
            ctx.lineTo(x, y)
            ctx.moveTo(x + 9, y)
            ctx.lineTo(x + 9, y + 15)
            ctx.stroke()
            x += radius * 2 + 3
            y += 14
            break
        case 'Y-SUFFIX':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            radius = 4                          // Arc radius
            ctx.moveTo(x + (radius / 2), prefixYpos)
            startAngle = 13                           // Starting point on circle
            endAngle = 2.74 //Math.PI + (Math.PI * j) / 2 // End point on circle
            ctx.beginPath()
            ctx.arc(x + (radius / 2) + 3, prefixYpos + 6, radius, startAngle, endAngle, false)
            ctx.lineTo(x, prefixYpos)
            ctx.moveTo(x + 10, prefixYpos)
            ctx.lineTo(x + 10, prefixYpos + 15)
            ctx.stroke()
            x += radius * 2 + 3
            break
        case 'Z':
            formatSegment(segment, ctx, '')
            radius = 20;                       // Arc radius

            ctx.beginPath()
            radius = 3;                       // Arc radius
            startAngle = 0 * Math.PI          // Starting point on circle
            endAngle = 2 * Math.PI // End point on circle
            ctx.arc(x + 3, y - 1, radius, startAngle, endAngle, true);
            ctx.stroke()

            ctx.beginPath()
            radius = 10;                       // Arc radius
            startAngle = 5.1             // Starting point on circle
            endAngle = 4 // End point on circle
            ctx.arc(x + 7, y + 4, radius, startAngle, endAngle, true);
            ctx.stroke()

            ctx.beginPath()
            radius = 24
            startAngle = 0.7             // Starting point on circle
            endAngle = 5.7 // End point on circle
            ctx.arc(x + (radius / 2) - 21, y + 8, radius, startAngle, endAngle, true);
            ctx.stroke()
            x += 11
            y += 23
            break
        case ' ':
            ctx.beginPath()
            formatSegment(segment, ctx, '')
            ctx.moveTo(x + 20, 100)
            ctx.stroke()
            x += 20
            break
        case '.':
            ctx.beginPath()
            formatSegment(segment, ctx, 'separator')
            ctx.moveTo(x + 40, 100 - 50)
            ctx.lineTo(x + 25, 100 + 50)
            ctx.stroke()
            x += 40
            y = 100
            break
        case ',':
            ctx.beginPath()
            formatSegment(segment, ctx, 'separator')
            ctx.moveTo(x + 40, 100 - 20)
            ctx.lineTo(x + 30, 100 + 15)
            ctx.stroke()
            x += 60
            break
        default:
        // alert("nothing here")
    }
    return [segment, x, y]
}

function plotRawText() {
    var letters = document.getElementById("rawtext").value
    if (letters == '') {
        alert("Enter some text or choose a sentence")
        return
    }
    document.getElementById("teelinealphabet").hidden = true
    document.getElementById("teelinesymbols").hidden = true
    document.getElementById("teelinedisplay").hidden = true
    document.getElementById("abbreviations").hidden = true

    document.getElementById("teelinedisplay").hidden = false
    plotSentence(letters)
}

function plotZoomedText() {
    var letters = document.getElementById("rawtext").value
    if (letters == '') {
        alert("Enter some text or choose a sentence")
        return
    }
    document.getElementById("teelinedisplay").hidden = false
    plotSentence(letters, suppressoptions = true)
}

function plotSymbol(name, type) {

    // saveCurrentOptions()

    switch (true) {
        case type.endsWith('INDICATOR'):
            options.useIndicators = true
            break
        case type.endsWith('BLEND'):
            options.useBlends = true
            break
        case type.endsWith('ABBR'):
            options.useAbbreviations = true
            break
        case type.endsWith('PREFIX'):
            options.usePrefixes = true
            break
        case type.endsWith('SUFFIX'):
            options.useSuffixes = true
            break

    }
    document.getElementById("teelinedisplay").hidden = false
    plotSentence(name, suppressoptions = true)
}

function adjustYatWordBoundary(segment, last) {
    var previoussegment = last[0]

    // if not a word boundary return Y as is with no change
    if ((last[0] != ' ' && last[0] != '' && last[0] != '.' && last[0] != ',')) {
        return 0
    }

    // segment is at the start of a word
    //    - make height adjustments for special cases

    var newY = 0

    switch (previoussegment) {
        case 'B':
            newY = -26
            break
        default:
            break
    }

    switch (segment) {
        case 'A-INDICATOR':
            newY = -6
            break
        case 'C':
            newY = -6
            break
        case 'CH-INDICATOR':
        case 'TCH-INDICATOR':
        case 'SH-INDICATOR':
            newY = -12
            break
        case 'CM-BLEND':
            newY = -13
            break
        case 'E-INDICATOR':
            newY = -11
            break
        case 'FB-BLEND':
            newY = -30
            break
        case 'H':
            newY = -20
            break
        case 'HV-BLEND':
            newY = -20
            break
        case 'L':
            newY = -19
            break
        case 'LR-BLEND':
            newY = -41
            break
        case 'N':
            newY = -6
            break
        case 'P':
            newY = -10
            break
        case 'PL-BLEND':
            newY = -23
            break
        case 'T':
            newY = -6
            break
        case 'THR-BLEND':
        case 'TH-BLEND':
            newY = -20
            break
        case 'TN-BLEND':
            newY = -9
            break
        case 'U':
            newY = -6
            break
        case 'V':
            newY = -6
            break
        case 'W':
            newY = -6
            break
        case 'WH-INDICATOR':
            newY = -3
            break
        case 'WR-BLEND':
            newY = -10
            break
        default:
            break
    }

    return newY

}


function preConditionWord(word) {

    // adjust word to uppercase for parsing
    word = word.toUpperCase()

    // check for Abbreviated words
    if (options.useAbbreviations && abbrsFullWordsArray[word.toUpperCase()] != undefined) {
        return word
    }

    // make a space before punctuation characters to force them 
    // into their own segment
    word = word.replace(",", " ,")
    word = word.replace(".", " .")

    // ignore some punctuation marks
    word = word.replace("?", "")
    word = word.replace("!", "")
    word = word.replace("'", "")
    word = word.replace('"', "")
    word = word.replace('_', "")

    if (options.useCompression) {

        // replace unnecessary letter groups with phonetic equivalents
        word = word.replace("CK", "K");
        word = word.replace("QU", "KW");
        word = word.replace("PH", "F");
        word = word.replace("AUGHT", "T");
        word = word.replace("IGH", "I");
        word = word.replace("GH", "F");
        word = word.replace("SYS", "SS");

    }


    return word
}

function applyBlendsInCompressedWord(resultArray) {
    if (resultArray.length < 2 || options.useBlends == false) {
        return resultArray
    }

    var newResultArray = []
    var lastsegment = resultArray[0]
    for (let index = 1; index < resultArray.length; index++) {
        const segment = resultArray[index];

        // check 2 letter blends
        if (blendsArray.includes((lastsegment + segment))) {
            newResultArray.push(lastsegment + segment + '-BLEND')
            lastsegment = ''
        } else {
            newResultArray.push(lastsegment)
            lastsegment = segment
        }
    }
    if (lastsegment != '') { // flush last segment
        newResultArray.push(lastsegment)
    }

    return newResultArray

}

function parseWord(word) {

    /*
        This function returns an array of values where the value has been interpreted as a special
        letter plot (based on options). 
        A special symbol can be 
         1. an Abbreviation of a full word
         2. A blend of 2 or more letters that have a special plot
         3. A common prefix special plot
         4. A common suffix special plot
         5. An Teeline indicator plot
    
    */

    word = preConditionWord(word)

    // parse the word letter by letter
    let result = [];
    let i = 0;
    while (i < word.length) {

        // === Abbreviations
        if (options.useAbbreviations && abbrsFullWordsArray[word.toUpperCase()] != undefined) {
            result.push(abbrsFullWordsArray[word.toUpperCase()])
            break
        }

        // === Partial word replacements - treated as special indicators
        // 3 letter partial words
        if (options.useIndicators && abbrsPartialWordsArray[word.substring(i, i + 3)] != undefined) {
            result.push(word.substring(i, i + 3) + "-INDICATOR");
            i += 3;
        }

        else

            // 2 letter partial words
            if (options.useIndicators && abbrsPartialWordsArray[word.substring(i, i + 2)] != undefined) {
                result.push(word.substring(i, i + 2) + "-INDICATOR");
                i += 2;
            }

            else

                // === Blends  
                // 3 letter blends
                if (options.useBlends && blendsArray.includes(word.substring(i, i + 3))) {
                    result.push(word.substring(i, i + 3) + "-BLEND");
                    i += 3;
                }

                else

                    // 2 letter blends
                    if (options.useBlends && blendsArray.includes(word.substring(i, i + 2))) {
                        result.push(word.substring(i, i + 2) + "-BLEND");
                        i += 2;
                    } else

                        // === PREFIXES
                        // 3 letter prefixes
                        if (options.usePrefixes && prefixesArray[word.substring(i, i + 3)] != undefined && (i == 0)) {
                            result.push(prefixesArray[word.substring(i, i + 3)]);
                            i += 3;
                        }

                        else
                            // 2 letter prefixes
                            if (options.usePrefixes && prefixesArray[word.substring(i, i + 2)] != undefined && (i == 0)) {
                                result.push(prefixesArray[word.substring(i, i + 2)]);
                                i += 2;
                            }

                            else

                                // === SUFFIXES
                                // 4 letter suffixes
                                if (options.useSuffixes && suffixesArray[word.substring(i, i + 4)] != undefined && ((i + 4) == word.length)) {
                                    result.push(suffixesArray[word.substring(i, i + 4)]);
                                    i += 4;
                                }

                                else
                                    // 3 letter suffixes
                                    if (options.useSuffixes && suffixesArray[word.substring(i, i + 3)] != undefined && ((i + 3) == word.length)) {
                                        result.push(suffixesArray[word.substring(i, i + 3)]);
                                        i += 3;
                                    }

                                    else
                                        // 2 letter suffixes
                                        if (options.useSuffixes && suffixesArray[word.substring(i, i + 2)] != undefined && ((i + 2) == word.length)) {
                                            result.push(suffixesArray[word.substring(i, i + 2)]);
                                            i += 2;
                                        }
                                        else {

                                            // normal character
                                            result.push(word[i]);
                                            i++;
                                        }
    } // end while


    if (options.useCompression) {
        result = applyFinalCompression(result, word)
    }

    if (options.useBlends) {
        result = applyBlendsInCompressedWord(result)
    }
    if (options.useIndicators || options.useSuffixes) {
        result = applyOneLetterIndicatorsAndSuffixes(result, word)
    }

    return result

}

function applyFinalCompression(resultArray, word) {

    // check for any duplicate single letter segments in the resultArray
    var lastChar = '';
    var ch = '';
    var newResultArray = [];
    for (i = 0; i < resultArray.length; i++) {
        ch = resultArray[i].toUpperCase();

        // ignore segments that are not 1 character long
        if (ch.length != 1) {
            newResultArray.push(ch)
            continue
        }


        switch (true) {
            // remove adjacent duplicate letters
            case ch == lastChar.toUpperCase():
                // remove adjacent duplicate letters
                if (ch == lastChar) {
                    continue;
                } else {
                    newResultArray.push(ch)
                }
                break;

            case ch == 'Y':
                // word ending y, oy
                if (i == resultArray.length - 1) {
                    if (word != "y" && word != "Y") {
                        if (wordsArray[currentWordIndex].originalword.endsWith('OY')) {
                            newResultArray.push(ch);
                        } else if (wordsArray[currentWordIndex].originalword.endsWith('AY')) {
                            newResultArray.push('A');
                        } else {
                            newResultArray.push('I');
                        }
                    } else {
                        newResultArray.push(ch);
                    }
                } else {
                    newResultArray.push(ch);
                }
                break;

            case 'AEIOU'.search(ch) > -1:
                // remove unnecessary vowels

                if (i == 0) { // Vowel is first letter in word
                    newResultArray.push(ch); // keep first vowel
                }

                else

                    // check word ending in a vowel (provided its not a word that is a full abbreviation)
                    if (i == resultArray.length - 1 && resultArray.length > 1
                        && abbrsFullWordsArray[word.toUpperCase()] == undefined) {
                        if ('EI'.indexOf(ch) > -1 // vowel is last letter in word and is A, E, I
                        ) { // and word is not an Abbreviated Full Word
                            break; // so ignore the last vowel
                        } else {
                            newResultArray.push(ch)
                        }
                    }

                // skip vowels anywhere else in the word
                lastChar = ch;
                continue;

            default:
                newResultArray.push(ch)
        } // end switch

        lastChar = ch;

    } // end for loop through chars of word

    return newResultArray

}

function applyOneLetterIndicatorsAndSuffixes(resultArray, word) {
    var newResultArray = resultArray

    // Finally after duplicate vowels removed check any 1 letter segments
    for (let index = 0; index < newResultArray.length; index++) {
        const segment = newResultArray[index];

        if (segment.length != 1) {
            continue
        }

        // 1 letter suffixes
        if (options.useSuffixes && suffixesArray[segment] != undefined && (index == resultArray.length - 1)) {

            // special case . compressed EY, UY, OY should stay as Y whereas
            // normal Y at end gets replaced with I-SUFFIX            
            if (wordsArray[currentWordIndex].originalword.endsWith('EY')
                || wordsArray[currentWordIndex].originalword.endsWith('OY')
                || wordsArray[currentWordIndex].originalword.endsWith('UY')
            ) {
                newResultArray[index] = 'Y';
            } else {
                newResultArray[index] = suffixesArray[segment];
            }
            continue
        }

        // === Indicators (1 character)
        if (options.useIndicators && indicatorsArray[segment] != undefined) {
            newResultArray[index] = indicatorsArray[segment];
            continue
        }

    }
    return newResultArray
}


function parseSentence(sentence) {
    //    make a space before punctuation characters to ensure 
    // they are split properly as words in their own right
    sentence = sentence.replace(",", " ,")
    sentence = sentence.replace(".", " .")

    //    ignore some punctuation marks altogether
    sentence = sentence.replace("?", "")
    sentence = sentence.replace("!", "")
    sentence = sentence.replace("'", "")
    sentence = sentence.replace('"', "")
    sentence = sentence.replace('_', "")

    var words = sentence.split(" ")
    wordsArray = []

    for (let wrd = 0; wrd < words.length; wrd++) {
        wordsArray.push(
            {
                originalword: words[wrd],
                segments: [],
            }
        )
    }

    for (let wordnum = 0; wordnum < wordsArray.length; wordnum++) {
        currentWordIndex = wordnum
        wordsArray[wordnum].segments = parseWord(
            wordsArray[wordnum].originalword
        )
    }

    return wordsArray
}

function clearText() {
    document.getElementById("rawtext").value = ''
    document.getElementById("compressedtext").value = ''
    document.getElementById("compressedtextincolor").innerHTML = ''
    document.getElementById("sentences").selectedIndex = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    document.getElementById("teelinedisplay").hidden = true
    document.getElementById("teelinealphabet").hidden = true
    document.getElementById("teelinesymbols").hidden = true
    document.getElementById("abbreviations").hidden = true
}

function plotSentence(sentence, suppressoptions = false) {

    if (!suppressoptions) {
        options = loadOptionsFromWebPage()
    }

    document.getElementById("rawtext").value = sentence
    wordsArray = []
    wordsArray = parseSentence(sentence)
    var compressedtext = ''
    var compressedtextcolored = ''
    for (const key in wordsArray) {
        compressedtext += wordsArray[key]["segments"].join('').trim() + ' '
        const segments = wordsArray[key]["segments"]
        for (segment of wordsArray[key]["segments"]) {
            compressedtextcolored += showCompressedText(segment)
        }
        compressedtextcolored += ' '
    }
    document.getElementById("compressedtext").value = compressedtext
    document.getElementById("compressedtextincolor").innerHTML = compressedtextcolored


    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawRuledLines(ctx)

    ctx.beginPath()
    ctx.strokeStyle = "#C0C0C0"
    ctx.lineWidth = 0.8
    ctx.moveTo(0, 100)
    ctx.lineTo(canvas.width, 100)
    ctx.stroke()

    var last = ["", 20, 100]
    wordXpositions = []
    var wordboundarystartx = last[1]



    for (var word of wordsArray) {


        if (word.originalword == 'FULL') {
            // break
        }

        wordboundarystartx = last[1]


        if (options.showlabels) {
            ctx.fillText(word.originalword, wordboundarystartx, labelYOffset);
            wordXpositions.push({
                wordstartxpos: wordboundarystartx,
                wordendxpos: 0,
                word: word.originalword
            })
        }

        for (var segment of word.segments) {

            switch (true) {
                case segment == ' ':
                    // no action required
                    break
                case segment == '.':
                    // no action required
                    break
                case segment == ',':
                    // no action required
                    break
                default:
                    segment = segment.toUpperCase()
            }

            // Height Adjustments
            last[2] += adjustYatWordBoundary(segment, last)

            last = plotSegment(segment, last[1], last[2], last)

            if (options.useJoinedLetters == false) {
                last[1] += 10
            }

            // if (last[0] == ' ' || last[0] == '.' || last[0] == ',') {
            //     last[2] = 100 // reset y when a space, full stop or comma occurs
            // }
        }
        var wordendx = last[1]

        if (word.originalword == 'FULL') {
            // break
        }


        // adjust Y to default at word boundary and
        // add a space after each word
        last[2] = 100
        last = plotSegment(' ', last[1], last[2], last)

    }

    // calculate end x positions of words

    for (let index = 0; index < wordXpositions.length; index++) {
        if (index < wordXpositions.length - 1) {
            wordXpositions[index].wordendxpos = wordXpositions[index + 1].wordstartxpos - 1
        } else {
            wordXpositions[index].wordendxpos = last[1]
        }
    }

    var a = 1
}

function showCompressedText(segment) {
    let compressedtext = ''
    switch (true) {
        case segment.endsWith('-INDICATOR'):
            compressedtext += '<font color="#FF0000">' + segment.replace('-INDICATOR', '') + '</font>'
            break
        case segment.endsWith('-ABBR'):
            compressedtext += '<font color="#008000">' + segment.replace('-ABBR', '') + '</font>'
            break
        case segment.endsWith('-BLEND'):
            compressedtext += '<font color="#FF8000">' + segment.replace('-BLEND', '') + '</font>'
            break
        case segment.endsWith('-PREFIX'):
            compressedtext += '<font color="#B8860B">' + segment.replace('-PREFIX', '') + '</font>'
            break
        case segment.endsWith('-SUFFIX'):
            compressedtext += '<font color="#B8860B">' + segment.replace('-SUFFIX', '') + '</font>'
            break
        default:
            compressedtext += segment
    }
    return compressedtext
}
function plotAlphabet() {
    document.getElementById("teelinealphabet").hidden = false
    document.getElementById("teelinedisplay").hidden = false
    document.getElementById("teelinesymbols").hidden = true
    plotSentence("A B C D E F G H I J K L M N O P Q R S T U V W X Y Z . , ")
}

function showSymbols() {
    document.getElementById("teelinealphabet").hidden = true
    document.getElementById("abbreviations").hidden = true
    document.getElementById("teelinedisplay").hidden = true

    document.getElementById("teelinesymbols").hidden = false
}

function showAbbreviations() {
    document.getElementById("teelinealphabet").hidden = true
    document.getElementById("teelinesymbols").hidden = true
    document.getElementById("teelinedisplay").hidden = true

    document.getElementById("abbreviations").hidden = false
}

function plotSentenceWordOptions() {
    var sentences_options = document.getElementById('sentences')
    var sentence = sentences_options.value
    if (sentence != "-- select a sentence --") {
        document.getElementById("teelinealphabet").hidden = true
        document.getElementById("teelinesymbols").hidden = true
        document.getElementById("teelinedisplay").hidden = true
        document.getElementById("abbreviations").hidden = true

        document.getElementById("teelinedisplay").hidden = false
        sentence = sentence.toUpperCase()
        document.getElementById("rawtext").value = sentence
        plotSentence(sentence)
        document.getElementById('sentences').selectedIndex = 0//  = "-- select a sentence --"
    }
}

function toggleLetters(numChars) {
    var rawtext = document.getElementById("rawtext").value
    var newtext = rawtext.substring(0, numChars - 1)
    document.getElementById("rawtext").value = ''
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.,'
    var pos = alphabet.indexOf(toggleLetter)
    pos += 1
    if (pos > alphabet.length - 1) {
        pos = 0
    }
    toggleLetter = alphabet.charAt(pos)
    document.getElementById("rawtext").value = newtext + toggleLetter
    plotRawText()
}

function addSecondLetter() {
    toggleLetters(2)
}

function addThirdLetter() {
    toggleLetters(3)
}

function addFourthLetter() {
    toggleLetters(4)
}

function addFifthLetter() {
    toggleLetters(5)
}

function addSixthLetter() {
    toggleLetters(6)
}

function drawRuledLines(ctx) {
    var lineHeight = 100;
    ctx.strokeStyle = "#D5D2D2";
    ctx.beginPath();
    for (var i = 0; i < 100; i++) {
        ctx.moveTo(0, (i + 1) * lineHeight)
        ctx.lineTo(canvas.width, (i + 1) * lineHeight);
        ctx.stroke();
    }
    ctx.strokeStyle = "#000000";
}

function ZoomIn() {
    const MAXZOOMLEVEL = 3
    ZoomLevel += 1
    if (ZoomLevel > MAXZOOMLEVEL) {
        ZoomLevel = MAXZOOMLEVEL
    }
    ZoomRenderedTeeline()

}

function ZoomOut() {
    const MINZOOMLEVEL = 1
    ZoomLevel -= 1
    if (ZoomLevel < MINZOOMLEVEL) {
        ZoomLevel = MINZOOMLEVEL
    }
    ZoomRenderedTeeline()
}


function ZoomRenderedTeeline() {
    switch (true) {
        case ZoomLevel == 1:
            ZoomLevel = 1
            ctx.setTransform(1, 0, 0, 1, 0, 0); // reset scale
            ctx.scale(1, 1)
            break
        case ZoomLevel == 2:
            ZoomLevel = 2
            ctx.setTransform(1, 0, 0, 1, 0, 0); // reset scale
            ctx.scale(1.2 + (aspectratio / 100), 1.2 + (aspectratio / 100))
            break
        case ZoomLevel == 3:
            ZoomLevel = 3
            ctx.setTransform(1, 0, 0, 1, 0, 0); // reset scale
            ctx.scale(1.6 + (aspectratio / 100), 1.6 + (aspectratio / 100))
            break
    }
    plotZoomedText() // Redraw after resizing

}

function showLabel(x) {
    for (let index = 0; index < wordXpositions.length; index++) {
        var startx, endx
        switch (true) {
            case ZoomLevel == 1:
                startx = wordXpositions[index].wordstartxpos;
                endx = wordXpositions[index].wordendxpos; break
            case ZoomLevel == 2:
                startx = wordXpositions[index].wordstartxpos * (1.2 + (aspectratio / 100));
                endx = wordXpositions[index].wordendxpos * (1.2 + (aspectratio / 100)); break
                break
            case ZoomLevel == 3:
                startx = wordXpositions[index].wordstartxpos * (1.6 + (aspectratio / 100));
                endx = wordXpositions[index].wordendxpos * (1.6 + (aspectratio / 100)); break
                break
        }
        const theword = wordXpositions[index].word;
        if (x >= startx && x < endx) { // 
            // document.getElementById("hoverlabel").innerHTML = x
            // document.getElementById("hoverlabel").innerHTML = theword
            // + ' x: ' + x //DEBUG:
            break
        }

    }
}

function toggleOptions() {
    if (document.getElementById("options").hidden == true) {
        document.getElementById("options").hidden = false
    } else {
        document.getElementById("options").hidden = true
    }
}
// MAIN ENTRY POINT

// *******************************
// LOCAL MODE TESTING WITH JEST TESTING
// (Comment out WEBSITE MODE section below and PLUGIN MODE section above)
// (Uncomment this section for local testing with JEST)
// // *******************************
// var mode = "local"
// module.exports = {
//     parseSentence,
//     parseWord,
//     setOptions,
//     preConditionWord
// }

// *******************************
// LOGSEQ WEBSITE MODE
// (Comment out LOCAL MODE section above and PLUGIN mode section below and uncomment this section)
// *******************************
var mode = "website"

// Global Variables
var lastalternatecolor = "gray"
var wordsArray = []
var currentWordIndex = 0
var ZoomLevel = 1
var wordXpositions = [] // used for detecting hover labels

// ---- end Global Variables

if (mode == "local") {
    console.log('teelinemate code running locally')
}

if (mode == "website") {
    console.log('teelinemate code running in browser')
    // testing global variables
    var toggleLetter = "A"
    options = loadOptionsFromWebPage()

    // Canvas initialisation
    var c = document.getElementById('canvas');

    c.onmousemove = function (e) {
        var mouseX = e.clientX
        // console.log('mouseX: ' + mouseX);
        showLabel(mouseX)
    }
    var ctx = c.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 1
    var aspectratio = c.width / c.height


    // plotting variables
    var xOffset = 20
    var yOffset = 100
    var x = xOffset
    var y = yOffset
    var labelYOffset = 30

}

// ****** END OF CODE********

