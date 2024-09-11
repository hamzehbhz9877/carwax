const buttonModal = document.querySelectorAll('.start-business')
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.modal__header .close-modal')
const body=document.querySelector('body')

closeModal.addEventListener('click', (e) => {
    overlay.classList.remove('active')
})

modal.addEventListener('click', (e) => {
    e.stopPropagation()
})

overlay.addEventListener('click', (e) => {
    overlay.classList.remove('active')
    body.style.overflow='auto'

})

buttonModal.forEach(e => {
    e.addEventListener("click", () => {
        overlay.classList.add('active')
        body.style.overflow='hidden'
    })
})