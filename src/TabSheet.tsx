import styled from 'styled-components'
import Chord from '@tombatossals/react-chords/lib/Chord'
import { guitarConfig } from './components/Config'
import { Input, Props } from './components/Interfaces'
import { useState, ChangeEvent, FC } from 'react'

const TabSheet: FC<Props> = (props): JSX.Element => {
    const { chords } = props
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
    width: 80%;
`

const ChordContainer = styled.div`
    align-content: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: var(--black2);
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
