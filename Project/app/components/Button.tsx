import { Text, View, StyleSheet, Pressable } from 'react-native';

type Props = { 
    label: string;
    theme?: 'primary';
    onPress?: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={[styles.button, theme === 'primary' && styles.primaryButton]}
                onPress={onPress ? onPress : () => alert('Button pressed')}
            >   
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,  
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "white",
    },
    primaryButton: {
        backgroundColor: "#83d0f3ff",
    },
    buttonLabel: {
        color: '#000000ff',
        fontSize: 19,
        fontWeight:600
    },
});
