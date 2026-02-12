/* 🔥 WEBHOOK URL (Yahan apna webhook daala gaya hai) */
const webhookURL = "https://discord.com/api/webhooks/1470693822664151051/eojBX3xB4YDJrbQ72j3-UrgXJQ0iwSwJ34ivTWoZVAs9SHD4Z8jUrOfqc9oN2fBtjDyx";

const messageText = document.getElementById("messageText");
const nextBtn = document.getElementById("nextBtn");

let screen = 0;

const screens = [

`Hey Aesha…

Today isn’t just another day.
It’s the day someone who quietly makes life softer was born.

And I just wanted to do something a little different.`,

`I thought about what kind of gift to give you.

Something expensive? Something dramatic?

But then I realized…

Sometimes the simplest things mean the most.`,


`I think what makes someone special
isn’t how loudly they shine —
but how quietly they stay.

You don’t try to prove anything.
You don’t pretend to be something you’re not.

And maybe that’s what I admire most.

There’s honesty in the way you exist.
And in today’s world,
that’s rare.`,


`Happy Birthday, Aesha. 💖

I don’t just wish you happiness today —
I wish you peace.

The kind that stays with you
even on your quiet days.

I hope this year brings you
people who understand you,
moments that feel warm,
and love that never makes you question yourself.

You deserve to feel valued.
You deserve to feel safe.
And you deserve someone
who chooses you every day.`,


`There’s something I didn’t say yet…

Something I kept quietly between the lines.

Not loud.
Not dramatic.
Just honest.`,


`You know… some people don’t arrive in your life with noise.

But somehow… they become the calm part of your day.

And without even planning it,
they slowly begin to matter.

And if someday… I find someone to trust,
to laugh with,
to keep close…

I hope that person feels a little like you, Aesha. 💗`,


"CHOICE_SCREEN"

];

const emojiList = [
    "assets/teas.gif",
    "assets/pusn.gif",
    "assets/heart2.gif",
    "assets/heart.gif",
    "assets/round.gif",
    "assets/happy.gif",
    "assets/rose.gif"
];


function showScreen(){

    // 🔥 SAFE emoji switching
    try {
        const emoji = document.getElementById("topEmoji");

        if(emoji && typeof emojiList !== "undefined" && emojiList[screen]){
            emoji.style.opacity = "0";

            setTimeout(() => {
                emoji.src = emojiList[screen];
                emoji.style.opacity = "1";
            }, 150);
        }
    } catch(e){
        console.log("Emoji load issue, continuing...");
    }

    if(screens[screen] === "CHOICE_SCREEN"){
        showChoiceScreen();
        return;
    }

    messageText.innerHTML = "";

    nextBtn.style.display = "none";
    nextBtn.style.opacity = "0";
    nextBtn.style.transform = "translateX(20px)";

    new TypeIt("#messageText", {
        strings: screens[screen],
        speed: 35,
        waitUntilVisible: true,
        cursor: true,
        afterComplete: function(){

            nextBtn.style.display = "block";

            setTimeout(() => {
                nextBtn.style.opacity = "1";
                nextBtn.style.transform = "translateX(0)";
            }, 80);

            nextBtn.innerText = "Click here........";
        }
    }).go();
}



nextBtn.onclick = () => {
    screen++;
    if(screen < screens.length){
        showScreen();
    }
};


function showChoiceScreen(){

    messageText.innerHTML = `
    <p>Some journeys are meant to be walked alone.<br>
    Some become lighter when shared.</p>

    <p>If someday you choose to walk with someone,<br>
    I would be honoured to walk beside you.</p>

    <div id="choiceArea" style="margin-top:20px;">
        <button onclick="handleChoice('Id like that')" class="choiceBtn">I'd like that.</button>
        <button onclick="handleChoice('I need time')" class="choiceBtn">I need time.</button>
    </div>

    <div id="afterChoice" style="margin-top:20px;"></div>
    `;

    nextBtn.style.display = "none";
}


async function handleChoice(choice){

    await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: "Choice Selected: " + choice
        })
    });

    document.getElementById("choiceArea").innerHTML = `
        <p style="opacity:.8;">You chose: <b>${choice}</b></p>
    `;

    document.getElementById("afterChoice").innerHTML = `
        <button onclick="showReplyScreen()" class="choiceBtn">
            Before you go…
        </button>
    `;
}


function showReplyScreen(){

    messageText.innerHTML = `
    <p>
    After reading what I wrote…
    and after choosing your answer above…

    I kept this space only for one thing —
    to know what was going on in your heart.
    </p>

    <textarea id="replyInput"
    placeholder="Tell me honestly…"
    style="width:100%;height:100px;padding:10px;border-radius:12px;
    background:rgba(255,255,255,.08);color:white;
    border:1px solid rgba(255,255,255,.3);resize:none;"></textarea>

    <button onclick="sendReply()" class="choiceBtn" style="margin-top:15px;">
        Send
    </button>
    `;
}



async function sendReply(){

    const reply = document.getElementById("replyInput").value;

    if(reply.trim() === ""){
        alert("Write something first 💗");
        return;
    }

    await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: "Written Reply:\n" + reply
        })
    });

    alert("Sent 💖");
}

showScreen();
