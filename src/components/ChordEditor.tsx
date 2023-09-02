import styled from 'styled-components'
import { FC, useState } from 'react'
import { ReactComponent as DeleteIcon } from './icons/delete.svg'
import { defaultChord } from './Config'
import NewChord from './NewChord'
import { ChordEditorProps, Chord, Filled } from './Interfaces'
import { flexRowCenter } from './CSS'

const ChordEditor: FC<ChordEditorProps> = ({
    onClose,
    onChordsChange,
}): JSX.Element => {
    const [newChord, setChord] = useState<Chord>(defaultChord)

    const saveChord = (): void => {
        if (newChord.key == '') return
        onChordsChange((prev: Chord[]) => [newChord, ...prev])
        onClose()
    }

    return (
        <ModalContainer>
            <Form>
                <Label>Custom Chord</Label>
                <Delete onClick={onClose}>
                    <DeleteIcon />
                </Delete>
                <Description>
                    Drag the number icons above the chord frets to start
                    labelling the chord!
                </Description>
                <Row>
                    <Flex>
                        <Input
                            onChange={(e) =>
                                setChord({
                                    ...newChord,
                                    key: e.target.value,
                                })
                            }
                            placeholder="Key Name"
                            type="text"
                            value={newChord.key}
                        />
                        <Input
                            onChange={(e) =>
                                setChord({
                                    ...newChord,
                                    baseFret: Number(e.target.value),
                                })
                            }
                            placeholder="Base Fret"
                            type="number"
                            min="0"
                            value={newChord.baseFret}
                        />
                        <Button
                            onClick={() => setChord(defaultChord)}
                            filled={false}
                        >
                            Reset Chord
                        </Button>
                        <Button onClick={saveChord} filled={true}>
                            Save Chord
                        </Button>
                    </Flex>
                    <NewChord newChord={newChord} onChordChange={setChord} />
                </Row>
            </Form>
        </ModalContainer>
    )
}

export default ChordEditor

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    *:nth-child(3) {
        margin-top: 70px;
    }
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`

const Description = styled.div`
    font-size: var(--font-size-s);
    color: grey;
`
const ModalContainer = styled.div`
    ${flexRowCenter}
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 105;
`

const Form = styled.div`
    background: var(--charade);
    border-radius: 8px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 442px;
    padding: 40px;
    position: relative;
    width: 500px;
    background: lightblue;
`
const Button = styled.button<Filled>`
    border: 1px solid var(--bright-turquoise);
    border-radius: 4px;
    color: var(--bright-turquoise);
    cursor: pointer;
    font-size: var(--font-size-m);
    font-weight: 600;
    height: 34px;
    width: 100px;
    ${({ filled }) => filled && `background: lightgrey;`};

    border: 1px solid white;
    margin: 8px 0px;

    &:hover {
        background: rgba(137, 207, 240, 0.5);
    }
`

const Delete = styled.div`
    cursor: pointer;
    position: absolute;
    right: 12px;
    top: 12px;

    svg {
        stroke: blue;
    }

    &:hover {
        svg {
            stroke: grey;
        }
    }
`

const Input = styled.input`
    background-color: var(--charade);
    border: 1px solid var(--river-bed);
    border-radius: 4px;
    color: var(--white);
    font-size: var(--font-size-s);
    padding: 8px 0px;
    margin: 8px 0px;
    width: 80px;

    ::placeholder {
        color: var(--bar);
    }

    &:hover,
    &:focus-within {
        border-color: var(--cadet-blue);
    }
`

const Label = styled.label`
    color: darkblue;
    font-size: var(--font-size-l);
    font-weight: 500;
    height: 15px;
    margin-bottom: 12px;
    text-align: center;
`
