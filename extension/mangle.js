function mangle() {
    let nameElementsAll = document.querySelectorAll(`
        .im-page--title-main-inner, 
        ._im_page_peer_name, 
        .im-mess-stack--lnk,
        .im-replied--author-link, 
        ._im_replied_author_link`)

    let dialogListNameElements = Array
        .from(document.querySelectorAll(".nim-dialog"))
        .filter(e => e.getAttribute("data-peer") < 2000000000)
        .map(e => e.querySelector("._im_dialog_link"))

    let sidebarListNameElements = Array
        .from(document.querySelectorAll("._im_peer_tab"))
        .filter(e => e.getAttribute("data-list-id") < 2000000000)
        .map(e => e.querySelector(".im-right-menu--text"))

    let authorNameElements = Array
        .from(document.querySelectorAll(".author"))
        .filter(e => e.getAttribute("data-from-id") > 0)

    let nameElements = Array
        .from(nameElementsAll)
        .concat(dialogListNameElements)
        .concat(sidebarListNameElements)
        .concat(authorNameElements)
        .filter(e => e.getAttribute("data-mangled") !== "true")

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
        nameElements[i].setAttribute("data-mangled", "true")
    }
}

function setUpObserver(handler) {
    var target = document.querySelector('body')

    var observer = new MutationObserver(mutations => {
        handler()
    })

    var config = { attributes: false, childList: true, subtree: true, characterData: false }
    observer.observe(target, config)
}

mangle()
setUpObserver(mangle)