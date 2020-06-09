import React, { Component } from 'react'

import BibleVersions from './components/BibleVersions'
import BibleVerse from './components/BibleVerse'

class App extends Component {
  constructor() {
    super()
    this.state = {
      apiKey: `awN3IrR1dlStC_5zFojMP395wCg`,
      currentDay: 146,
      bibleVersions: [],
      selectedVersion: '',
      bibleVerses: [],
      selectedVerse: ''
    }
    this.fetchVersions = this.fetchVersions.bind(this)
    this.fetchVerse = this.fetchVerse.bind(this)
  }

  componentDidMount() {
    this.fetchVersions()
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
        const { id, abbreviation, title } = item;
        const obj = { id, abbreviation, title }
        return obj;
      });
      this.setState({ bibleVersions: versions });
      versions.forEach(version => {
        this.fetchVerse(version.id);
      })
    })
  }

  fetchVerse(id) {
    fetch(`https://developers.youversionapi.com/1.0/verse_of_the_day/${this.state.currentDay}?version_id=${id}`, {
        headers: {
            'X-YouVersion-Developer-Token': this.state.apiKey,
            'Accept-Language': 'en',
            Accept: 'application/json',
        }
    })
    .then(result => result.json())
    .then(result => {
      const { day, verse } = result
      const obj = { 
        id,
        humanReference: verse.human_reference,
        text: verse.text
      }
      this.setState({
        bibleVerses: [...this.state.bibleVerses, obj]
      })
    });
  }

  render() {
    return (
      <div className="App">
        <BibleVersions bibleVersions={this.state.bibleVersions} />
        <BibleVerse bibleVerse={this.state.bibleVerse} />
      </div>
    );
  }
}

export default App;