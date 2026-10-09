const wordpos = new WordPOS({
    dictPath: 'https://cdn.jsdelivr.net/npm/wordpos-web@1.0.2/dict'
})
$(document).ready(function () {
    let latestRequest = 0;

    function updateBackground() {
        let sentence = $('#sentence').val();
        const request = ++latestRequest;

        wordpos.getPOS(sentence).then(function (types) {
            if (request !== latestRequest) return;

            var color =
            types.verbs.length +
            types.adverbs.length +
            types.nouns.length +
            types.adjectives.length +
            types.rest.length

            $('body').css('background-color', `hsl(${(color * 45) % 360}, 50%, 50%)`);
        })
    }

    updateBackground()
    $('#sentence').on('input', function () {
        const sentence = $(this).val();

        // Wait until a word is finished instead of analyzing every partial word.
        if (/[\s.!?,;:]$/.test(sentence)) {
            updateBackground();
        }
    })
})