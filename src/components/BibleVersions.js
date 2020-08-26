import React from 'react'

function BibleVersions(props) {
    const versionList = props.bibleVersions.map((version) => 
        <option key={version.id} value={version.id}>
            {version.title}
        </option> 
    )

    return(
        <select 
            value={props.selectedVersion}
            name='selectedVersion'
            onChange={props.handleChange}>
                <option key='0' value=''>
                    --Please select a bible version--
                </option> 
                {versionList}
        </select>
    )
}

export default BibleVersions