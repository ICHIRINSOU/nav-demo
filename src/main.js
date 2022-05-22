const $siteList = $('.siteList')
const $last = $siteList.find('li.lastOne')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [{logo: 'B', url: 'https://www.bilibili.com/'},
    {logo: 'N', url: 'http://nga.cn/'},
    {logo: 'H', url: 'https://bbs.hupu.com/lol'},

]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.lastOne)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo}
                    </div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icons">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
            </li>`).insertBefore($last)
        $li.on('click', (e) => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('还可以随便加点儿什么网址')
        if (url.indexOf('http') !== 0) {
            url = 'http://' + url
        }
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(), url: url
        })
        render()
        // const $li =$(`<li><a href="${url}"><div class="site"><div class="logo">${url[0]}</div><div class="link">${url}</div></div></a></li>`).insertBefore($last)
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})

