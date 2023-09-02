export type Chord = {
    key: string
    frets: Number[]
    fingers: Number[]
    barres: Number[]
    capo: Boolean
    baseFret?: number
}

export type Enable = {
    enable: boolean
}

export type Filled = {
    filled: boolean
}

export type Input = {
    value: string
}

//Props

export type Props = {
    chords: Chord[]
    onRemove: any
}

export type ScrollProps = {
    availableChords: Chord[]
    sheetChords: Chord[]
    onChordChange: Function
    onSheetChordChange: Function
    onShowEditor: Function
}

export type ChordEditorProps = {
    onClose: any
    onChordsChange: any
}

export type NewChordProps = {
    newChord: Chord
    onChordChange: Function
}
