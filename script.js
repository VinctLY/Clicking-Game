window.addEventListener('resize', () => {
    location.reload() // reload page everytime the user resize the window
})

const textMessage = document.getElementById('message'), // message text
    wrapper = document.getElementById('wrapper'), // game wrapper
    button = document.getElementById('button'), // game button stage.1
    buttonImpossible = document.getElementById('buttonImpossible'), // game button stage.2
    cheat = document.getElementById('cheat'), // cheat button
    rgb = document.getElementById('rgb'), // RGB button
    lmao = [
        "You can't catch me lol",
        "What takes u so long to click me?",
        "Click me LOL!",
        "You suck!",
        "Too slow LMAO!",
        "Are you crying?",
        "You're not worthy my opponent"
    ] // dictionary to mock you for not clicking the button lol

function message(msg, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(msg)
        }, time);
    })
}

const short = 1000 // 1-3 words
const medium = 2500 // 4-10 words
const long = 4000 // 11++ words

function randomizer(element, width, height) {
    function repeater(times) {
        for (let i = 0; i < times; i++) {
            height = randomizer().height
            width = randomizer().width

            return {
                height,
                width
            }
        }
    }

    width = Math.floor(Math.random() * (wrapper.offsetWidth - (element.offsetWidth + 2)))
    height = Math.floor(Math.random() * (wrapper.offsetHeight - (element.offsetHeight + 2)))

    element.style.top = height + "px"
    element.style.left = width + "px"

    let randomHistoryWidth = [width]
    let randomHistoryHeight = [height]

    randomHistoryWidth.push(width)
    randomHistoryHeight.push(height)

    for (let i = 1; i < randomHistoryHeight.length; i++) {
        if (randomHistoryHeight[i - 1] - randomHistoryHeight[i] <= 50 && randomHistoryHeight[i - 1] - randomHistoryHeight[i] > 0) {
            randomHeight = repeater(5).height
            randomWidth = repeater(5).width

            element.style.top = randomHeight + "px"
            element.style.left = randomWidth + "px"
        }

        if (randomHistoryHeight[i - 1] - randomHistoryHeight[i] >= -50 && randomHistoryHeight[i - 1] - randomHistoryHeight[i] < 0) {
            randomHeight = repeater(5).height
            randomWidth = repeater(5).width

            element.style.top = randomHeight + "px"
            element.style.left = randomWidth + "px"
        }
    }
}

window.onload = randomizer(document.getElementById('button'))

let miss = 0
button.addEventListener('mouseenter', () => {
    if (this) {
        miss++
        console.log(`You have missed for ${miss} times, you are too bad for this game, I'm sure about that`)
        textMessage.textContent = lmao[Math.floor(Math.random() * lmao.length)]
        randomizer(button)
    }
})

button.addEventListener('click', () => {
    if (this) {
        document.getElementsByClassName('cheat-instruction')[0].remove()
        button.remove()
        async function gameStart() {
            try {
                await message(cheat.disabled = true)
                cheat.title = 'Please refresh if you want to use cheat'
                textMessage.textContent = await message('How dare you click me?!')
                textMessage.textContent = await message("I want to kill you now 😡", short)
                textMessage.textContent = await message("Do you want to play again? But it's harder now hahaha.. You'll have no chance against me. Just click the button below!", short)
            } finally {
                textMessage.textContent = await message("Do you wish to play?")
                const confirmation = document.querySelectorAll('.confirmation')
                const yes = document.getElementById('yes')
                const no = document.getElementById('no')

                confirmation.forEach(check);

                function check(item) {
                    item.classList.remove('hide')
                }

                yes.addEventListener('click', () => {
                    textMessage.textContent = 'This is the impossible 😈'
                    no.remove()
                    yes.remove()

                    button.classList.toggle('hide')
                    buttonImpossible.classList.toggle('hide')

                    const randomImpossible = setInterval(() => {
                        randomizer(buttonImpossible)
                    }, 200);

                    buttonImpossible.addEventListener('click', () => {
                        if (this) {
                            async function how() {
                                textMessage.textContent = await message("But this is the impossible")
                                textMessage.textContent += await message(".", short)
                                textMessage.textContent += await message(".", short)
                                textMessage.textContent += await message(".", short)
                                textMessage.textContent = await message("Alright I'll praise you for that, you now beat me", medium)
                                textMessage.textContent = await message("But I'm sure you has to be cheating", medium)

                                async function reset() {
                                    textMessage.textContent = await message("The website will refresh in 5", long)
                                    textMessage.textContent = await message("The website will refresh in 4", short)
                                    textMessage.textContent = await message("The website will refresh in 3", short)
                                    textMessage.textContent = await message("The website will refresh in 2", short)
                                    textMessage.textContent = await message("The website will refresh in 1", short)
                                    textMessage.textContent = await message("The website will refresh in 0", short)
                                    textMessage.textContent = await message("Good bye, cya!", short)
                                    location.reload()
                                }
                                reset()
                            }
                            how()
                            buttonImpossible.remove()
                            clearInterval(randomImpossible)
                            textMessage.style.color = '#36ee36'
                        }
                    })
                })

                no.addEventListener('click', () => {
                    yes.remove()
                    no.remove()
                    textMessage.textContent = "Alright, good bye, crackhead!"
                })
            }
        }
        gameStart()
    }
})

cheat.addEventListener('click', () => {
    let guide = true
    if (this) {
        async function instruction() {
            cheat.disabled = true
            const cheatInstruct = document.getElementById('cheating')

            cheatInstruct.textContent = await message('Really?')
            cheatInstruct.textContent += await message(' You want to cheat?', short)
            cheatInstruct.textContent = await message('You that bad you need to use cheat?', medium)
            cheatInstruct.textContent = await message('Bruh, alright!', medium)
            cheatInstruct.textContent = await message('Btw you can only use the cheat once..', short)

            // Instructing the cheat

            document.getElementsByClassName('cheat-follow')[0].classList.remove('hide')
            cheatInstruct.textContent = await message('Ok so you would have to click wherever it is')
            cheatInstruct.textContent = await message('Not the button, okay!', short)

            document.body.addEventListener('click', () => {
                if (guide) {
                    cheatInstruct.innerHTML = 'And then press <kbd>TAB</kbd> just once'
                    button.addEventListener('focus', () => {
                        cheatInstruct.innerHTML = 'Press <kbd>ENTER</kbd>'
                        guide = false
                    })
                }
            })
        }
        instruction()
    }
})

function showElement(el) {
    console.log(el)
}

const rainbowToggle = ['RGB Background', 'Normal background']
let on = false
rgb.addEventListener('click', () => {
    if (this) {
        if (on) {
            rgb.textContent = rainbowToggle[0]
        } else {
            on = true
            rgb.textContent = rainbowToggle[1]
        }
        wrapper.classList.toggle('rainbow')
    }
})

console.log("I like how you inspect this website, now you've found this hidden message\nNow why don't you play and get good at the game")