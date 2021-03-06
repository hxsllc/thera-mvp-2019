/**
 * Deck
 * Hardcoded deck display.  On completion returns to previous screen and displays a toast
 */
import React, { Component } from "react";
import { Image, View } from "react-native";
import {
  Container,
  Header,
  DeckSwiper,
  Card,
  CardItem,
  Text,
  Left,
  Body,
	Toast
} from "native-base";
import { Auth } from 'aws-amplify';

import styles from "./styles";
import { commonStyles } from '../../common/styles';

const cards = [
	{ image: require("../../../assets/D1C1-card-1.png") },
	{ image: require("../../../assets/D1C1-card-2.png") },
	{ image: require("../../../assets/D1C1-card-3.png") },
	{ image: require("../../../assets/D1C1-card-4.png") },
	{ image: require("../../../assets/D1C1-card-5.png") },
	{ image: require("../../../assets/D1C1-card-6.png") },
];

export class Deck extends Component {
	currentCard = 0;

	checkIfDone = async () => {
		// TODO:  Move api calls and logic to redux
		if (++this.currentCard === cards.length) {
			try {
				const { attributes } = await Auth.currentAuthenticatedUser();

				const result = await fetch('https://pln0wlwznl.execute-api.us-east-2.amazonaws.com/development/points', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						user: attributes.sub,
						points: 10,
						deck: 1,
					}),
				});
				console.log(result);

				// TODO: Check if successful

				// TODO: If toasts are going to be used we should consider a reusable function with defaults
				Toast.show({
					text: '+10 points! Review tomorrow for +20!',
					position: 'top',
					textStyle: { fontSize: 18, fontWeight: '100' },
					duration: 3000,
					type: 'success',
				});
				this.props.navigation.goBack();
			} catch (err) {
				console.log(err);
			}
		}
	}

  render() {
    return (
      <Container style={styles.container}>
				<Header transparent />
				<View style={commonStyles.headerContainer}>
					<Text style={commonStyles.headerText}>Thera for Stress</Text>
				</View>
        <View style={styles.deckContainer}>
          <DeckSwiper
            dataSource={cards}
            looping={false}
						onSwipeLeft={this.checkIfDone}
						onSwipeRight={this.checkIfDone}
            renderItem={item =>
              <Card style={styles.cardContainer}>
                <CardItem>
                  <Left>
                    <Image style={styles.rainbowIcon} source={require("../../../assets/rainbow-icon.png")}/>
                    <Body>
                      <Text style={styles.cardHeaderText}>Anxiety & Stress</Text>
                      <Text style={styles.cardHeaderSubtext}>6 cards</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    style={styles.cardImage}
                    source={item.image}
                  />
                </CardItem>
                <CardItem>
                  <Image style={styles.dotIcon} source={require("../../../assets/dot.png")} />
                  <Text style={styles.cardFooterText}>Chris Lerro, LCSW</Text>
                </CardItem>
              </Card>}
          />
        </View>
      </Container>
    );
  }
}
