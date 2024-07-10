const apiKey = `fa80bc1d486a4ac3b407ca0ee368b453`
const COUNTRY = "kr"
let newsList = []

const getLatestNews = async()=>{ // async: 동기함수로 만들기 (await으로 기다리게 만들수 있음)

    const url = new URL(`https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${apiKey}`) // URL: 인스턴스, 미리 필요한걸 해주는거

    console.log("wow",url)

    const response = await fetch(url)

    const data = await response.json() // json: 택스트 타입인데 객체 처럼 생겨서 전해받기 쉽다

    newsList = data.articles
    render()

    console.log("ddd", newsList)
}
const render = () =>{
    const newsHTML = newsList.map(news=>`<div class="row news">
        <div class="col-lg-4">
        <img class="news-img-size" src=${news.urlToImage} alt="">
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description}</p>
        <div>${news.source.name} * ${news.publishedAt}</div>
    </div>
    </div>`).join('')

    document.getElementById('news-board').innerHTML = newsHTML
}
getLatestNews()


