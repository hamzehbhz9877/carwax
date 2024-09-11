const activeSection=document.querySelector(".popular__item.active")

const AllItems=document.querySelectorAll('.popular__item')

document.querySelector(`[data-target="${activeSection.id}"]`).classList.add('active')


console.log(document.querySelector(`[data-target="${activeSection.id}"]`).classList)


AllItems.forEach(e=>{
    e.addEventListener("click",(element)=>{
        document.querySelector(".popular__item.active").classList.remove("active")
        document.querySelector('.popular__description.active').classList.remove('active')
        document.querySelector(`[data-target="${e.id}"]`).classList.add('active')
        e.classList.add('active')
    })
})