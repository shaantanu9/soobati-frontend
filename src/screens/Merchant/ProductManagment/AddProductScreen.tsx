import {
  CheckBox,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {ChevronLeftIcon, PlusIcon} from 'react-native-heroicons/outline';
import * as Progress from 'react-native-progress';
import {useAppDispatch, useAppSelector} from '../../../hooks/useAppSelector';
import {createProduct} from '../../../redux/features/product/productThunk';
import MyText from '../../../screens/User/Subscription/MyText';
import styles from '../../../styles';
import {uploadImageToImageKit} from '../../../utils/ImageUpload';
import ImagePickerComponent from './ImageUpload';
interface IProduct {
  name: string;
  description: string;
  price: number | string;
  availableFor: string[];
  category: string;
  quantity: number | string;
  isSubscriptionAvailable: boolean;
  subscriptionPlans: {
    frequency: string;
    price: number;
  }[];
  rentalDetails: {
    dailyPrice: number | string;
    weeklyPrice: number | string;
    monthlyPrice: number | string;
    deposit: number | string;
  };

  images: string[];
  specifications: {
    key: string;
    value: string;
  }[];
  businessId: string;
  businessName: string;
}

const emptyProductData = {
  name: '',
  description: '',
  price: '',
  availableFor: [],
  category: '',
  quantity: '',
  businessName: '',
  businessId: '',
  isSubscriptionAvailable: false,
  subscriptionPlans: [],
  rentalDetails: {
    dailyPrice: '',
    weeklyPrice: '',
    monthlyPrice: '',
    deposit: '',
  },
  images: [],
  specifications: [
    {
      key: '',
      value: '',
    },
  ],
};

const productInputValidation = (productData: IProduct) => {
  const {
    name,
    description,
    price,
    availableFor,
    category,
    quantity,
    businessName,
    businessId,
    isSubscriptionAvailable,
    subscriptionPlans,
    rentalDetails,
    images,
    specifications,
  } = productData;

  console.log({
    name: name === '',
    description: description === '',
    price: price === '',
    availableFor: availableFor.length === 0,
    category: category === '',
    quantity: quantity === '',
    businessName: businessName === '',
    businessId: businessId === '',
    images: images.length === 0,
  });

  if (
    name === '' ||
    description === '' ||
    price === '' ||
    availableFor.length === 0 ||
    category === '' ||
    quantity === '' ||
    businessName === '' ||
    businessId === ''
  ) {
    console.log('101');
    return false;
  }

  if (isSubscriptionAvailable) {
    if (
      rentalDetails.dailyPrice === 0 ||
      rentalDetails.weeklyPrice === 0 ||
      rentalDetails.monthlyPrice === 0 ||
      rentalDetails.deposit === 0
    ) {
      console.log('112');
      return false;
    }
  }

  if (specifications.length > 0) {
    for (let i = 0; i < specifications.length; i++) {
      if (specifications[i].key === '' || specifications[i].value === '') {
        console.log('120');
        return false;
      }
    }
  }
  console.log('126');
  return true;
};

const AddProductScreen = ({hideHeader, closeSheet}: any) => {
  const dispatch = useAppDispatch();
  const business = useAppSelector(state => state.business);
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [productData, setProductData] = useState<IProduct>(emptyProductData);
  const [loading, setLoading] = useState(false);
  const [disableAddProductButton, setDisableAddProductButton] = useState(false);

  const onChangeInput = (name: any, value: any, subField?: string) => {
    setProductData((prev: any) => {
      // Handle numeric fields and attempt to parse them
      if (name === 'price' || name === 'quantity') {
        const parsedValue = parseInt(value);
        const newValue = isNaN(parsedValue) ? 0 : parsedValue; // Default to 0 if NaN
        return {
          ...prev,
          [name]: newValue,
        };
      }

      // Handle sub-fields, if any
      if (subField) {
        console.log('Subfield:', subField, prev[subField]);
        if (subField === 'rentalDetails') {
          const parsedValue = parseInt(value);
          const newValue = isNaN(parsedValue) ? 0 : parsedValue; // Default to 0 if NaN
          return {
            ...prev,
            [subField]: {
              ...prev[subField],
              [name]: newValue,
            },
          };
        } else {
          return {
            ...prev,
            [subField]: {
              ...prev[subField],
              [name]: value,
            },
          };
        }
      }

      // Default handler for non-numeric and non-subfield inputs
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log('Product Data:', productData);
  };

  const onChangeSelect = (name: any, index: any) => {
    if (name === 'businessId') {
      const businessId = business.businesses[index.row]._id;
      const businessName = business.businesses[index.row].businessName;
      setProductData((prev: any) => {
        return {
          ...prev,
          businessId,
          businessName,
        };
      });
      return;
    }

    const options = [
      'books',
      'clothing',
      'electronics',
      'groceries',
      'furniture',
    ];
    const option = options[index.row].toLocaleLowerCase();
    console.log('Option:', index.row);

    setProductData((prev: any) => {
      return {
        ...prev,
        [name]: option,
      };
    });
  };

  const toggleSubscription = () => {
    setProductData(prev => ({
      ...prev,
      isSubscriptionAvailable: !prev.isSubscriptionAvailable,
      rentalDetails: !prev.isSubscriptionAvailable
        ? prev.rentalDetails
        : {
            dailyPrice: 0,
            weeklyPrice: 0,
            monthlyPrice: 0,
            deposit: 0,
          },
    }));
  };

  const handleSelectChange = (index: any) => {
    const options = ['rent', 'sell', 'donate'];
    const option = options[index].toLocaleLowerCase();
    console.log('Option:', option, index);

    setProductData((prev: any) => {
      const availableFor = prev.availableFor.includes(option)
        ? prev.availableFor.filter((item: any) => item !== option)
        : [...prev.availableFor, option];
      return {
        ...prev,
        availableFor,
      };
    });
    console.log('Product Data:', productData.availableFor);
  };

  const handleAddProduct = () => {
    if (!productInputValidation(productData)) {
      alert('Please fill all the required fields');
      return;
    }
    setLoading(true);
    setDisableAddProductButton(true);
    // console.log('Product Data:', productData);
    uploadImageToImageKit(base64Images, 'products_image').then(images => {
      const productDataWithImageUrls = {
        ...productData,
        images: images?.imagesUrl,
        thumbnail: images?.thumbnailUrl[0],
      };

      dispatch(createProduct(productDataWithImageUrls))
        .unwrap()
        .then(response => {
          console.log('Product created:', response);
          if (response?._id) {
            setProductData({
              ...emptyProductData,
              businessName: productData.businessName,
              businessId: productData.businessId,
            });
            setLoading(false);
            setDisableAddProductButton(false);
            setBase64Images([]);
            closeSheet();
          }
        })
        .catch(error => {
          setLoading(false);
          setDisableAddProductButton(false);
          console.error('Error creating product:', error);
        });
    });

    // dispatch(createProduct(productData))
    //   .unwrap()
    //   .then(response => {
    //     console.log('Product created:', response);
    //   })
    //   .catch(error => {
    //     console.error('Error creating product:', error);
    //   });
  };

  const addSpecification = () => {
    setProductData((prev: any) => ({
      ...prev,
      specifications: [...prev.specifications, {key: '', value: ''}],
    }));
  };

  const handleSpecificationChange = (index: any, field: any, value: any) => {
    const updatedSpecifications = productData?.specifications.map(
      (spec: any, idx: any) => {
        if (idx === index) {
          return {...spec, [field]: value};
        }
        return spec;
      },
    );
    setProductData((prev: any) => ({
      ...prev,
      specifications: updatedSpecifications,
    }));
  };

  return (
    <ScrollView style={{flex: 1, paddingLeft: 5, paddingRight: 2}}>
      <Layout style={{flex: 1, justifyContent: 'space-between'}}>
        {!hideHeader && (
          <Layout
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <ChevronLeftIcon size={24} color="#000" />
            <Text category="h5">Add Product</Text>
            <Layout />
          </Layout>
        )}

        <Layout style={{marginVertical: 16}}>
          {/* Product Name */}

          <MyText
            placeholder="Product Name"
            text={productData.name}
            setText={(text: string) => onChangeInput('name', text)}
            required={true}
          />

          {/* Image Picker Component */}
          <ImagePickerComponent
            selectionLimit={5}
            imageData={base64Images}
            setImageData={(images: any) => setBase64Images(images)}
          />

          {/* Description  */}

          <MyText
            placeholder="Product Description"
            text={productData.description}
            setText={(text: string) => onChangeInput('description', text)}
            required={true}
          />

          {/* Category */}
          <Select
            placeholder="Select Category"
            value={productData.category.toLocaleUpperCase()}
            label={'Category'}
            onSelect={index => onChangeSelect('category', index)}>
            <SelectItem title="books" />
            <SelectItem title="clothing" />
            <SelectItem title="electronics" />
            <SelectItem title="groceries" />
          </Select>

          {/* Select Business */}
          <Select
            placeholder={'Select Business'}
            // value={business.businesses[0]?.name}
            value={productData.businessName}
            label={'Business'}
            onSelect={index => onChangeSelect('businessId', index)}>
            {business.businesses.map((business: any) => (
              <SelectItem
                key={business._id + Math.random()}
                title={business.businessName}
              />
            ))}
          </Select>

          {/* Category */}
          <View className="mt-4">
            <Text
              style={{
                fontSize: 12,
                color: 'gray',
                marginBottom: 8,
              }}>
              Category
            </Text>
            <View className="flex-row">
              {['rent', 'sell', 'donate'].map((item: any, index: any) => (
                <CheckBox
                  key={index}
                  checked={productData.availableFor.includes(item)}
                  onChange={() => handleSelectChange(index)}>
                  <Text style={{textTransform: 'capitalize'}}>{item}</Text>
                </CheckBox>
              ))}
            </View>
          </View>

          {/* Price */}

          <MyText
            placeholder="Price"
            text={productData.price.toString()}
            setText={(text: string) => onChangeInput('price', parseInt(text))}
            required={true}
          />

          {/* Quantity Available */}

          <MyText
            placeholder="Quantity"
            text={productData.quantity.toString()}
            setText={(text: string) =>
              onChangeInput('quantity', parseInt(text))
            }
            required={true}
          />

          <View className="mt-4">
            <CheckBox
              checked={productData.isSubscriptionAvailable}
              onChange={toggleSubscription}>
              Subscription Available
            </CheckBox>
          </View>

          {productData.isSubscriptionAvailable && (
            <>
              <MyText
                placeholder="Daily Price"
                text={productData.rentalDetails.dailyPrice.toString()}
                setText={(text: string) =>
                  onChangeInput('dailyPrice', parseInt(text), 'rentalDetails')
                }
                required={true}
              />

              <MyText
                placeholder="Weekly Price"
                text={productData.rentalDetails.weeklyPrice.toString()}
                setText={(text: string) =>
                  onChangeInput('weeklyPrice', parseInt(text), 'rentalDetails')
                }
                required={true}
              />

              <MyText
                placeholder="Monthly Price"
                text={productData.rentalDetails.monthlyPrice.toString()}
                setText={(text: string) =>
                  onChangeInput('monthlyPrice', parseInt(text), 'rentalDetails')
                }
                required={true}
              />

              <MyText
                placeholder="Deposit"
                text={productData.rentalDetails.deposit.toString()}
                setText={(text: string) =>
                  onChangeInput('deposit', parseInt(text), 'rentalDetails')
                }
                required={true}
              />
            </>
          )}

          <Text category="s1" style={{marginTop: 16}}>
            Specifications
          </Text>

          {productData?.specifications?.map((spec, index) => (
            <Layout
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <Input
                value={spec.key || ''}
                placeholder="Model"
                onChangeText={text =>
                  handleSpecificationChange(index, 'key', text)
                }
                style={{flex: 1, marginRight: 8}}
              />
              <Input
                value={spec.value || ''}
                placeholder="iPhone 15 Pro Max"
                onChangeText={text =>
                  handleSpecificationChange(index, 'value', text)
                }
                style={{flex: 2}}
              />
            </Layout>
          ))}

          <TouchableOpacity
            className={`flex-row items-center mt-4 bg-[${styles.darkPrimaryColor}] p-2 rounded-md justify-center`}
            onPress={addSpecification}>
            <PlusIcon size={24} color="white" />
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                // fontWeight: 'bold',
                marginLeft: 8,
              }}
              className="font-semibold text-white ">
              Add Specification
            </Text>
          </TouchableOpacity>
        </Layout>

        <TouchableOpacity
          className={`flex-row items-center mt-4 bg-[${styles.darkPrimaryColor}] p-2 rounded-md justify-center`}
          onPress={handleAddProduct}
          disabled={disableAddProductButton}>
          {loading && <Progress.Circle size={16} color="white" />}
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              // fontWeight: 'bold',
              marginLeft: 8,
            }}
            className="text-white font-semibold">
            Add Product
          </Text>
        </TouchableOpacity>
      </Layout>
    </ScrollView>
  );
};

export default AddProductScreen;
