import {Button, Input, Select, SelectItem} from '@ui-kitten/components';
import React, {useState} from 'react';
import {communityOrderService} from '../../services/api/communityOrder';
import {uploadImageToImageKit} from '../../utils/ImageUpload';
import ImagePickerComponent from '../Merchant/ProductManagment/ImageUpload';

const AddCommunityOrderScreen = () => {
  const initialOrderData = {
    product: {
      name: '',
      description: '',
      unit: '',
      isListed: true,
      images: [],
      thumbnail: '',
    },
    targetQuantity: '',
    pricePerUnit: '',
    participants: [],
    status: 'Open',
  };

  const [orderData, setOrderData] = useState(initialOrderData);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState('Processing');
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const handleInputChange = (field: any, value: any, nestedField?: any) => {
    if (nestedField) {
      setOrderData({
        ...orderData,
        [nestedField]: {
          ...orderData[nestedField],
          [field]: value,
        },
      });
    } else {
      setOrderData({
        ...orderData,
        [field]: value,
      });
    }
  };

  const handleCreateOrder = async () => {
    setLoading(true);
    console.log('Order Data:', orderData);
    try {
      uploadImageToImageKit(base64Images, 'community_order_images').then(
        images => {
          console.log('Image Upload Response', images);
          setOrderData({
            ...orderData,
            product: {
              ...orderData.product,
              images: images.imagesUrl,
              thumbnail: images?.thumbnailUrl[0],
            },
          });

          communityOrderService
            .createCommunityOrder({
              ...orderData,
              product: {
                ...orderData.product,
                images: images.imagesUrl,
                thumbnail: images?.thumbnailUrl[0],
              },
            })
            .then(response => {
              console.log('Order Created:', response);
              setOrderData(initialOrderData); // Reset form
              setBase64Images([]); // Reset images
              setProcessing('Order Created');
              setLoading(false);
            })
            .catch(error => {
              console.error('Error creating order:', error);
            });
        },
      );
    } catch (error) {
      console.error('Error creating order:', error);
    }
    setLoading(false);
  };

  return (
    <>
      {/* <Layout level="1" style={{marginBottom: 20}}>
        <Text category="h5">Add New Community Order</Text>
      </Layout> */}

      {/* <Input
        label="Organizer Username"
        placeholder="Enter organizer username"
        value={orderData.organizerUsername}
        onChangeText={text => handleInputChange('organizerUsername', text)}
      /> */}
      <ImagePickerComponent
        selectionLimit={5}
        imageData={base64Images}
        setImageData={(images: any) => setBase64Images(images)}
      />
      <Input
        label="Product Name"
        placeholder="Enter product name"
        value={orderData.product.name}
        onChangeText={text => handleInputChange('name', text, 'product')}
      />

      <Input
        label="Description"
        placeholder="Enter description"
        multiline
        value={orderData.product.description}
        onChangeText={text => handleInputChange('description', text, 'product')}
      />
      <Input
        label="Target Quantity"
        placeholder="Enter target quantity"
        keyboardType="numeric"
        value={orderData.targetQuantity.toString() || '0'}
        onChangeText={text =>
          handleInputChange('targetQuantity', parseInt(text))
        }
      />

      <Input
        label="Price Per Unit"
        placeholder="Enter price per unit"
        keyboardType="numeric"
        value={orderData.pricePerUnit ? orderData.pricePerUnit + '' : '0'}
        onChangeText={text => handleInputChange('pricePerUnit', parseInt(text))}
      />

      <Select
        label="Unit of Measure"
        value={orderData.product.unit}
        onSelect={index =>
          handleInputChange(
            'unit',
            ['kg', 'piece', 'ton', 'liters'][index.row],
            'product',
          )
        }>
        <SelectItem key="kg" title="Kg" />
        <SelectItem title="Piece" key="piece" />
        <SelectItem title="Ton" key="ton" />
        <SelectItem title="Liters" key="liters" />
      </Select>

      <Button onPress={handleCreateOrder} disabled={loading}>
        {loading ? processing : 'Create Order'}
      </Button>
    </>
  );
};

export default AddCommunityOrderScreen;
