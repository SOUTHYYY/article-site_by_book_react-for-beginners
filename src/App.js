import React from 'react'
import { Add } from './components/Add'
import { News } from './components/News'

import './App.css'

class App extends React.Component {
  state = {
    news: null,
    isLoading: false,
  }
  static getDerivedStateFromProps(props, state) {
    let nextFilteredNews



    if(Array.isArray(state.news)){
      nextFilteredNews = [...state.news]

      nextFilteredNews.forEach((item, index ) => {
        if(item.bigText.toLowerCase().indexOf("pubg") !== -1) {
          item.bigText = "СПАМ"
        }
      })
       return {
         filteredNews: nextFilteredNews 
       }
    }
  }
  componentDidMount(){
    // ставим isLoading true,
    // то есть запрос за даннмыи начался
    // фактически он начнется в строке с fetch,
    // но на переход от одной строки к другой
    // пройдут миллисекунды
    this.setState({isLoading: true})
    fetch("http://localhost:3000/data/newsData.json")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setTimeout(() => { //Добавили задержку в 3 секунды 
            this.setState({isLoading: false, news: data})
          }, 1000)
          
        })
  }
  handleAddNews = data => {
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }
  render() {

    const {news, isLoading} = this.state // взяли необходимое из state
    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News data={news} />}
      </React.Fragment>
    )
  }
}

export default App