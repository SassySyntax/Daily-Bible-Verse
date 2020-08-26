import React from 'react'

function BibleVerses({bibleVerses, selectedVersion}) {
    let verse = bibleVerses.filter(verse => verse.versionId === selectedVersion).map(filtered => (
        <div key={filtered.versionId}>
            <p>{filtered.text}</p>
            <p>{filtered.humanReference}</p>
        </div>
    ))

    return(
        <section>
            {verse}
        </section>
    )
}

export default BibleVerses