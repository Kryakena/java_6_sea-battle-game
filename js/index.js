let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://петромост.рф/upload/product_images/73044.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://петромост.рф/upload/product_images/98246.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://петромост.рф/upload/product_images/05406.jpg'},
]

const toHTML = fruit => `
    <div class="col">
            <div class="card">
                <img class="card-img-top" style="height: 300px;" src="${fruit.img}" alt="${fruit.title}">
                <div class="card-body">
                    <h5 class="card-title">${fruit.title}</h5>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                    <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
                </div>
            </div>
    </div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({ // Создаем объект {}
    title: 'Цена на Товар',
    closable: true, // Чтобы модальное окно могло закрываться
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
           priceModal.close()
        }}
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id) // обращаемся к массиву fruits и вызываем метод find
    // на каждой итерации мы получаем объект f с его полем id
    // === должно совпадать с id

    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open() // открыть модальное окно при нажатии
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(() => { // если попадаем в метод then, это означает, что мы нажали кнопку "Удалить"
            fruits = fruits.filter(f => f.id !== id) // товар проходит через фильтр, если id не совпадает с id разрешенным
            render()
        }).catch(() => { // если попали в блок catch, значит мы нажатли на кнопку "Cansel"
            console.log('Cancel')
        })
    }
})