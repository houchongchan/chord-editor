import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { default as ChordSVG } from '@tombatossals/react-chords/lib/Chord'
import { chordsArray, guitarConfig } from './Config'
import { Chord, ScrollProps } from './Interfaces'
import { ReactComponent as Arrow } from './icons/arrow.svg'
import { ReactComponent as PlusIcon } from './icons/plus.svg'

const Scroll: FC<ScrollProps> = ({
    availableChords,
    sheetChords,
    onChordChange,
    onSheetChordChange,
    onShowEditor,
}): JSX.Element => {
    useEffect(() => {
        const chordsList: Chord[] = chordsArray
        onChordChange(chordsList)
    }, [])

    const onClick = (i: number): void => {
        const singleChord: Chord = availableChords[i]
        const tmp = [...sheetChords, singleChord]
        onSheetChordChange(tmp)
    }
    const scroll = useRef<any>()

    const onLeftClick = (): void => {
        requestAnimationFrame(() => {
            const scrollCurrent = scroll.current
            const scrollLeft = scrollCurrent.scrollLeft
            const itemWidth = parseInt(
                getComputedStyle(scrollCurrent.children[0]).width
            )
            scroll.current.scrollLeft = scrollLeft - itemWidth
        })
    }

    const onRightClick = (): void => {
        requestAnimationFrame(() => {
            const scrollCurrent = scroll.current
            const scrollLeft = scrollCurrent.scrollLeft
            const itemWidth = parseInt(
                getComputedStyle(scrollCurrent.children[0]).width
            )
            scroll.current.scrollLeft = scrollLeft + itemWidth
        })
    }

    return (
        <Container>
            <Title>Basic Chord Shapes</Title>
            <LeftArrow onClick={onLeftClick} />
            <RightArrow onClick={onRightClick} />
            <Body ref={scroll}>
                <Overflow>
                    <ChordWrapper onClick={onShowEditor}>
                        <Key>Custom</Key>
                        <Plus />
                    </ChordWrapper>
                    {availableChords.map((e, i) => {
                        return (
                            <ChordWrapper key={i} onClick={() => onClick(i)}>
                                <Key>{e.key.toUpperCase()}</Key>
                                <ChordSVG
                                    chord={e}
                                    instrument={guitarConfig}
                                    lite={false}
                                />
                            </ChordWrapper>
                        )
                    })}
                </Overflow>
            </Body>
        </Container>
    )
}

export default Scroll

const Plus = styled(PlusIcon)`
    height: 100%;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 2px solid white;
`

const Title = styled.h3`
    height: 20px;
    text-align: center;
`

const Container = styled.div`
    width: 80vw;
    height: 200px;
    display: block;
    position: relative;
`

const Body = styled.div`
    width: 100%;
    position: relative;
    height: 100%;
    top: 0;
    left: 0;
    scroll-behavior: smooth;
    overflow-x: scroll;
    &&::-webkit-scrollbar {
        height: 0px;
    }
`

const ChordWrapper = styled.div`
	cursor: pointer;
	display: flex;
	flex-direction: column;
	height 100px;
	width: 100px;
    padding: 5px;

    justify-content: center;
    align-items: center;

    &:hover { 
        border-radius: 5px;
        background: rgba(137, 207, 240, .5);
    }
`

const Key = styled.div`
    text-align: center;
`

const Overflow = styled.div`
    display: flex;
    padding: 0px 16px 6px 16px;
    position: absolute;
    top: 0;
`
const LeftArrow = styled(Arrow)`
    cursor: pointer;
    left: -4px;
    position: absolute;
    transform: scale(-1, 1);
    top: 50%;
    z-index: 2;
`

const RightArrow = styled(LeftArrow)`
    left: unset;
    right: -4px;
    top: 50%;
    transform: scale(1, 1);
`
