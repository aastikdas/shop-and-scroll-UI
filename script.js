
fetch('product.json')
    .then(res => res.json())
    .then(categories => {
        const mainContainer = document.querySelector('.main-container');
        categories.forEach((section, id) => {
            //create a seciton
            
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category-section h-fit ';



            const heading = document.createElement('h2');
            heading.textContent = section.category;
            heading.className = `md:text-4xl text-2xl heading font-bold mx-4 md:mx-10 my-2 text-red-800 ${heading.textContent.split(' ')[0]}`

            categoryDiv.appendChild(heading)

            const Productsdiv = document.createElement('div');
            Productsdiv.className = 'productDiv w-[98vw] flex overflow-x-scroll  '
            if(id%2===0){
                Productsdiv.className+='bg-yellow-100 dark:bg-gray-800'
            }
            section.products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = "flex flex-col justify-between  card min-w-[250px]  m-2 border border-black dark:border-white p-2 rounded-lg bg-white dark:bg-black";

                productCard.innerHTML = `
    <ul class="flex-1 flex flex-col">
        <div>
            <li class="mouse photo">
                <img src="${product.image}" alt="IMG NOT AVAILABLE" class="rounded-lg border w-[200px] h-[150px] m-auto photo object-contain bg-white">
            </li>
            <li class="font-semibold text-sm">${product.name}</li>
            <li class="text-xl">Rs ${product.price}</li>
            <li class="font-mono text-[0.8em]">Volume Pricing Available</li>
            <li class="seeSize mouse">See Size Chart</li>
            <li class="mouse ">${product.size}</li>
            <li class="hidden description">${product.description}</li>
            <li class="hidden highlights">
                <ul>
                    ${Array.isArray(product.highlights)
                        ? product.highlights.map(item => `<li>${item}</li>`).join(' ')
                        : '<li>No highlights available</li>'}
                </ul>
            </li>
            <li class="hidden specifications">
                <ul>
                    ${product.specifications
                        ? Object.entries(product.specifications).map(([key, val]) => `<li><strong>${key}:</strong> ${val}</li>`).join('')
                        : '<li>No specifications available</li>'}
                </ul>
            </li>
        </div>

        <!-- 👇 Sizechart forced to bottom using mt-auto -->
        <li class="mx-6 border border-black dark:border-white rounded-xl sizechart mt-auto">
            <ul class="flex justify-around items-center">
                <li class="minus font-semibold text-3xl mouse border hover:bg-yellow-300 dark:hover:bg-slate-700 border-black dark:border-white rounded-full px-4 my-1">-</li>
                <li class="value font-semibold text-xl">0</li>
                <li class="plus font-semibold text-2xl mouse border hover:bg-yellow-300 dark:hover:bg-slate-700 border-black dark:border-white rounded-full px-4 my-1">+</li>
            </ul>
        </li>
    </ul>
`;

                Productsdiv.appendChild(productCard);
            })
            categoryDiv.appendChild(Productsdiv)
            mainContainer.appendChild(categoryDiv);

        })


        let card = document.getElementsByClassName('card');
        for (let i = 0; i < card.length; i++) {

            card[i].querySelector('.photo').addEventListener("click", () => {
                let big_image = document.querySelector(".big_image");

                const small_image = card[i].querySelector('img');
                const src_small_image = small_image.getAttribute('src');

                big_image.innerHTML = `<img src="${src_small_image}" alt="Not available" srcset="" class="object-contain m-10 h-[40vh]">`

                big_image.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

                document.querySelector('.description').innerHTML = `<div>${card[i].querySelector('.description').textContent}<\div>`;

                document.querySelector('.highlights').innerHTML = `<div>${card[i].querySelector('.highlights').textContent}<\div>`;

                document.querySelector('.specifications').innerHTML = `<div>${card[i].querySelector('.specifications').textContent}<\div>`;
            })
        }

        for (let i = 0; i < card.length; i++) {
            let plusBtn = card[i].querySelector('.plus');
            let valueBtn = card[i].querySelector('.value');
            let minusBtn = card[i].querySelector('.minus');
            plusBtn.addEventListener('click', () => {
                let currentValue = parseInt(valueBtn.innerHTML);
                valueBtn.innerHTML = Math.min(currentValue + 1, 5);
                if (currentValue == 5) {
                    alert('You have reached maximum cart limit')
                }
            })
            minusBtn.addEventListener('click', () => {
                let currentValue = parseInt(valueBtn.innerHTML);
                valueBtn.innerHTML = Math.max(currentValue - 1, 0);
            })
        }


        document.querySelectorAll('.seeSize').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.sizeChart').classList.remove("hidden")
            })
        })

    })


document.querySelector('.crossBtn').addEventListener('click', () => {
    document.querySelector('.sizeChart').classList.add("hidden");
})
document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        document.querySelector('.sizeChart').classList.add("hidden");
    }
})

document.querySelectorAll('.tag-name').forEach(tag => {
    tag.addEventListener('click', () => {
        const target_class = tag.textContent.trim().split(' ')[0];
        const targetElement = document.querySelector(`.${target_class}`)
        targetElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

    })
})

document.querySelector('.moveToTop').addEventListener('click', () => {
    console.log('click')
    document.querySelector('.scroll-to-here').scrollIntoView({ behavior: "smooth", block: "end" });
})
const moveToTop = document.querySelector('.moveToTop');
const returnToTop = document.querySelector('.returnToTop');

moveToTop.addEventListener('mouseenter', () => {
    returnToTop.classList.add('block');
    returnToTop.classList.remove('hidden');
});

moveToTop.addEventListener('mouseleave', () => {
    returnToTop.classList.remove('block');
    returnToTop.classList.add('hidden');
});

document.querySelector('.toggle-btn-on').addEventListener("click", () => {
    // console.log('clicl')
    document.querySelector('.toggle-btn-on').classList.remove('block')
    document.querySelector('.toggle-btn-on').classList.add('hidden')
    document.querySelector('.toggle-btn-off').classList.remove('hidden')
    document.querySelector('.toggle-btn-off').classList.add('block')
    document.documentElement.classList.add('dark')
})
document.querySelector('.toggle-btn-off').addEventListener("click", () => {
    // console.log('clicl')
    document.querySelector('.toggle-btn-off').classList.remove('block')
    document.querySelector('.toggle-btn-off').classList.add('hidden')
    document.querySelector('.toggle-btn-on').classList.remove('hidden')
    document.querySelector('.toggle-btn-on').classList.add('block')
    document.documentElement.classList.remove('dark')
})