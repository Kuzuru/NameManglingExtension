let lastRun = 0

function mangle() {
    let now = new Date()
    if (now - lastRun > 1000) {
        lastRun = now
        let nameElements1 = document.body.getElementsByClassName("_im_dialog_link")
        let nameElements2 = document.body.getElementsByClassName("im-page--title-main-inner _im_page_peer_name")
        let nameElements3 = document.body.getElementsByClassName("im-mess-stack--lnk")
        let nameElements = Array.from(nameElements1).concat(Array.from(nameElements2)).concat(Array.from(nameElements3))
        let mangleName = (name) => {
            let splitName = name.split(' ')
            if (splitName.length === 1) {
                return name
            }
            let firstName = splitName[0]
            let lastName = splitName[1]
            let div = (val, by) => (val - val % by) / by
            let n = div(firstName.length, 2) + 1
            let m = div(lastName.length, 2) + 1
            let choice = Math.floor(Math.random() * (n * m - 1)) + 1
            let counter = 0
            let result = name
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < m; j++) {
                    counter++
                    if (counter === choice) {
                        let subFirst = firstName.substring(0, i + 1)
                        let subLast = lastName.substring(0, j + 1)
                        result = subLast + firstName.substring(i + 1) + " " + subFirst + lastName.substring(j + 1)
                    }
                }
            }
            return result;
        }
        for (let i = 0; i < nameElements.length; i++) {
            let name = nameElements[i].textContent
            nameElements[i].textContent = mangleName(name)
        }
    }
}

document.addEventListener('mousewheel', mangle)