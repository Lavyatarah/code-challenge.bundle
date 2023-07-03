const characters = document.getElementById('character-bar');
let span;
let currentId = 0;
const image = document.getElementById('image');

const allCharacters = () => {
    fetch('http://localhost:3000/characters')
        .then(res => res.json())
        .then(data => data.map(character => {
            span = document.createElement('span');
            characters.appendChild(span);
            span.innerText = character.name;

            span.addEventListener('click', () => {
                const cuties = document.getElementById('name');
                currentId = character.id;
                cuties.innerText = character.name;

                image.src = character.image;

                const votes = document.getElementById('vote-count');
                votes.innerText = character.votes;

                const form = document.getElementById('votes-form');
                form.addEventListener('submit', event => {
                    event.preventDefault();

                    const vote = parseInt(event.target.children[0].value);
                    const totalVotes = character.votes + vote;

                    fetch(`http://localhost:3000/characters/${currentId}`, {
                        method: 'PATCH',
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            votes: totalVotes
                        })
                    })
                        .then(res => res.json())
                        .then(data => votes.innerText = data.votes);
                });

                const resetVotes = document.getElementById("reset-btn");
                resetVotes.addEventListener('click', () => {
                    fetch(`http://localhost:3000/characters/${currentId}`, {
                        method: 'PATCH',
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            votes: 0
                        })
                    })
                        .then(res => res.json())
                        .then(data => votes.innerText = data.votes);
                });
            });
        }));
};

allCharacters();
