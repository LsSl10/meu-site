console.log('SITE CARREGADO COM SUCESSO!')

const links = document.querySelectorAll('nav a')
const sections = document.querySelectorAll('section')

links.forEach(link => {

    link.addEventListener('click', (e) => {

        e.preventDefault()

        const id = link.getAttribute('href').replace('#', '')
        const target = document.getElementById(id)

        sections.forEach(section => {
            section.style.display = 'none'
        })

        target.style.display = 'block'

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    })

})

sections.forEach((section, index) => {

    if(index !== 0){
        section.style.display = 'none'
    }

})
