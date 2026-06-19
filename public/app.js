const votes = {
    Espresso: 0,
    Cappuccino: 0,
    Latte: 0,
    Mocha: 0
};

function voteCoffee(coffee){

    votes[coffee]++;

    updateDisplay();
}

function updateDisplay(){

    document.getElementById("espressoVotes").innerText =
        votes.Espresso;

    document.getElementById("cappuccinoVotes").innerText =
        votes.Cappuccino;

    document.getElementById("latteVotes").innerText =
        votes.Latte;

    document.getElementById("mochaVotes").innerText =
        votes.Mocha;

    const total =
        Object.values(votes)
        .reduce((a,b)=>a+b,0);

    document.getElementById("totalVotes")
        .innerText = total;

    const winner =
        Object.keys(votes)
        .reduce((a,b)=>
            votes[a] > votes[b]
            ? a
            : b
        );

    document.getElementById("winner")
        .innerText = winner;

    updateLeaderboard();
}

function updateLeaderboard(){

    const sorted =
        Object.entries(votes)
        .sort((a,b)=>b[1]-a[1]);

    let html = "";

    sorted.forEach(item=>{

        html += `
        <div class="leader-item">
            <span>${item[0]}</span>
            <span>${item[1]} votes</span>
        </div>
        `;
    });

    document.getElementById("leaderboard")
        .innerHTML = html;
}

updateDisplay();