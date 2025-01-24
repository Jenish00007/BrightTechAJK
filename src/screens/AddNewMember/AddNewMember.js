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
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { BackHeader } from '../../components';

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
    const [selectedState, setSelectedState] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('India');
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

      const handleBack = () => {
        navigation.navigate('MainLanding'); // Navigate to ManLanding page
      };

      const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
        'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
        'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
        'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 
        'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 
        'Delhi', 'Puducherry'
      ];

      const route = useRoute(); // Get route parameters
      const { schemeId } = route.params || {};

      useEffect(() => {
        if (schemeId) {
            setSelectedSchemeId(schemeId); // Set the selected scheme ID from route
        }
    }, [schemeId]);
     // Log the message whenever schemeId changes
    

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
                    description: s.SchemeSName,
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
            if (!schemeId) return;
            console.log('Fetching amounts for schemeId:', schemeId);
    
            setLoading(true);
    
            try {
                const response = await fetch(`https://jerwishtech.site/v1/api/member/schemeid?schemeId=${schemeId}`);
                const data = await response.json();
    
                if (data.length === 0) {
                    console.warn(`No data returned for schemeId: ${schemeId}`);
                    setAmounts([]); // Clear amounts if no data is returned
                    setAmount(''); // Reset amount
                    return;
                }
    
                console.log('Fetched amounts data:', data);
    
                const mappedAmounts = data.map(item => ({
                    label: item.GROUPCODE,
                    value: item.AMOUNT,
                    groupCode: item.GROUPCODE,
                    currentRegNo: item.CURRENTREGNO,
                }));
    
                setAmounts(mappedAmounts);
                setAmount(mappedAmounts[0]?.value || ''); // Default to the first amount if available
                setSelectedGroupcodeObj(mappedAmounts[0]?.groupCode || '');
                setSelectedCurrentRegObj(mappedAmounts[0]?.currentRegNo || '');
            } catch (error) {
                console.error('Error fetching amounts:', error);
            } finally {
                setLoading(false);
            }
        };
    
        if (selectedSchemeId) {
            fetchAmount(selectedSchemeId);
        }
    }, [selectedSchemeId]);
    

    const handleSubmit = async () => {
        if (isSubmitting) {
            console.log('Form is already submitting...');
            return; // Prevent duplicate submissions
        }
    
        // Start submitting state
        setIsSubmitting(true);
    
        // Mobile number validation (check if it's a valid 10-digit number)
        if (!/^\d{10}$/.test(mobile)) {
            console.log('Invalid mobile number:', mobile);
            alert('Please enter a valid mobile number.');
            setIsSubmitting(false); // Stop submitting state
            return;
        }
    
        // Email validation (check if email contains '@' symbol)
        if (!email.includes('@')) {
            alert('Email should contain "@" symbol.');
            setIsSubmitting(false); // Stop submitting state
            return;
        }
    
        // PAN number validation (matches the format of PAN card)
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
            alert('PAN number should be 10 characters long.');
            setIsSubmitting(false); // Stop submitting state
            return;
        }
    
        // Aadhaar validation (must be a 12-digit number)
        if (!/^\d{12}$/.test(aadharNumber)) {
            alert('Aadhaar number should be 12 digits long.');
            setIsSubmitting(false); // Stop submitting state
            return;
        }
    
        // Country validation (ensure country is India)
        if (country !== 'India') {
            alert('Country should be India.');
            setIsSubmitting(false); // Stop submitting state
            return;
        }
    
        // // City validation (check if city is valid from the list of cities)
        // if (cities.length === 0 || !cities.includes(city)) {
        //     alert('Please select a valid city from the list of cities for the given pincode.');
        //     setIsSubmitting(false); // Stop submitting state
        //     return;
        // }
    
        // Prepare the request body
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
    
        try {
            console.log('Request body:', requestBody); // Debugging log
    
            const response = await fetch('https://jerwishtech.site/v1/api/member/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
    
            console.log('API response status:', response.status);
    
            if (!response.ok) {
                throw new Error('Error creating member: ' + response.statusText);
            }
    
            // await generateAndDownloadPDF(); // Assuming PDF generation is part of success workflow
    
            alert('Member added successfully!');
            // Clear all input values after successful submission
            resetFormFields();
            navigation.navigate('VerifyMpinScreen'); // Navigate to MpinScreen after successful submission
    
        } catch (error) {
            console.error('Error:', error);
            alert(error.message); // Display the error message
        } finally {
            setIsSubmitting(false); // Stop submitting state regardless of outcome
        }
    };
    
    // Function to reset form fields after successful submission
    const resetFormFields = () => {
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

    // useEffect(() => {
    //     // Automatically select the first scheme when the page loads (if schemes are available)
    //     if (schemes.length > 0) {
    //         const defaultSchemeId = schemes[0].id; // Select the first scheme in the list
    //         setSelectedSchemeId(defaultSchemeId); // This will trigger the useEffect that fetches the amounts
    //     }
    //     console.log(amount, '...............')
    // }, [schemes]); // This runs when schemes are fetched or updated

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
                <Text style={styles.label}>
                    Date of Birth <Text style={styles.asterisk}>*</Text>
                </Text>
                
                <View style={styles.pickerWrapper}>
                    <TouchableOpacity 
                        onPress={showPicker} 
                        style={styles.dateInput}
                    >
                        <Text style={dateText === 'Select Date' ? styles.placeholderText : styles.dateText}>
                            {dateText}
                        </Text>
                    </TouchableOpacity>
                </View>
    
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
                        <BackHeader 
        title="Member Details"
        backPressed={() => navigation.goBack()}
      />
                        {/* <Text style={styles.title}>Member Details</Text> */}
                        
      {/* {schemeId && (
        <Text style={styles.schemeText}>Selected Scheme ID: {schemeId}</Text>
      )} */}
                        <Text style={styles.label}>Initial  <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setInitial}
                            value={initial}
                            placeholder="Enter Initial"
                        /></View>
                        <Text style={styles.label}>First Name <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setName}
                            value={name}
                            placeholder="Enter First Name"
                        /></View>
                        <Text style={styles.label}>Surname <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setSurname}
                            value={surname}
                            placeholder="Enter Surname"
                        /></View>
                        <Text style={styles.label}>Door No <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setDoorNo}
                            value={doorNo}
                            placeholder="Enter Door No"
                        /></View>
                        <Text style={styles.label}>Address 1 <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setAddress1}
                            value={address1}
                            placeholder="Enter Address 1"
                        /></View>
                        <Text style={styles.label}>Address 2</Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setAddress2}
                            value={address2}
                            placeholder="Enter Address 2"
                        /></View>
                        <Text style={styles.label}>Area <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setArea}
                            value={area}
                            placeholder="Enter Area"
                        /></View>
                        <Text style={styles.label}>City <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setCity}
                            value={city}
                            placeholder="Enter City"
                        /></View>
                       {/* Replace the TextInput for State with the Picker */}
                    <Text style={styles.label}>State <Text style={styles.asterisk}>*</Text></Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={selectedState}
                            onValueChange={(itemValue) => setSelectedState(itemValue)}
                            style={{ height: 50, width: 350 }}
                        >
                            <Picker.Item label="Select a State" value="" />
                            {states.map((state, index) => (
                                <Picker.Item key={index} label={state} value={state} />
                            ))}
                        </Picker>
                    </View>
                        <Text style={styles.label}>Country <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setCountry}
                            value={country}
                            placeholder="Enter Country"
                        /></View>
                        <Text style={styles.label}>Pincode <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPincode}
                            value={pincode}
                            placeholder="Enter Pincode"
                            keyboardType="numeric"
                        /></View>
                        <Text style={styles.label}>Mobile Number <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setMobile}
                            value={mobile}
                            placeholder="Enter Mobile Number"
                            keyboardType="numeric"
                        /></View>
                        {renderDatePicker()}
                        <Text style={styles.label}>Email <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Enter Email"
                        /></View>
                        <Text style={styles.label}>PAN Number <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPanNumber}
                            value={panNumber}
                            placeholder="Enter PAN Number"
                        /></View>
                        <Text style={styles.label}>Aadhaar Number <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setAadharNumber}
                            value={aadharNumber}
                            placeholder="Enter Aadhaar Number"
                            keyboardType="numeric"
                        /></View>
                        {/* Back and Next Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={() => setCurrentStep(2)}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
                    </View>
                );
            case 2:
                return (
                    <>
                        <Text style={styles.label}>Scheme Selection</Text>
                        <View style={[styles.inputWrapper, { justifyContent: 'center' }]}>
    <Text style={[styles.input, { textAlignVertical: 'center', textAlign: 'left', paddingVertical: 0 }]}>
        {schemes.find(s => s.id === selectedSchemeId)?.name || "No scheme selected"}
    </Text>
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
                            {/* <View style={styles.inputWrapper}> */}
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
                            {/* </View> */}
                        </View>
                        <View style={styles.buttonRow}>
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
</View>

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
        backgroundColor: colors.white
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    inputWrapper: {
        backgroundColor: colors.white, // Background color for the shadow to appear
        borderRadius: 10,
        elevation: 6, // Shadow for Android
        shadowColor: colors.greenColor, // Shadow for iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        marginBottom: 15,
    },
    input: {
        height: 60,
        borderColor: colors.greenColor,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: colors.white, // Keep the background consistent
        
    },
    picker: {
        height: 60,
        width: '100%',
        marginBottom: 15,
    },
    pickerWrapper: {
        height: 60,
        borderColor: colors.greenColor,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: colors.white,
        elevation: 6,
        shadowColor: colors.greenColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },
    button: {
        backgroundColor: colors.greenColor,
        flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    height: 60,
    padding: 20,
     justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        color:colors.fontMainColor,
        fontSize: 16,
        fontWeight: 'bold'
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
        fontSize: 16,
        color: colors.greenColor,
        marginTop: -10,
        ...alignment.PxSmall
      },
      asterisk: {
        color: 'red',
        fontSize: 16,
      },
});

export default AddNewMember;
