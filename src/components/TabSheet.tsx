import styled from 'styled-components'
import Chord from '@tombatossals/react-chords/lib/Chord'
import { guitarConfig } from './Config'
import { Input, Props } from './Interfaces'
import { useState, ChangeEvent, FC } from 'react'
import { ReactComponent as DeleteIcon } from './icons/delete2.svg'

const TabSheet: FC<Props> = ({ chords, onRemove }): JSX.Element => {
    const [title, setTitle] = useState<string>('')

    return (
        <Container>
            <Title
                placeholder="Song Title"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                }
            />
            <Body>
                {chords.map((e, i) => {
                    return (
                        <ChordContainer key={i}>
                            {e.key?.toUpperCase()}
                            <Delete onClick={() => onRemove(i)}></Delete>
                            <Chord
                                chord={e}
                                instrument={guitarConfig}
                                lite={false}
                            />
                        </ChordContainer>
                    )
                })}
            </Body>
        </Container>
    )
}
export default TabSheet

const Container = styled.div`
    align-self: center;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    background: white;
    border: solid 2px skyblue;
    display: flex;
    min-height: 600px;
    padding: 60px;
    width: 80vw;
`

const ChordContainer = styled.div`
    align-content: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: var(--black2);
    position: relative;

    &:hover {
        border-left: 3px solid lightgrey;
        cursor: pointer;
        svg: first-child {
            opacity: 1;
        }
    }
`

const Delete = styled(DeleteIcon)`
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 0px;
    stroke: blue;
    background: lightgrey;
    width: 20px;
    height: 20px;
    padding: 2px;
    border-radius: 50%;
    opacity: 0;

    &:hover {
        background: grey;
        svg {
            fill: white;
        }
    }
`

const Body = styled.div`
    padding: 10%;
    display: grid;
    gap: 30px 15px;
    grid-template-columns: repeat(5, 1fr);
`

const Title = styled.input<Input>`
    height: 30px;
    margin-bottom: 40px;
`
