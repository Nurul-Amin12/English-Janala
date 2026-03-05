
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json() )
    .then((json) => displayLessons(json.data));
}

const loadLevelWord = (id) =>{
    // console.log('id',id);
    
    // get level info
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data));
}

const displayLevelWord = (words) =>{
    // console.log('words',words);

    // get the container & empty it
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    // get into each word
    for(let word of words)
    {
        // create element
        const wordDiv = document.createElement('div');

        wordDiv.innerHTML = `
            <div class="bg-white rounded-sm shadow-sm px-5 py-10 text-center space-y-4">
                <h2 class="font-bold">${word.word}</h2>
                <p>Meaning /Pronounciation</p>
                <h2 class="font-bold font-bangla">${word.meaning} / ${word.pronunciation}</h2>
                <div class="flex justify-between px-5">
                    <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `;
        // append into card
        wordContainer.append(wordDiv);
    }
}

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
            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"> 
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no} 
            </button>
        `
        // append into container
        levelContainer.append(btnDiv);
    }
}

loadLessons();