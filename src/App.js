import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './App.css'

// Replace your code here

const apiStatusViews = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
}

class App extends Component {
  state = {apiStatus: apiStatusViews.initial, placesData: []}

  componentDidMount() {
    this.getPlaces()
  }

  getPlaces = async () => {
    this.setState({apiStatus: apiStatusViews.in_progress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const dataList = data.packages
    const updatedData = dataList.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.image_url,
      description: eachItem.description,
    }))
    this.setState({placesData: updatedData, apiStatus: apiStatusViews.success})
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader_container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPlacesView = () => {
    const {placesData} = this.state
    return (
      <ul className="places_ul_container">
        {placesData.map(eachItem => (
          <li key={eachItem.id} className="li_card">
            <img
              className="image"
              src={eachItem.imageUrl}
              alt={eachItem.name}
            />
            <div className="content_container">
              <h1 className="name">{eachItem.name}</h1>
              <p className="description">{eachItem.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderApiViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusViews.in_progress:
        return this.renderLoadingView()
      case apiStatusViews.success:
        return this.renderPlacesView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app_container">
        <h1 className="main_heading">Travel Guide</h1>
        {this.renderApiViews()}
      </div>
    )
  }
}

export default App
