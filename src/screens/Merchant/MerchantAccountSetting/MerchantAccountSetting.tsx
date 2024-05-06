import {
  Button,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';

import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import * as Progress from 'react-native-progress';
import GetUserLocation from '../../../components/new/GetUserLocation';
import {ModalToast} from '../../../components/new/kittenui/ModalBackdrop';
import {useAppDispatch} from '../../../hooks/useAppSelector';
import {createBusiness} from '../../../redux/features/business/businessThunk';
import styles from '../../../styles';
import {NavigationProps} from '../../../utils/interface';

interface MerchantAccountSettingScreenProps {
  navigation: NavigationProps;
  hideHeader?: boolean;
  routeRedirect?: boolean;
  closeSheet?: any;
}

const MerchantAccountSettingScreen = ({
  navigation,
  hideHeader,
  closeSheet,
  routeRedirect = true,
}: MerchantAccountSettingScreenProps) => {
  const dispatch = useAppDispatch();

  const [toastVisible, setToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const [business, setBusiness] = useState({
    businessName: '',
    businessType: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  });

  const handleInputChange = (name: string, value: string | any) => {
    const businessType = [
      'Restaurant',
      'Retail',
      'Services',
      'Manufacturing',
      'Food & Beverage',
      'Technology',
      'Healthcare',
      'Education',
      'Other',
    ];
    if (name === 'businessType') {
      setBusiness({...business, [name]: businessType[value.row]});
    } else {
      setBusiness({...business, [name]: value});
    }
    console.log({name, value});
  };

  const handleAddressChange = (name: string, value: string) => {
    console.log({name, value}, 'address', business.address);
    setBusiness({
      ...business,
      address: {...business.address, [name]: value},
    });
  };

  const handleSubmit = () => {
    // Here you would typically invoke the createBusiness thunk
    console.log(business);
    setLoading(true);

    dispatch(createBusiness(business))
      .unwrap()
      .then(response => {
        console.log('Business created:', response);
        setToastTitle('Business created successfully');
        setToastVisible(true);
        setLoading(false);

        if (routeRedirect) {
          navigation.navigate(routeRedirect);
          return;
        } else {
          closeSheet();
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error creating product:', error);
        setToastTitle('Error creating business');
      });
  };

  return (
    <>
      {!hideHeader && (
        <Layout
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <ChevronLeftIcon size={24} color="#000" />
          <Text category="h5">Setup Business</Text>
          <Layout />
        </Layout>
      )}
      <View className="flex-1 p-1">
        <ScrollView>
          <Input
            className="mb-4"
            value={business.businessName}
            label="Business Name"
            placeholder="Enter business name"
            onChangeText={value => handleInputChange('businessName', value)}
          />

          <Select
            className="mb-4"
            label="Business Type"
            placeholder="Select business type"
            value={business.businessType}
            onSelect={value => handleInputChange('businessType', value)}>
            <SelectItem title="Restaurant" />
            <SelectItem title="Retail" />
            <SelectItem title="Services" />
            <SelectItem title="Manufacturing" />
            <SelectItem title="Food & Beverage" />
            <SelectItem title="Technology" />
            <SelectItem title="Healthcare" />
            <SelectItem title="Education" />
            <SelectItem title="Other" />
          </Select>
          <Input
            className="mb-4"
            value={business.description}
            label="Description"
            placeholder="Enter description"
            onChangeText={value => handleInputChange('description', value)}
          />
          <GetUserLocation
            setAddress={(address: any) => {
              console.log('Address:', address);
              setBusiness({
                ...business,
                address: {
                  ...business.address,
                  ...address,
                },
              });
            }}
          />
          {/* Address Inputs */}
          <Input
            className="mb-4"
            value={business.address.street}
            label="Street*  "
            placeholder="Enter street address"
            onChangeText={value => handleAddressChange('street', value)}
            disabled
          />
          <Input
            className="mb-4"
            value={business.address.city}
            label="City*"
            placeholder="Enter city*"
            onChangeText={value => handleAddressChange('city', value)}
            disabled
          />
          <Input
            className="mb-4"
            value={business.address.state}
            label="State*"
            placeholder="Enter state"
            onChangeText={value => handleAddressChange('state', value)}
            disabled
          />
          <Input
            className="mb-4"
            value={business.address.postalCode}
            label="Postal Code*"
            placeholder="Enter postal code"
            onChangeText={value => handleAddressChange('postalCode', value)}
            disabled
          />
          <Input
            className="mb-4"
            value={business.address.country}
            label="Country *"
            placeholder="Enter country"
            onChangeText={value => handleAddressChange('country', value)}
            disabled
          />

          <Button
            className="mt-4"
            onPress={handleSubmit}
            style={{
              backgroundColor: styles.darkPrimaryColor,
              borderColor: styles.darkPrimaryColor,
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              margin: 10,
              width: 200,
              alignSelf: 'center',
            }}>
            {loading ? (
              <Progress.Circle color="white" size={30} indeterminate={true} />
            ) : (
              'Create Business'
            )}
          </Button>
        </ScrollView>
      </View>
      <ModalToast
        title={toastTitle}
        setVisible={setToastVisible}
        visible={toastVisible}
      />
    </>
  );
};

export default MerchantAccountSettingScreen;
