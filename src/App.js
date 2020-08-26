import React, { Component } from 'react'
import BibleVersions from './components/BibleVersions'
import BibleVerses from './components/BibleVerse'

class App extends Component {
  constructor() {
    super()
    this.state = {
      apiKey: `awN3IrR1dlStC_5zFojMP395wCg`,
      day: 1,
      bibleVersions: [],
      selectedVersion: '',
      bibleVerses: [],
      selectedVerse: ''
    }
    this.getDay = this.getDay.bind(this)
    this.fetchVersions = this.fetchVersions.bind(this)
    this.fetchVerses = this.fetchVerses.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.getDay()
    this.fetchVersions()
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  getDay() {
    const today = new Date()
    const start = new Date(today.getFullYear(), 0, 0)
    const diff = today - start + ((start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000)
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    this.setState(prev => {
      return { day }
    })
  }

  fetchVersions() {
    fetch('https://developers.youversionapi.com/1.0/versions', {
        headers: {
            'X-YouVersion-Developer-Token': this.state.apiKey,
            'Accept-Language': 'en',
            Accept: 'application/json',
        }
    })  
    .then(result => result.json())
    .then(result => {
      const versions = result.data.map(item => {
        const { id, abbreviation, title } = item
        const obj = { id, abbreviation, title }
        return obj
      })
      this.setState(prev => {
        return { bibleVersions: versions }
      })
      this.state.bibleVersions.forEach(version => {
        this.fetchVerses(version.id)
      })
    })
  }

  fetchVerses(id) {
    fetch(`https://developers.youversionapi.com/1.0/verse_of_the_day/${this.state.day}?version_id=${id}`, {
        headers: {
            'X-YouVersion-Developer-Token': this.state.apiKey,
            'Accept-Language': 'en',
            Accept: 'application/json',
        }
    })
    .then(result => result.json())
    .then(result => {
      const { verse } = result
      const obj = { 
        versionId: id.toString(),
        humanReference: verse.human_reference,
        text: verse.text
      }
      this.setState(prev => {
        return { bibleVerses: [...this.state.bibleVerses, obj] }
      })
    })
    .catch( error => { console.log('error')});
  }

  render() {
    return (
      <div className="App">
        <BibleVersions
          bibleVersions={this.state.bibleVersions}
          handleChange={this.handleChange} />
        <BibleVerses
          bibleVerses={this.state.bibleVerses}
          selectedVersion={this.state.selectedVersion}
           />
      </div>
    );
  }
}

export default App