const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const imageBtn = document.getElementById('randomImage');
const loader = document.getElementById('loader');


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API 
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank --> set Unknown
        data.quoteAuthor === '' ? authorText.innerText = 'Unknown' : authorText.innerText = data.quoteAuthor;

        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop loader, show quote
        removeLoadingSpinner();
    } catch (e) {
        error += 1;
        if (error <= 15) {
            getQuote();
        } else {
            alert('Something went wrong. Please try again later.'); // add funny quote or animation
        }   
    }
};
// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author= authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

function comingSoon() {
    alert('Quote on picture feature - Coming soon!')
}



// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
imageBtn.addEventListener('click', comingSoon);


// On Load
getQuote();
