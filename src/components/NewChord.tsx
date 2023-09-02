import styled from 'styled-components'
import Chord from '@tombatossals/react-chords/lib/Chord'
import { guitarConfig } from './Config'
import { FC } from 'react'
import { NewChordProps } from './Interfaces'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { flexColumnCenter, flexRowCenter } from './CSS'

type Position = { x: number; y: number }

const NewChord: FC<NewChordProps> = ({
    newChord,
    onChordChange,
}): JSX.Element => {
    const pos: Position = { x: 0, y: 0 }
    const ySpace: number = 35
    const xSpace: number = 30
    const fingers: number[] = new Array(4).fill(0)

    const onStop = (_: DraggableEvent, e: DraggableData, finger: number) => {
        if (e.y > -70) return
        const fret: number = 5 - Math.abs(e.y / 35 + 1)
        const note: number = Math.floor(e.x / 30 + finger - 1)

        const prevFrets: Number[] = newChord.frets
        prevFrets[note] = fret
        const prevNote: Number[] = newChord.fingers
        prevNote[note] = finger

        onChordChange({
            ...newChord,
            frets: prevFrets,
            fingers: prevNote,
            barres: [],
        })
    }
    const getBounds = (finger: number) => {
        const space: number = ySpace * finger
        return { left: 0 - space, top: -175, right: 175 - space, bottom: 0 }
    }

    return (
        <Container>
            <Key>{newChord.key}</Key>
            <Chord chord={newChord} instrument={guitarConfig} lite={false} />
            <Toolbox>
                {fingers.map((_, ind) => {
                    const finger: number = ind + 1
                    return (
                        <Box key={ind}>
                            <Draggable
                                position={pos}
                                grid={[xSpace, ySpace]}
                                bounds={getBounds(ind)}
                                onStop={(i, e) => onStop(i, e, finger)}
                            >
                                <Finger>{finger}</Finger>
                            </Draggable>
                        </Box>
                    )
                })}
            </Toolbox>
        </Container>
    )
}

export default NewChord

const Box = styled.div`
    ${flexRowCenter}
    height: 40px;
    width: 30px;
`

const Toolbox = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: 5px;
    margin-left: -70px;
`

const Finger = styled.div`
    ${flexRowCenter}
    border-radius: 50%;
    background-color: #444;
    height: 25px;
    aspect-ratio: 1;
    font-size: 12px;
    cursor: pointer;
`

const Container = styled.div`
    ${flexColumnCenter}
    aspect-ratio: 1;
    position: relative;
    width: 235px;
`

const Key = styled.div`
    text-align: center;
    height: 20px;
`
