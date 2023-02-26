import styled from "styled-components";
import Chord from "@tombatossals/react-chords/lib/Chord";
import { guitarConfig } from "./components/Config";

export default function TabSheet(props) {
	const { chords } = props;
	return (
		<Container>
			{chords.map((e, i) => {
				return (
					<ChordContainer key={i}>
						<Chord chord={e} instrument={guitarConfig} lite={false} />
					</ChordContainer>
				);
			})}
		</Container>
	);
}

const Container = styled.div`
	align-self: center;
	background: white;
	border: solid 2px skyblue;
	display: grid;
	gap: 30px 15px;
	grid-auto-rows: 100px;
	grid-template-columns: repeat(5, 1fr);
	min-height: 600px;
	padding: 16px;
	width: 80%;
`;

const ChordContainer = styled.div`
	align-content: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;
