const apiKey = `fa80bc1d486a4ac3b407ca0ee368b453`
let COUNTRY = "us"
let query = ""
let topButton = document.querySelectorAll(".menus button")
let newsList = []

topButton.forEach((menu)=>
    menu.addEventListener("click",(event)=>{
        if(event){
            query = event.target.id
        }
        console.log(query)
        getLatestNews()
    }))

const getLatestNews = async()=>{ // async: 동기함수로 만들기 (await으로 기다리게 만들수 있음)

    const url = new URL(`https://newsapi.org/v2/top-headlines?q=${query}&country=${COUNTRY}&apiKey=${apiKey}`) // URL: 인스턴스, 미리 필요한걸 해주는거

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
        <img class="news-img-size" src=${news.urlToImage} onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUnvISVTYopMAy17o3mB2lfSPeEjoKfAdV2w&s';">
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${overTwoH(news)}</p>
        <div>${noSource(news)} * ${coolTime(news)}</div>
    </div>
    </div>`).join('')

    document.getElementById('news-board').innerHTML = newsHTML
}
const overTwoH = (news)=> {
    let arr = ""
    arr = news.description
    if(arr.length > 200){
        arr = arr.substring(0,200) + "..."
        return arr
    } else if(arr.length <= 0){
        arr = "내용없음"
        return arr
    } else {
        return arr
    }
}
const noSource= (news) =>{
    let arr1 = ""
    arr1 = news.source.name
    if(arr1.length <= 0){
        arr1 = "no source"
        return arr1
    } else{
        return arr1
    }
} 
const coolTime = (news) => {
    let date = moment(news.publishedAt.substring(0,10),"YYYYMMDD").fromNow()
    let hour = moment(news.publishedAt.substring(11,19),"h:mm:ss").fromNow()

    return date +"  " + hour
}
getLatestNews()


