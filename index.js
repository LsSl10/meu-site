console.log('SITE CARREGADO COM SUCESSO!')

const navLinks = document.querySelectorAll('nav a')
const sections = document.querySelectorAll('section')

function mostrarSecao(id){

    sections.forEach(section => {
        section.style.display = 'none'
    })

    const target = document.getElementById(id)

    if(target){
        target.style.display = 'block'
    }

    window.scrollTo({
        top:0,
        behavior:'smooth'
    })

}

navLinks.forEach(link => {

    link.addEventListener('click', (e) => {

        e.preventDefault()

        const id = link.getAttribute('href').replace('#','')

        mostrarSecao(id)

    })

})

const heroButtons = document.querySelectorAll('.buttons a')

heroButtons.forEach(button => {

    button.addEventListener('click', (e) => {

        e.preventDefault()

        const id = button.getAttribute('href').replace('#','')

        mostrarSecao(id)

    })

})

sections.forEach(section => {
    section.style.display = 'none'
})

document.getElementById('inicio').style.display = 'flex'
