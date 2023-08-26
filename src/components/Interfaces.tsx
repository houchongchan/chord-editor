export type Chords = {
    key: string
    frets: Number[]
    fingers: Number[]
    barres: Number[]
    capo: Boolean
}

export type Props = {
    chords: Chords[]
}

export type Enable = {
    enable: boolean
}

export type Input = {
    value: string
}
