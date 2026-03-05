// array to html-sting for synonyms
const createElements = (arr) =>{
    const htmlElement = arr.map((el)=> `<span class="btn">${el}</span>`)
    return htmlElement.join(" ");
}

// all level button
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json() )
    .then((json) => displayLessons(json.data));
}

// click level button load
const loadLevelWord = (id) =>{
    // console.log('id',id);

    // get level info
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive(); // active class - remove from all 
        const levelBtn = document.getElementById(`level-no-${id}`);
        levelBtn.classList.add('active');

        displayLevelWord(data.data)
    });
}

// load word info
const loadWordDetails = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

// display details card
const displayWordDetails = (word) => {
    console.log(word);

    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
        <div>
            <h2 class="font-bold text-2xl"> ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation}) </h2>
        </div>
        <div>
            <h2 class="font-bold"> Meaning </h2>
            <p class="font-bangla">${word.meaning}</p>
        </div>
        <div>
            <h2 class="font-bold"> Example </h2>
            <p class="font-bangla"> ${word.sentence} </p>
        </div>
        <div class="font-bold">
            <h2 class="font-bold font-bangla"> সমার্থক শব্দ গুলো </h2>
            <div class="gap-3">
                ${createElements(word.synonyms)}
            </div>
        </div>
    `;

    document.getElementById('word_modal').showModal();

}

// remove active class
const removeActive = () => {
    const levels = document.querySelectorAll('.level-btn');

    for(let level of levels)
    {
        level.classList.remove('active');
    }
}

// load level info
const displayLevelWord = (words) =>{
    // console.log('words',words);

    // get the container & empty it
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';


    // if level empty
    if( words.length === 0 ) {
        wordContainer.innerHTML = `
            <div class="text-center col-span-3 p-5 space-y-5">
                <img class="mx-auto" src="./assets/alert-error.png">

                <p class="text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        
                <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান।</h2>
            </div>
        `
    }

    // get into each word
    for(let word of words)
    {
        // create element
        const wordDiv = document.createElement('div');

        wordDiv.innerHTML = `
            <div class="bg-white rounded-sm shadow-sm px-5 py-10 text-center space-y-4">
                <h2 class="font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p>Meaning /Pronunciation</p>
                <h2 class="font-bold font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি" } / ${word.pronunciation ? word.pronunciation : "উচ্চারন পাওয়া যায়নি" }</h2>
                <div class="flex justify-between px-5">
                    <button onclick="loadWordDetails(${word.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `;
        // append into card
        wordContainer.append(wordDiv);
    }
}


// load level button
const displayLessons = (lessons) => {
    // console.log('lesson',lessons);

    // get the container & empty it
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    // get into each lesson
    for(let lesson of lessons)
    {
        // create element
        const btnDiv = document.createElement('div');
        
        btnDiv.innerHTML = `
            <button id="level-no-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary level-btn"> 
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no} 
            </button>
        `
        // append into container
        levelContainer.append(btnDiv);
    }
}

loadLessons();