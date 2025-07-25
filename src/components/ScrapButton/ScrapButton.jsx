import { Pressable } from 'react-native';
import { ScrapActiveButton, ScrapInActiveButton } from '../../utils/icons';

const ScrapButton = ({ isScrapped, onPress }) => {
    return (
        <Pressable onPress={onPress} style={{ alignSelf: 'flex-end' }}>
            {isScrapped ? <ScrapActiveButton /> : <ScrapInActiveButton />}
        </Pressable>
    );
};

export default ScrapButton;