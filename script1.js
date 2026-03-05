
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json() )
    .then((json) => displayLessons(json.data));
}

const displayLessons = (lessons) => {
    console.log(lessons);

    // get the container & empty it
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    // get into each lesson
    for(let lesson of lessons)
    {
        // create element
        const btnDiv = document.createElement('div');
        
        btnDiv.innerHTML = `
            <button class="btn btn-outline btn-primary"> 
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no} 
            </button>
        `
        // append into container
        levelContainer.append(btnDiv);
    }
}

loadLessons();