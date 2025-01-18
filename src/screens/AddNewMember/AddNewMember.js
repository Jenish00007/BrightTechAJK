import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform ,ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Color } from '../../utils/Global_Styles';// Ensure Color is defined in your styles
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native'; 
import { colors, alignment } from '../../utils';

const AddNewMember = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [scheme, setScheme] = useState('');
    const navigation = useNavigation();
    // const [amount, setAmount] = useState(''); // This will hold the selected amount
    const [selectedGroupcodetObj, setSelectedGroupcodeObj] = useState(null); // New state for selected amount object
    const [selectedCurrentRegcodetObj, setSelectedCurrentRegObj] = useState(null);
    const [namePrefix, setNamePrefix] = useState('Mr');
    const [initial, setInitial] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [doorNo, setDoorNo] = useState('');
    const [loading, setLoading] = useState(true);
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [mobile, setMobile] = useState('');
    // const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [schemes, setSchemes] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [selectedSchemeId, setSelectedSchemeId] = useState(null);
    const [transactionTypes, setTransactionTypes] = useState([]);
    const [amount, setAmount] = useState('');
    const [accCode, setAccCode] = useState('');
    const [modePay, setModepay] = useState('C');
      // Update the date state to use proper Date object
      const [dob, setDob] = useState(new Date());
      const [showDatePicker, setShowDatePicker] = useState(false);
      const [dateText, setDateText] = useState('Select Date'); // New state for displaying date
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [companyData, setCompanyData] = useState(null);

      const route = useRoute(); // Get route parameters
      const { schemeId } = route.params || {};

      useEffect(() => {
        if (schemeId) {
          console.log(`Scheme ID ${schemeId} successfully passed.`);
        }
      }, [schemeId]); // Log the message whenever schemeId changes
    

    // Fetch schemes when the component mounts
    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const response = await fetch('https://jerwishtech.site/v1/api/member/scheme');
                const data = await response.json();
                // Update mapping to use SchemeId and schemeName
                const formattedSchemes = data.map(s => ({
                    id: s.SchemeId,
                    name: s.schemeName,
                }));
                setSchemes(formattedSchemes);
            } catch (error) {
                console.error('Error fetching schemes:', error);
            }
        };

        fetchSchemes();
    }, []);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch('https://jerwishtech.site/v1/api/company');
                const data = await response.json();
                if (data && data.length > 0) {
                    setCompanyData(data.message); // Assuming the first company in the array is the one we want
                }
                console.log(data.message)
            } catch (error) {
                console.error('Error fetching company data:', error);
                Alert.alert('Error', 'Failed to fetch company details');
            }
        };

        fetchCompanyData();
    }, []);


    useEffect(() => {
        const fetchTransactionTypes = async () => {
            try {
                const response = await fetch('https://jerwishtech.site/v1/api/account/getTranType');
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const data = await response.json();
                setTransactionTypes(data); // Assuming the response is an array of transaction types
            } catch (error) {
                console.error('Error fetching transaction types:', error);
            }
        };
        fetchTransactionTypes();
    }, []);


    // Fetch amounts when a scheme is selected
    useEffect(() => {

        const fetchAmount = async (schemeId) => {
            if (!schemeId) return; // Prevent fetching if no schemeId
            console.log(schemeId)
            try {
                const response = await fetch(`https://jerwishtech.site/v1/api/member/schemeid?schemeId=${schemeId}`);
                const data = await response.json();
                // Map the API response to the desired format
                const mappedAmounts = data.map(item => ({
                    label: item.GROUPCODE,
                    value: item.AMOUNT,
                    groupCode: item.GROUPCODE, 
                    currentRegNo: item.CURRENTREGNO,
                }));

                setAmounts(mappedAmounts);
                setAmount(''); // Reset amount on scheme change
            } catch (error) {
                console.error('Error fetching amounts:', error);
            }
        };

        if (selectedSchemeId) {
            fetchAmount(selectedSchemeId);
        }
        setLoading(false);
    }, [selectedSchemeId]);

    const handleSubmit = async () => {
        if (isSubmitting) return; 
        setIsSubmitting(true);
        const newMember = {
            title: namePrefix,
            initial,
            pName: name,
            sName: surname,
            doorNo,
            address1,
            address2,
            area,
            city,
            state,
            country,
            pinCode: pincode,
            mobile,
            idProof: 'PAN', // or your desired ID proof
            idProofNo: panNumber, // or aadharNumber if needed
            dob,
            email,
            upDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            userId: '999', // Replace with dynamic user ID if available
            appVer: '19.12.10.1', // Example app version
        };

        const createSchemeSummary = {
            schemeId: selectedSchemeId,
            groupCode: selectedGroupcodetObj,
            regNo: selectedCurrentRegcodetObj,
            joinDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
            upDateTime2: new Date().toISOString().slice(0, 19).replace('T', ' '),
            openingDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
            userId2: '9999',
        };
        const schemeCollectInsert = {
            amount: amount,
            modePay: modePay,
            accCode: accCode
        };

        const requestBody = {
            newMember,
            createSchemeSummary,
            schemeCollectInsert
        };

        console.log(newMember, 'kkkkkkkkkkk')
        try {
            const response = await fetch('https://jerwishtech.site/v1/api/member/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),

            });
            console.log(response, requestBody);
            if (!response.ok) {
                throw new Error('Error creating member: ' + response.statusText);
            }
            // await generateAndDownloadPDF();
            alert('Member added successfully!');
            // Clear all input values
            setScheme('');
            setSelectedGroupcodeObj(null);
            setSelectedCurrentRegObj(null);
            setInitial('');
            setName('');
            setSurname('');
            setDoorNo('');
            setAddress1('');
            setAddress2('');
            setArea('');
            setCity('');
            setState('');
            setCountry('');
            setPincode('');
            setMobile('');
            setDob('');
            setEmail('');
            setPanNumber('');
            setAadharNumber('');
            setAmounts([]); // Reset amounts array
            setAmount(''); // Reset amount
            setAccCode(''); // Reset accCode
            setModepay('C'); // Reset modePay to default
            setSelectedSchemeId(null); // Reset selectedSchemeId

            navigation.navigate('MpinScreen');
        } catch (error) {
            alert(error.message);
        } finally {
            setIsSubmitting(false); // Stop loading regardless of outcome
        }
    };

    const generateBillData = () => {
        console.log('generateBillData')
        const currentDateTime = new Date();
        const formattedDate = currentDateTime.toLocaleDateString();
        const formattedTime = currentDateTime.toLocaleTimeString();

        const billData = {
            companyName: companyData?.COMPANYNAME || 'Company Name',
            date: formattedDate,
            time: formattedTime,
            regNo: selectedCurrentRegcodetObj,
            name: `${name} ${surname}`,
            amount: amount,
            groupCode: selectedGroupcodetObj,
            installmentOn: "1",
            msNo: "123",
            installmentAmount: amount,
            totalAmount: amount,
            modeOfPay: modePay,
        };

        return billData;
    };

    const generateAndDownloadPDF = async () => {
        console.log('generateAndDownloadPDF');

        if (Platform.OS === 'android') {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Unable to access media library.');
                return;
            }
        }

        const billData = generateBillData();
        const htmlContent = `
            <html>
                 <style>
  body {
    font-family: Arial, sans-serif;
  }
  
  .receipt {
    width: 300px;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    margin: 0 auto;
    text-align: left;
  }
  
  .receipt .header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center; 
  }
  
  .receipt .details {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .receipt .details span {
    font-weight: bold;
     display: inline-block; /* Allow width control for labels */
    width: 120px;
  }
  
  .receipt .amount {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
     text-align: center;
  }
  
  .receipt .footer {
    font-size: 18px;
    margin-top: 20px;
    text-align: center;
  }
</style>
                <body>

                <div class="receipt">
  <div class="header">
    ${billData.companyName}
  </div>
  <div class="details">
    <span>Date:</span> ${billData.date}<br>
    <span>Time:</span>${billData.time}<br>
    <span>Reg No:</span> ${billData.regNo}<br>
    <span>Name:</span>  ${billData.name}<br>
    <span>Group Code:</span> ${billData.groupCode}<br>
    <span>MS No:</span>${billData.msNo}<br>
    <span>Installment No:</span> ${billData.installmentOn}<br>
    <span>Installment Amount:</span> RS.${billData.amount}/-<br>
    <span>Total Amount:</span> RS. ${billData.installmentAmount}/-<br>
    <span>Mode of Payment:</span> ${billData.modeOfPay}
  </div>
  <div class="amount">
    RS.${billData.totalAmount}/-
  </div>
  <div class="footer">
    For ABIRAMI JEWELLERY
  </div>
</div>
                </body>
            </html>
        `;



        try {
            const { uri } = await Print.printToFileAsync({ html: htmlContent });

            if (Platform.OS === 'android') {
                const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

                if (permissions.granted) {
                    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
                    await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'invoice.pdf', 'application/pdf')
                        .then(async (createdUri) => {
                            await FileSystem.writeAsStringAsync(createdUri, base64, { encoding: FileSystem.EncodingType.Base64 });
                            Alert.alert('Success', 'PDF has been saved to your device');
                        })
                        .catch((e) => {
                            console.error(e);
                            Alert.alert('Error', 'Failed to save PDF');
                        });
                } else {
                    throw new Error('Permission to access storage was denied');
                }
            } else {
                await Sharing.shareAsync(uri);
            }
        } catch (error) {
            console.error('Error generating or saving PDF:', error);
            Alert.alert('Error', 'Could not generate or save PDF');
        }
    };

    useEffect(() => {
        // Automatically select the first scheme when the page loads (if schemes are available)
        if (schemes.length > 0) {
            const defaultSchemeId = schemes[0].id; // Select the first scheme in the list
            setSelectedSchemeId(defaultSchemeId); // This will trigger the useEffect that fetches the amounts
        }
        console.log(amount, '...............')
    }, [schemes]); // This runs when schemes are fetched or updated

   // Update the date picker handling
   const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Only hide automatically on Android
    
    if (event.type === 'dismissed') {
        return; // Do nothing if the picker was dismissed
    }
    
    if (selectedDate) {
        setDob(selectedDate);
        // Format the date for display
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        setDateText(formattedDate);
    }
};

// Function to show the date picker
const showPicker = () => {
    setShowDatePicker(true);
};


    // Update the date picker UI in your form
    const renderDatePicker = () => {
        return (
            <View>
                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity 
                    onPress={showPicker} 
                    style={[styles.input, styles.dateInput]}
                >
                    <Text style={dateText === 'Select Date' ? styles.placeholderText : styles.dateText}>
                        {dateText}
                    </Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dob}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                        maximumDate={new Date()} // Prevents future dates
                        minimumDate={new Date(1900, 0, 1)} // Reasonable minimum date
                    />
                )}
            </View>
        );
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <View style={{ marginBottom: 100 }}>
                        <Text style={styles.label}>Member Details</Text>
                        
      {schemeId && (
        <Text style={styles.schemeText}>Selected Scheme ID: {schemeId}</Text>
      )}
                        <Text style={styles.label}>Initial</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setInitial}
                            value={initial}
                            placeholder="Enter Initial"
                        />
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setName}
                            value={name}
                            placeholder="Enter First Name"
                        />
                        <Text style={styles.label}>Surname</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setSurname}
                            value={surname}
                            placeholder="Enter Surname"
                        />
                        <Text style={styles.label}>Door No</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setDoorNo}
                            value={doorNo}
                            placeholder="Enter Door No"
                        />
                        <Text style={styles.label}>Address 1</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setAddress1}
                            value={address1}
                            placeholder="Enter Address 1"
                        />
                        <Text style={styles.label}>Address 2</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setAddress2}
                            value={address2}
                            placeholder="Enter Address 2"
                        />
                        <Text style={styles.label}>Area</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setArea}
                            value={area}
                            placeholder="Enter Area"
                        />
                        <Text style={styles.label}>City</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setCity}
                            value={city}
                            placeholder="Enter City"
                        />
                        <Text style={styles.label}>State</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setState}
                            value={state}
                            placeholder="Enter State"
                        />
                        <Text style={styles.label}>Country</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setCountry}
                            value={country}
                            placeholder="Enter Country"
                        />
                        <Text style={styles.label}>Pincode</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPincode}
                            value={pincode}
                            placeholder="Enter Pincode"
                            keyboardType="numeric"
                        />
                        <Text style={styles.label}>Mobile Number</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setMobile}
                            value={mobile}
                            placeholder="Enter Mobile Number"
                            keyboardType="numeric"
                        />
                        {renderDatePicker()}
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Enter Email"
                        />
                        <Text style={styles.label}>PAN Number</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPanNumber}
                            value={panNumber}
                            placeholder="Enter PAN Number"
                        />
                        <Text style={styles.label}>Aadhaar Number</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setAadharNumber}
                            value={aadharNumber}
                            placeholder="Enter Aadhaar Number"
                            keyboardType="numeric"
                        />
                        <TouchableOpacity style={styles.button} onPress={() => setCurrentStep(2)}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 2:
                return (
                    <>
                        <Text style={styles.label}>Scheme Selection</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={selectedSchemeId}
                                onValueChange={itemValue => {
                                    setSelectedSchemeId(itemValue);
                                    setScheme(itemValue); // Set scheme name or identifier
                                }}
                                style={styles.picker}
                            >
                                {schemes.map((s, index) => (
                                    <Picker.Item key={index} label={s.name} value={s.id} />
                                ))}
                            </Picker>
                        </View>

                        <Text style={styles.label}>Amount</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={amount}
                                onValueChange={itemValue => {
                                    // Find the selected amount object
                                    const selectedAmount = amounts.find(amt => amt.value === itemValue);
                                    setAmount(itemValue);

                                    // If selectedAmount is found, update groupCode and currentRegNo
                                    if (selectedAmount) {
                                        setSelectedGroupcodeObj(selectedAmount.groupCode);
                                        setSelectedCurrentRegObj(selectedAmount.currentRegNo);
                                       // console.log('Selected Group Code:', selectedAmount.groupCode);
                                        //console.log('Selected Current Reg No:', selectedAmount.currentRegNo);
                                    }
                                }}
                                style={styles.picker}
                                enabled={!isSubmitting} // Disable during submission
                            >
                                {amounts.map((amt, index) => (
                                    <Picker.Item key={index} label={amt.value} value={amt.value} />
                                ))}
                            </Picker>
                        </View>

                        <View style={styles.inputRow}>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Payment Mode</Text>
                                <View style={styles.pickerWrapper}>


                                    <Picker
                                        selectedValue={accCode}
                                        onValueChange={itemValue => {
                                            setAccCode(itemValue);
                                            const selectedType = transactionTypes.find(type => type.ACCOUNT === itemValue);
                                            if (selectedType && selectedType.CARDTYPE) {
                                                setModepay(selectedType.CARDTYPE);
                                            }
                                        }}
                                        style={styles.picker}
                                        enabled={!isSubmitting} // Disable during submission
                                    >
                                        {transactionTypes.map((type, index) => (
                                            <Picker.Item
                                                key={index}
                                                label={type.NAME}
                                                value={type.ACCOUNT}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity 
                            style={[styles.button, isSubmitting && styles.buttonDisabled]}
                            onPress={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator color="#fff" />
                                    <Text style={[styles.buttonText, styles.loadingText]}>
                                        Submitting...
                                    </Text>
                                </View>
                            ) : (
                                <Text style={styles.buttonText}>Submit</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.button, isSubmitting && styles.buttonDisabled]}
                            onPress={() => setCurrentStep(1)}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {renderStep()}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    picker: {
        height: 40,
        width: '100%',
        marginBottom: 15,
    },
    pickerWrapper: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: Color.blue,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        minHeight: 44,
    },
    buttonText: {
        color:colors.greenColor,
        fontSize: 16,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginLeft: 10,
    },
    buttonDisabled: {
        backgroundColor: Color.blue + '80', // Add transparency to show disabled state
        opacity: 0.8,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
      },
      schemeText: {
        marginTop: 20,
        fontSize: 16,
        color: colors.greenColor,
      },
});

export default AddNewMember;
