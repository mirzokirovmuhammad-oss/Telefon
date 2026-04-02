const inp = document.querySelector('.inp')
const list = document.querySelector('.list')
const btn = document.querySelector('.btn')

const API = 'https://69b91cb2e69653ffe6a68da7.mockapi.io/uzum'

async function getData() {
    try {
        const response = await axios.get(API)
        render(response.data)

    } catch (e) {
        console.log('Xatolik', e);

    }
}
getData()
function render(uzum) {
    list.innerHTML = ''

    uzum.forEach(item => {
        const box = document.createElement('div')
        box.classList.add('bx')

        box.innerHTML = `
        <div>
            <img  src="${item.image}" width="300" height="250">
            <h2>${item.name}</h2>
            <h2>${item.about}</h2>
            <h2>${item.price}</h2>
        </div>

 <div>
    <button onclick="editData('${item.id}', '${item.name}', '${item.price}', '${item.about}')">Edit</button>
    <button onclick="deleteData('${item.id}')">Delete</button>
 </div>
        `

        list.appendChild(box)
    });
}

async function editData(id, Oldname, Oldprice, Oldabout) {
    try {
        const name = prompt('Yangi nom kiriting', Oldname)
        const price = prompt('Yangi narx kiriting', Oldprice)
        const about = prompt('Yangi malumot kiriting', Oldabout)

        const editUzum = {
            name,
            price,
            about
        }

        if (!name || !price) return

        await axios.put(`${API}/${id}`, editUzum)


        getData()
    } catch (e) {
        console.log('Xatolik', e);

    }
}

async function deleteData(id) {
    try {
        await axios.delete(`${API}/${id}`)
        getData()
    } catch (e) {
        console.log('Xatolik', e);
    }
}

btn.addEventListener('click', filterData)

async function filterData() {
    try {
        const response = await axios.get(API)

        const search = inp.value.toLowerCase()

        const filtered = response.data.filter(item =>
            item.name.toLowerCase().includes(search)
        )

        render(filtered)
    } catch (e) {
        console.log('Xatolik', e);
    }
}