import React from 'react'

function BibleVersions(props) {
    const versionList = props.bibleVersions.map((version) => 
        <option key={version.id} value={version.abbreviation}>
            {version.title}
        </option> 
    )

    return(
        <select 
            value={props.selectedVersion}
            name='selectedVersion'>
                <option key='0' value=''>
                    --Please select a bible version--
                </option> 
                {versionList}
        </select>
    )
}

export default BibleVersions