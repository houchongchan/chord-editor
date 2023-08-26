import type { FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { toPng } from 'html-to-image'
import Chord from '@tombatossals/react-chords/lib/Chord'
import TabSheet from '../TabSheet'
import { chordsArray, guitarConfig } from './Config'
import { ReactComponent as Download } from './icons/download.svg'
import { Chords, Enable } from './Interfaces'

const App: FC = (): JSX.Element => {
    const [chords, setChords] = useState<Chords[]>([])
    const [sheetChords, setSheetChords] = useState<Chords[]>([])

    const printRef = useRef<HTMLDivElement>(null)
    const chordLengthRef = useRef(sheetChords)
    chordLengthRef.current = sheetChords

    useEffect(() => {
        const chordsList: Chords[] = chordsArray
        setChords(chordsList)
    }, [])

    const onClick = (i: number) => {
        const singleChord: Chords = chordsArray[i]
        const tmp = [...sheetChords, singleChord]
        setSheetChords(tmp)
    }

    const convertAndDownload = useCallback(() => {
        if (printRef.current === null || chordLengthRef.current.length == 0) {
            return
        }

        toPng(printRef.current, { cacheBust: true })
            .then((dataUrl) => {
                var link = document.createElement('a')
                link.download = `tabsheet.png`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [printRef])

    return (
        <Container>
            <Title> Tab Sheet Generator</Title>
            <Label> Chord List</Label>
            <ChordContainer>
                {chords.map((e, i) => {
                    return (
                        <>
                            <ChordWrapper key={i} onClick={() => onClick(i)}>
                                <Key>{e.key}</Key>
                                <Chord
                                    chord={e}
                                    instrument={guitarConfig}
                                    lite={false}
                                />
                            </ChordWrapper>
                        </>
                    )
                })}
            </ChordContainer>
            <Body>
                <Row>
                    <Label>Tab Sheet</Label>
                    <Button
                        enable={sheetChords.length != 0}
                        onClick={convertAndDownload}
                    >
                        <Download /> Download
                    </Button>
                </Row>
                <Print ref={printRef}>
                    <TabSheet chords={sheetChords} />
                </Print>
            </Body>
        </Container>
    )
}

export default App

const Body = styled.div`
    display: flex;
    color: var(--white);
    flex-direction: column;
    width: 100%;
`

const Row = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
`

const Title = styled.div`
    margin: 32px 0px;
    font-size: 32px;
    text-align: center;
`

const Label = styled(Title)`
    font-size: 20px;
`

const Button = styled.div<Enable>`
    background-color: #26619c;
    border-radius: 4px;
    cursor: ${(props) => (props.enable ? 'pointer' : 'not-allowed')};
    display: flex;
    gap: 4px;
    height: 32px;
    padding-left: 8px;
    padding-top: 8px;
    width: 110px;

    svg {
        fill: var(--white);
    }

    &:hover {
        background-color: ${(props) => (props.enable ? '#3a7ca5' : '#26619c')};
    }

    &:active {
        background-color: ${(props) => (props.enable ? '#74b3ce' : '#26619c')};

        svg {
            fill: var(--black2);
        }
    }
`

const Container = styled.div`
    background-color: cyan;
    color: white;
    flex-direction: column;
    height: 100vh;
    overflow-x: hidden;
    position: relative;
`

const ChordContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100vw;
`

const ChordWrapper = styled.div`
	cursor: pointer;
	display: flex;
	flex-direction: column;
	height 100px;
	width: 100px;
`

const Key = styled.div`
    text-align: center;
`

const Print = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
