const btn = document.querySelector('.btn')
const percentage = document.querySelectorAll('.percentage')
const graphics = document.querySelectorAll('.graphic')
const nps = document.querySelectorAll('.np')

btn.addEventListener('click', () => {
   const number = document.querySelector('.number')
   const pow = document.querySelector('.pow')

   calc(+number.value, +pow.value)
})

function calc(number, pow) {
   const results = []
   const percent = {}

   // pow
   for (let i = 1; i <= pow; i++) {
      let result;
      for (let y = 1; y <= i; y++) {
         if (result) {
            result *= number
         }
         else {
            result = number
         }
         results.push(result)
      }
   }

   // percentage
   const firstChars = results.map(item => +String(item).charAt(0))
   const totalItems = firstChars.length
   const uniqueItems = [...new Set(firstChars)].sort()

   uniqueItems.forEach(uniqueItems => {
      const newItem = firstChars.filter(filterItem => filterItem === uniqueItems)

      percent[uniqueItems] = Math.round(newItem.length * 100 / totalItems)
   })

   percentage.forEach((item, index) => {
      if (percent.hasOwnProperty(index + 1)) {
         interval(item, percent[index + 1])
         graphics[index].style.height = percent[index + 1] + '%'

         nps[index].classList.remove('disable')
      }
      else {
         item.innerHTML = '0%'
         graphics[index].style.height = '0%'

         nps[index].classList.add('disable')
      }
   })
}

function interval(item, num) {
   let percent = 0
   
   const x = setInterval(() => {
      const step = Math.ceil(Math.random()*3);
      percent = percent + step

      if(percent < num) {
         item.innerHTML = percent + '%'
      }
      else {
         item.innerHTML = num + '%'
         clearInterval(x)
      }
   }, 50)
}


