console.log('SITE CARREGADO COM SUCESSO!')

const navLinks = document.querySelectorAll('nav a')
const heroButtons = document.querySelectorAll('.buttons a')
const sections = document.querySelectorAll('section')

function trocarSecao(id){

    sections.forEach(section => {

        section.style.opacity = '0'
        section.style.transform = 'translateY(20px)'

        setTimeout(() => {
            section.style.display = 'none'
        }, 300)

    })

    const target = document.getElementById(id)

    setTimeout(() => {

        target.style.display = 'block'

        setTimeout(() => {

            target.style.opacity = '1'
            target.style.transform = 'translateY(0)'

        }, 50)

    }, 300)

}

sections.forEach(section => {

    section.style.transition = '0.4s ease'
    section.style.opacity = '0'
    section.style.transform = 'translateY(20px)'
    section.style.display = 'none'

})

const inicio = document.getElementById('inicio')

inicio.style.display = 'flex'

setTimeout(() => {

    inicio.style.opacity = '1'
    inicio.style.transform = 'translateY(0)'

}, 100)

function ativarLinks(links){

    links.forEach(link => {

        link.addEventListener('click', (e) => {

            e.preventDefault()

            const id = link.getAttribute('href').replace('#', '')

            trocarSecao(id)

        })

    })

}

ativarLinks(navLinks)
ativarLinks(heroButtons)
