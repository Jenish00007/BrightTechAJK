// TermsConditionsPage.js
import React from 'react';
import { Image, ImageBackground, StyleSheet, View,Text } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
const TermsConditionsPage = () => {

    let razorpayKeyId = 'abc'
    let razorpayKeySecret = 'xyz'
    const amount = 100;
    const currency = "INR";


    const handlePayment = () => {
        if (!RazorpayCheckout) {
            alert('Razorpay SDK is not available!');
            return;
        }
    
        var options = {
            description: 'Buy BMW CAR',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: currency,
            key: razorpayKeyId,
            amount: amount * 100,
            name: 'test order',
            order_id: "",
            prefill: {
                email: 'xyz@gmail.com',
                contact: '9999999999',
                name: 'User 1'
            },
            theme: { color: '#F37254' }
        }
    
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
        })
        .catch((error) => {
            // handle failure
            console.log(error)
            alert(`Error: ${error.code} | ${error.description}`);
        })
    }
    


    return (

        <View style={styles.container}>
            <View style={styles.innerContainer}>

                <Text onPress={handlePayment}
                    style={{ backgroundColor: 'green', color: 'white', padding: 10, margin: 10 }}
                >Pay Now</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        padding: -1, // Add padding here
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },

});

export default TermsConditionsPage;
