import type { FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { toPng } from 'html-to-image'
import TabSheet from './TabSheet'
import { chordsArray } from './Config'
import { ReactComponent as Download } from './icons/download.svg'
import { Chord, Enable } from './Interfaces'
import Scroll from './Scroll'
import ChordEditor from './ChordEditor'
import { flexRowCenter, flexColumnCenter } from './CSS'

const App: FC = (): JSX.Element => {
    const [availableChords, setAvailableChords] = useState<Chord[]>([])
    const [sheetChords, setSheetChords] = useState<Chord[]>([])
    const [showEditor, setShowEditor] = useState<boolean>(false)

    const printRef = useRef<HTMLDivElement>(null)
    const chordLengthRef = useRef(sheetChords)
    chordLengthRef.current = sheetChords

    useEffect(() => {
        const chordsList: Chord[] = chordsArray
        setAvailableChords(chordsList)
    }, [])

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

    const onRemove = (selectedIndex: number): void => {
        const tmp = sheetChords.filter((_, i) => i != selectedIndex)
        setSheetChords(tmp)
    }

    return (
        <Container>
            {showEditor && (
                <ChordEditor
                    onChordsChange={setAvailableChords}
                    onClose={() => setShowEditor(false)}
                />
            )}
            <Title> Tab Sheet Generator</Title>
            <Scroll
                availableChords={availableChords}
                onChordChange={setAvailableChords}
                onSheetChordChange={setSheetChords}
                sheetChords={sheetChords}
                onShowEditor={() => setShowEditor(true)}
            />
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
                    <TabSheet chords={sheetChords} onRemove={onRemove} />
                </Print>
            </Body>
        </Container>
    )
}

export default App

const Body = styled.div`
    ${flexColumnCenter}
    color: var(--white);
    width: 100%;
`

const Row = styled.div`
    ${flexRowCenter}
    flex-wrap: wrap;
    gap: 15px;
`

const Title = styled.div`
    font-size: 32px;
    margin: 32px 0px 16px;
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
    ${flexColumnCenter}
    background-color: cyan;
    color: white;
    overflow-x: hidden;
    position: relative;
`

const Print = styled.div`
    ${flexColumnCenter}
`
