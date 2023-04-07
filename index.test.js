const ToIndex = require('es-abstract/2017/ToIndex');
const functions = require('./index');

var CompressionTestCases = [ // useAbbreviations, useCompression
    `
EVERY GOOD BOY DESERVES FAVOUR
EXPECTED
EVRI GD BY DSRVS FVR 
`,
    // -------------------------------
    `
THE BOY STOOD ON THE BURNING DECK
EXPECTED
THE-ABBR BY STD ON THE-ABBR BRNNG DK
`,
    // -------------------------------

    `HE HAD NO TROUSERS TO HIS BOT HE HAD TO WEAR HIS SISTERS
EXPECTED
H-ABBR HD NO TRSRS T-ABBR HS BT H-ABBR HD T-ABBR WR HS SSTRS 
`,
    // -------------------------------

    `GOD SAVE OUR GRACIOUS QUEEN
EXPECTED
GD SV OUR-ABBR GRCS KWN
`,
    // -------------------------------
    `OUR FATHER WHO ART IN HEAVEN HALLOWED BE THY NAME
EXPECTED
OUR-ABBR FTHR WHO ART N-ABBR HVN HLWD B-ABBR THI NM 
`,
    // -------------------------------
    `THE SUN IS THE STAR AT THE CENTER OF THE SOLAR SYSTEM. IT IS A NEARLY PERFECT SPHERE OF HOT PLASMA
EXPECTED
THE-ABBR SN S-ABBR THE-ABBR STR T-ABBR THE-ABBR CNTR O-ABBR THE-ABBR SLR STM . T-ABBR S-ABBR A NRLI PRFCT SFR O-ABBR HT PLSMA
`,
    // -------------------------------
    `EARTH IS THE THIRD PLANET FROM THE SUN AND THE ONLY OBJECT IN THE UNIVERSE KNOWN TO HARBOR LIFE
EXPECTED
ERTH S-ABBR THE-ABBR THRD PLNT F-ABBR THE-ABBR SN N-ABBR THE-ABBR ONLI OBJCT N-ABBR THE-ABBR UNVRS KNWN T-ABBR HRBR LF
`,
    // -------------------------------
    `HERE WAS ONCE A VELVETEEN RABBIT, AND IN THE BEGINNING HE WAS REALLY SPLENDID. 
EXPECTED
HR WS ONCE-ABBR A VLVTN RBT , N-ABBR N-ABBR THE-ABBR BGNNG H-ABBR WS RLI SPLNDD .
`,
    // -------------------------------

    `HE WAS FAT AND BUNCHY, AS A RABBIT SHOULD BE
EXPECTED
H-ABBR WS FT N-ABBR BNCHI , AS A RBT SHLD B-ABBR
`,
    // -------------------------------

    `HIS COAT WAS SPOTTED BROWN AND WHITE
EXPECTED
HS CT WS SPTD BRWN N-ABBR WHT
`,
    // -------------------------------

    `HE HAD REAL THREAD WHISKERS, AND HIS EARS WERE LINED WITH PINK SATEEN
EXPECTED
H-ABBR HD RL THRD WHSKRS , N-ABBR HS ERS WR LND WTH PNK STN
`,
    // -------------------------------

    `ON CHRISTMAS MORNING, WHEN HE SAT WEDGED IN THE TOP OF THE BOYS STOCKING
EXPECTED
ON CHRSTMS MRNNG , WHN H-ABBR ST WDGD N-ABBR THE-ABBR TP O-ABBR THE-ABBR BYS STKNG
`,
    // -------------------------------

    `WITH A SPRIG OF HOLLY BETWEEN HIS PAWS THE EFFECT WAS CHARMING
EXPECTED
WTH A SPRG O-ABBR HLI BTWN HS PWS THE-ABBR EFCT WS CHRMNG
`
    // -------------------------------
]


var CompressionTestCases2 = [ // useAbbreviations, useCompression, usePrefixes, useSuffixes, useIndicators
    `
EVERY GOOD BOY DESERVES FAVOUR
EXPECTED
E-INDICATORVRI-INDICATOR GD BY-SUFFIX DSRVS FVR
`,
    // -------------------------------
    `
THE BOY STOOD ON THE BURNING DECK
EXPECTED
THE-ABBR BY-SUFFIX STD ON THE-ABBR BRNING-SUFFIX DK
`,
    // -------------------------------

    `HE HAD NO TROUSERS TO HIS BOT HE HAD TO WEAR HIS SISTERS
EXPECTED
H-ABBR HD NO TRSRS T-ABBR HS BT H-ABBR HD T-ABBR WR HS SSTRS
`,
    // -------------------------------

    `GOD SAVE OUR GRACIOUS QUEEN
EXPECTED
GD SV OUR-ABBR GRCS KWN 
`,
    // -------------------------------
    `OUR FATHER WHO ART IN HEAVEN HALLOWED BE THY NAME
EXPECTED
OUR-ABBR FTHR WH-INDICATORO A-INDICATORRT N-ABBR HVN HLWD B-ABBR THI-INDICATOR NM
`,
    // -------------------------------
    `THE SUN IS THE STAR AT THE CENTER OF THE SOLAR SYSTEM. IT IS A NEARLY PERFECT SPHERE OF HOT PLASMA
EXPECTED
THE-ABBR SN S-ABBR THE-ABBR STR T-ABBR THE-ABBR CNTR O-ABBR THE-ABBR SLR STM . T-ABBR S-ABBR A-INDICATOR NRLI-INDICATOR PRFCT SFR O-ABBR HT PLSMA-INDICATOR
`,
    // -------------------------------
    `EARTH IS THE THIRD PLANET FROM THE SUN AND THE ONLY OBJECT IN THE UNIVERSE KNOWN TO HARBOR LIFE
EXPECTED
E-INDICATORRTH S-ABBR THE-ABBR THRD PLNT F-ABBR THE-ABBR SN N-ABBR THE-ABBR ONLI-INDICATOR OBJCT N-ABBR THE-ABBR UNVRS KNWN T-ABBR HRBR LF
`,
    // -------------------------------
    `HERE WAS ONCE A VELVETEEN RABBIT, AND IN THE BEGINNING HE WAS REALLY SPLENDID. 
EXPECTED
HR WS ONCE-ABBR A-INDICATOR VLVTN RBT , N-ABBR N-ABBR THE-ABBR BGNING-SUFFIX H-ABBR WS RLI-INDICATOR SPLNDD .
`,
    // -------------------------------

    `HE WAS FAT AND BUNCHY, AS A RABBIT SHOULD BE
EXPECTED
H-ABBR WS FT N-ABBR BNCH-INDICATORI-INDICATOR , A-INDICATORS A-INDICATOR RBT SH-INDICATORLD B-ABBR
`,
    // -------------------------------

    `HIS COAT WAS SPOTTED BROWN AND WHITE
EXPECTED
HS CT WS SPTD BRWN N-ABBR WH-INDICATORT
`,
    // -------------------------------

    `HE HAD REAL THREAD WHISKERS, AND HIS EARS WERE LINED WITH PINK SATEEN
EXPECTED
H-ABBR HD RL THRD WH-INDICATORSKRS , N-ABBR HS E-INDICATORRS WR LND WTH PNK STN
`,
    // -------------------------------

    `ON CHRISTMAS MORNING, WHEN HE SAT WEDGED IN THE TOP OF THE BOY S STOCKING
EXPECTED
ON CH-INDICATORRSTMS MRNING-SUFFIX , WH-INDICATORN H-ABBR ST WDGD N-ABBR THE-ABBR TP O-ABBR THE-ABBR BY-SUFFIX S STKING-SUFFIX
`,
    // -------------------------------

    `WITH A SPRIG OF HOLLY BETWEEN HIS PAWS THE EFFECT WAS CHARMING
EXPECTED
WTH A-INDICATOR SPRG O-ABBR HLI-INDICATOR BTWN HS PWS THE-ABBR E-INDICATORFCT WS CH-INDICATORRMING-SUFFIX
`
    // -------------------------------
]



//-------------------------------------------------------
// local functions to assist testing
//-------------------------------------------------------

function saveAutomatedTestOutput(msg) {
    fs.writeFile('testing_results.txt', msg, function (err) {
        if (err)
            return console.log(err);
        console.log('Test Results written to testing_results.txt');
    });
}

// parseWord Tests

describe('parseSentence Manual Tests', () => {

    it('BURNING ING Suffix', () => {
        const word = 'BURNING';
        functions.setOptions({
            useCompression: true,
            useAbbreviations: true,
            usePrefixes: true,
            useSuffixes: true,
            useIndicators: true
        })
        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "BRNING-SUFFIX"
        expect(actualresult).toEqual(expectedresult);
    });

    it('OUR abbreviation UR', () => {
        const word = 'OUR';
        functions.setOptions({
            useCompression: true,
            useAbbreviations: true
        })
        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "OUR-ABBR"
        expect(actualresult).toEqual(expectedresult);
    });

    it('THE Abbreviation', () => {
        const word = 'THE';
        functions.setOptions({
            useCompression: true,
            useAbbreviations: true,
        })
        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "THE-ABBR"
        expect(actualresult).toEqual(expectedresult);
    });

    it('should return an array of values where the value has been interpreted as a special letter plot', () => {
        const word = 'hello';
        functions.setOptions({
            useBlends: true,
            usePrefixes: true,
            useSuffixes: true,
        })
        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "HELLO"
        expect(actualresult).toEqual(expectedresult);
    });

    it('should return an Abbreviation of a full word', () => {
        const word = 'THE';
        functions.setOptions({
            useAbbreviations: true,
            useCompression: true
        })
        expect(functions.parseWord(word)).toEqual(['THE-ABBR']);
    });

    it('should return a blend of 2 or more letters that have a special plot', () => {
        const word = 'THR';
        functions.setOptions({
            useBlends: true
        })
        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "THR-BLEND"
        expect(actualresult).toEqual(expectedresult);
    });

    it('should return a common prefix special plot', () => {
        const word = 'conhello';
        functions.setOptions({
            usePrefixes: true
        })
        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "CON-PREFIXHELLO"
        expect(actualresult).toEqual(expectedresult);
    });

    it('should return a common suffix special plot', () => {
        const word = 'HELLOING';
        functions.setOptions({
            useSuffixes: true
        })
        expect(functions.parseWord(word)).toEqual(['H', 'E', 'L', 'L', 'O', 'ING-SUFFIX']);
    });

    it('should return an Teeline indicator plot', () => {
        const word = 'HELLOI';
        functions.setOptions({
            useIndicators: true
        })
        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "HE-INDICATORLLOI-INDICATOR"
        expect(actualresult).toEqual(expectedresult);
    });

    it('SAVE last E deleted', () => {
        const word = 'SAVE';
        functions.setOptions({
            useCompression: true,
            useAbbreviations: true,
        })
        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "SV"
        expect(actualresult).toEqual(expectedresult);
    });

    it('NO', () => {
        const word = 'NO';
        functions.setOptions({
            useCompression: true,
            useAbbreviations: true
        })
        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "NO"
        expect(actualresult).toEqual(expectedresult);
    });

    it('oy suffix', () => {
        const word = 'boy';
        functions.setOptions({
            useCompression: true,
            useSuffixes: true
        })
        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "BY-SUFFIX"
        expect(actualresult).toEqual(expectedresult);
    });

    it('double e', () => {
        const word = 'heel';
        functions.setOptions({
            useCompression: true
        })
        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "HL"
        expect(actualresult).toEqual(expectedresult);
    });

    it('double e, no compress', () => {
        const word = 'HEEL';
        functions.setOptions({
            useCompression: false
        })
        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "HEEL"
        expect(actualresult).toEqual(expectedresult);
    });

    it('starting a, embedded a, ending e e', () => {
        const word = 'amaze';
        functions.setOptions({
            useCompression: true
        })
        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "AMZ"
        expect(actualresult).toEqual(expectedresult);
    });

    it('ue ending', () => {
        const word = 'undue';
        functions.setOptions({
            useCompression: true,
            useSuffixes: true
        })

        var resultArray = functions.parseSentence(word)
        var actualresult = ''
        for (const key in resultArray) {
            actualresult += resultArray[key]["segments"].join('').trim() + ' '
        }
        actualresult = actualresult.trim()
        var expectedresult = "UNDU-SUFFIX"
        expect(actualresult).toEqual(expectedresult);
    });



}); // end describe

describe('parseSentence Automated Tests', () => {

    it('parseSentence tests with compression', () => {
        var msg = ''
        console.log("****** parseSentence AUTOMATED TESTS STARTED ******");
        functions.setOptions({
            useCompression: true,
            useAbbreviations: true
        })
        testcases = CompressionTestCases
        var notests = testcases.length
        var nopasses = 0
        for (let testno = 0; testno < testcases.length; testno++) {
            const sentence = testcases[testno].split('EXPECTED')[0].trim()
            var expectedresult = testcases[testno].split('EXPECTED')[1].replace('EXPECTED\n', '').trim()
            msg += "\n\n - test " + (testno + 1) + " started ..." +
                '\n---------------------------------'
            functions.setOptions({
                useCompression: true,
                useAbbreviations: true
            })
            var resultArray = functions.parseSentence(sentence)
            var actualresult = ''
            for (const key in resultArray) {
                actualresult += resultArray[key]["segments"].join('').trim() + ' '
            }
            actualresult = actualresult.trim()
            msg += '\n' + 'sentence: ' + sentence + '\nresult:   ' + actualresult
            if (expectedresult != actualresult) {
                msg += "\nexpected: " + expectedresult + " **ERROR**\n"
            }
            if (actualresult == expectedresult) {
                msg += "\nOK\n"
                nopasses += 1
            }
            '\n---------------------------------\n\n'
        }
        console.log(msg);
        expect(nopasses).toEqual(notests)
    })
    it('parseSentence tests - full options', () => {
        var msg = ''
        console.log("****** parseSentence AUTOMATED TESTS STARTED ******");
        testcases = CompressionTestCases2
        var notests = testcases.length
        var nopasses = 0
        for (let testno = 0; testno < testcases.length; testno++) {
            const sentence = testcases[testno].split('EXPECTED')[0].trim()
            var expectedresult = testcases[testno].split('EXPECTED')[1].replace('EXPECTED\n', '').trim()
            msg += "\n\n - test " + (testno + 1) + " started ..." +
                '\n---------------------------------'
            functions.setOptions({
                useCompression: true,
                useAbbreviations: true,
                usePrefixes: true,
                useSuffixes: true,
                useIndicators: true
            })
            var resultArray = functions.parseSentence(sentence)
            var actualresult = ''
            for (const key in resultArray) {
                actualresult += resultArray[key]["segments"].join('').trim() + ' '
            }
            actualresult = actualresult.trim()
            msg += '\n' + 'sentence: ' + sentence + '\nresult:   ' + actualresult
            if (expectedresult != actualresult) {
                msg += "\nexpected: " + expectedresult + " **ERROR**\n"
            }
            if (actualresult == expectedresult) {
                msg += "\nOK\n"
                nopasses += 1
            }
            '\n---------------------------------\n\n'
        }
        console.log(msg);
        expect(nopasses).toEqual(notests)
    })

}); // end describe