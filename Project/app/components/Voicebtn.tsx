
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function Voicebtn() {

    return (
        <View style={styles.VoiceContainer}>
            <Pressable style={styles.Voice} onPress={() => console.log('Mic Pressed')}>
                <Ionicons name="mic" size={32} color="white" />
           
            </Pressable>
    
    
    </View>
    )
}




const styles = StyleSheet.create(
    {
        VoiceContainer: {
            alignItems: 'center',
            justifyContent: 'center',

        },

        Voice: {
            width: 80,
            height: 76,
            backgroundColor: 'rgba(99, 122, 76, 1)',
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
            marginTop:209,

        },


    }
)
