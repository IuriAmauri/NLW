import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api';

import hearOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsAppIcon from '../../assets/images/icons/whatsapp.png';
import styles from './styles';

export interface Teacher {
    userId: number,
    name :string,
    avatarUrl: string,
    bio: string,
    subject: string,
    cost: number,
    whatsapp: string        
}

interface TeacherItemProps {
    teacher: Teacher;
    favorite: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorite }) => {
    const [isFavorite, setFavorite] = useState(favorite);

    function handleContact() {
        api.post('connections', {
            userId: teacher.userId
        });

        Linking.openURL(`whatsapp://send?phone=${ teacher.whatsapp }`);
    }

    async function handleTogleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');
        
        let favoritesArray = [];

        if (favorites) {
            favoritesArray = JSON.parse(favorites);
        }

        if (isFavorite) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.userId == teacher.userId;
            });

            favoritesArray.splice(favoriteIndex, 1);
            setFavorite(false);
        } else {
            favoritesArray.push(teacher);
            setFavorite(true);
        };

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.profile }>
                <Image 
                    style={ styles.avatarUrl } 
                    source={{ uri: teacher.avatarUrl }} 
                />
                <View style={ styles.profileInfo }>
                    <Text style={ styles.profileName }>{ teacher.name }</Text>
                    <Text style={ styles.profileSubject }>{ teacher.subject }</Text>
                </View>
            </View>
            <Text style={ styles.bio }>{  teacher.bio }</Text>
            <View style={ styles.footer }>
                <Text style={ styles.price }>
                    Preço/hora {'   '}
                    <Text style={ styles.priceValue }>
                        R$ { teacher.cost }
                    </Text>
                </Text>
                <View style={ styles.buttonsContainer }>
                    <RectButton 
                        onPress={ handleTogleFavorite }
                        style={[
                            styles.favoriteButton, 
                            isFavorite ? styles.favorited : {}
                        ]}>

                        { 
                            isFavorite ? 
                            <Image source={ unfavoriteIcon }></Image> :
                            <Image source={ hearOutlineIcon }></Image>
                        }
                    </RectButton>
                    <RectButton style={ styles.contactButton } onPress={ handleContact }>
                        <Image source={ whatsAppIcon } />
                        <Text style={ styles.contactButtonText }>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;