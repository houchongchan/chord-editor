import { useEffect, useState } from "react";
import styled from "styled-components";
import { guitarFret } from "./Utils";
import Chord from "@tombatossals/react-chords/lib/Chord";
import TabSheet from "../TabSheet";
import { chordsArray, guitarConfig } from "./Config";

export default function App() {
	const [chords, setChords] = useState([]);
	const [sheetChords, setSheetChords] = useState([]);

	useEffect(() => {
		const chordsList = guitarFret();
		setChords(chordsList);
	}, []);

	const onClick = (i) => {
		const singleChord = chordsArray[i];
		const tmp = [...sheetChords, singleChord];
		setSheetChords(tmp);
	};

	return (
		<Container>
			<Title> Tab Sheet Generator</Title>
			<ChordContainer>
				{chords.map((e, i) => {
					return (
						<>
							<ChordWrapper key={i} onClick={() => onClick(i)}>
								<Chord chord={e} instrument={guitarConfig} lite={false} />
							</ChordWrapper>
						</>
					);
				})}
			</ChordContainer>
			<Body>
				<TabSheet chords={sheetChords} />
			</Body>
		</Container>
	);
}

const Title = styled.div``;

const Body = styled.div`
	display: flex;
	color: var(--white);
`;

const Text = styled.div``;

const Button = styled.div`
	background-color: var(--tuna);
	bottom: 26px;
	cursor: pointer;
	height: 32px;
	padding-left: 8px;
	padding-top: 8px;
	position: absolute;
	right: 16px;
	width: 32px;
	z-index: 12;

	svg {
		fill: var(--white);
	}

	&:hover {
		background-color: var(--charade);
	}

	&:active {
		background-color: var(--bright-turquoise);

		svg {
			fill: var(--black2);
		}
	}
`;

const Container = styled.div`
	background-color: var(--white);
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow-x: hidden;
	position: relative;
`;

const ChordContainer = styled.div`
	align-items: center;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	width: 50vw;
	height: 50vh;
`;

const ChordWrapper = styled.div`
	width: 100px;
	height 100px;
`;

const View = styled.div`
	height: 100%;
	left: 0;
	position: relative;
	width: 100%;
`;
