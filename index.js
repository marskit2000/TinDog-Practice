// Remember to import the data and Dog class!
import dogs from "./data.js"
import Dog from "./Dog.js"



const dogContainer = document.getElementById("avatar-container")
const dogContainerNext = document.getElementById("avatar-container-next")
let currentIndex = 0
let currentDog = new Dog(dogs[currentIndex])
let nextDog = new Dog(dogs[currentIndex + 1])

const renderDog = (dog) => {
  dogContainer.classList.remove("tilt-left")
  dogContainer.classList.remove("tilt-right")
  dogContainer.style.backgroundImage = `url("./${dog.avatar}")`
  dogContainer.innerHTML = `
        <img class="badge-img hidden" id="badge-img" src="./images/badge-like.png">
        <h3>${dog.name}</h3>
        <p>${dog.bio}</p>
        `
}

const renderNextDog = (nextDog) => {
  dogContainerNext.style.backgroundImage = `url("./${nextDog.avatar}")`
  dogContainerNext.innerHTML = `
        <h3>${nextDog.name}</h3>
        <p>${nextDog.bio}</p>
        `
}

renderDog(currentDog)
renderNextDog(nextDog)

const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')

yesBtn.addEventListener("click", () => {
  currentDog.hasBeenLiked = true
  currentDog.hasBeenSwiped = false

  updateDogs()
  badgeAnimation("yes")
  dogContainer.classList.add("tilt-right")

  setTimeout(() => {renderDog(currentDog)}, 1000)
  setTimeout(() => {renderNextDog(nextDog)}, 1000)
})

noBtn.addEventListener("click", () => {
  currentDog.hasBeenLiked = false
  currentDog.hasBeenSwiped = true

  updateDogs()
  badgeAnimation("no")
  dogContainer.classList.add("tilt-left")

  setTimeout(() => {renderDog(currentDog)}, 1000)
  setTimeout(() => {renderNextDog(nextDog)}, 1000)
})

const updateDogs = () => {
  currentIndex++
  if(currentIndex >= dogs.length) {
    currentIndex = 0
  }
  currentDog = new Dog(dogs[currentIndex])
  if(currentIndex + 1>= dogs.length) {
    nextDog = new Dog(dogs[0])
  }
  else {
    nextDog = new Dog(dogs[currentIndex + 1])
  }
}

const badgeAnimation = choice => {
  const badge = document.getElementById("badge-img")
  if(choice == "yes") {
    badge.src = "./images/badge-like.png"
  }
  else if (choice == "no") {
    badge.src = "./images/badge-nope.png"
  }
  badge.style.display = "block"
  badge.classList.remove("hidden")
  badge.classList.add("show")
}
