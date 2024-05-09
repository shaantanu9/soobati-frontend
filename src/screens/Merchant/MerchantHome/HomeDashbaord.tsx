import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {useEffect, useRef, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {MagnifyingGlassIcon, PlusIcon} from 'react-native-heroicons/outline';
import images from '../../../assets/images';
import {MessageIcon} from '../../../assets/svg';
import MyText from '../../../components/new/MyText';
import {useAppDispatch, useAppSelector} from '../../../hooks/useAppSelector';
import {selectBusiness} from '../../../redux/features/business/businessSlice';
import {fetchBusinesses} from '../../../redux/features/business/businessThunk';
import {fetchProducts} from '../../../redux/features/product/productThunk';
import BottomSheetComp from '../../../screens/BottomSheetComp';
import MerchantAccountSettingScreen from '../../../screens/Merchant/MerchantAccountSetting/MerchantAccountSetting';
import {_businessService} from '../../../services/api/business';
import {_subscriptionService} from '../../../services/api/subscription';
import styles from '../../../styles';
import AddProductScreen from '../ProductManagment/AddProductScreen';
import SubscriptionFormMerchant from '../Subscription/SubscriptionFormMerchant';

dayjs.extend(utc);

const orders: any = [
  {
    date: 'Apr 02, 2022',
    time: '12:10',
    clientName: 'Kathryn Murphy',
    clientImage: 'path-to-client-image', // replace with actual path to image
    items: [
      {image: images.profileImage1}, // replace with actual paths to images
      {image: images.profileImage2}, // replace with actual paths to images
      {image: images.profileImage3}, // replace with actual paths to images
      // Add more items as necessary
    ],
    itemCount: 7,
    total: 250,
    timeRemaining: '01:50',
  },
];

const HomeDashbaord = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {businesses, selectedBusiness} = useAppSelector(
    state => state.business,
  );
  const user = useAppSelector(state => state.user);
  const products = useAppSelector(state => state.product.products);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<
    {
      employeeId: string;
      employeeName: string;
      role: string;
    }[]
  >([]);

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>('employee');
  const [subscriptions, setSubscriptions] = useState<any>(null);

  //   Employee
  const [employeeMobile, setEmployeeMobile] = useState<string>('');
  const [loadingEmployee, setLoadingEmployee] = useState<boolean>(false);

  const openAddProductRef = useRef<BottomSheetModal>(null);
  const openAddBusinessRef = useRef<BottomSheetModal>(null);
  const openAddEmployeeRef = useRef<BottomSheetModal>(null);
  const openAddCustomerRef = useRef<BottomSheetModal>(null);

  const customSnapOpen = (ref: any, index: number) => {
    // if any other bottom sheet is open close it
    [
      openAddProductRef,
      openAddBusinessRef,
      openAddEmployeeRef,
      openAddCustomerRef,
    ].map(ref => ref.current?.close());

    ref.current?.snapToIndex(index);
  };

  const [payload, setPayload] = useState({
    ownerId: user.userId,
  });

  useEffect(() => {
    dispatch(fetchBusinesses(payload));
  }, []);
  useEffect(() => {
    if (selectedCategory === 'product' && selectedBusiness?._id) {
      console.log('Product');
      dispatch(
        fetchProducts({
          businessId: selectedBusiness?._id,
        }),
      );
    }
    if (selectedCategory === 'employee' && selectedBusiness?._id) {
      // fetch employees
      console.log('Employee');
      setSelectedEmployee(selectedBusiness?.employees);
    }
    if (selectedCategory === 'customer' && selectedBusiness?._id) {
      // fetch customers
      console.log('Customer');
      _subscriptionService
        .getSubscriptionDetails({
          businessId: selectedBusiness?._id,
        })
        .then(res => {
          if (res?.statusCode === 200) {
            console.log(res.data, 'resresresresresres');
            setSubscriptions(res.data);
          }
        });
    }
  }, [selectedCategory, selectedBusiness]);

  const addEmployeeHandler = async () => {
    if (!employeeMobile || employeeMobile.length < 10) {
      return alert('Please enter employee mobile');
    }
    setLoadingEmployee(true);
    _businessService
      .addEmployeeToBusiness(selectedBusiness?._id, {mobile: employeeMobile})
      .then(res => {
        setLoadingEmployee(false);
        if (res?.statusCode === 200) {
          setSelectedEmployee([...selectedEmployee, res.data]);
          setEmployeeMobile('');
          customSnapOpen(openAddEmployeeRef, -1);

          return alert('Employee Added');
        }
        if (res.statusCode === 400) {
          return alert(res.message);
        }
      })
      .catch(err => {
        setLoadingEmployee(false);

        console.log('Employee Added', err);
      });
  };

  return (
    <>
      <ScrollView className="p-2 bg-white">
        <View className="p-2 flex-row justify-between items-center">
          <View>
            <Text
              className={`text-2xl font-bold text-[${styles.darkPrimaryColor}] w-60`}>
              Welcome to Soobati {user.name} !
            </Text>
          </View>
          <View>
            <MagnifyingGlassIcon
              size={30}
              color={styles.darkPrimaryColor}
              strokeWidth={3}
            />
          </View>
        </View>
        <View
          className={`flex-row justify-between items-start bg-[${styles.darkPrimaryColor}] text-white rounded-xl p-2 mt-2 h-40`}>
          <View className=" flex justify-center items-center bg-red-400 rounded-xl p-2 w-24 h-24">
            <Text className="text-lg font-semibold text-white ">Orders</Text>
            <Text className="text-2xl font-bold text-white">0</Text>
          </View>
          <View className=" flex justify-center items-center bg-red-400 rounded-xl p-2 w-24 h-24">
            <Text className="text-lg font-semibold text-white ">Revenue</Text>
            <Text className="text-2xl text-white font-bold">0</Text>
          </View>
          <View className=" flex justify-center items-center bg-red-400 rounded-xl p-2 w-24 h-24">
            <Text className="text-lg font-semibold text-white ">Products</Text>
            <Text className="text-2xl text-white font-bold">0</Text>
          </View>
        </View>

        {/* Business List */}
        <View className="flex-row justify-between items-start bg-[${styles.darkPrimaryColor}] text-white rounded-xl p-2 mt-2">
          <Text className="text-lg font-bold text-[${styles.darkPrimaryColor}] w-60 mt-1">
            Businesses
          </Text>
          <TouchableOpacity
            className="bg-[#f4f4f4] p-[1px] rounded-lg"
            onPress={() => customSnapOpen(openAddBusinessRef, 1)}>
            <PlusIcon
              size={30}
              color={styles.darkPrimaryColor}
              strokeWidth={3}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row mt-1 bg-gray-50 h-30">
          {businesses.map((business: any) => (
            <TouchableOpacity
              onPress={() => dispatch(selectBusiness(business._id))}
              key={business?._id}
              className={`flex justify-between items-start bg-[${styles.darkPrimaryColor}] text-white rounded-xl p-2 m-2`}>
              <Text className="text-lg font-semibold text-white capitalize">
                {business?.businessName}
              </Text>
              <Text className="text-lg font-semibold text-white capitalize">
                {business?.address?.city}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Selected Business */}
        <View
          className={`flex-row justify-between items-start text-white rounded-xl p-2 mt-2`}>
          <Text className="text-lg font-bold text-[${styles.darkPrimaryColor}] w-40 mt-1">
            Selected Business
          </Text>
          <Text
            className={`text-lg font-bold bg-[${styles.darkPrimaryColor}] mt-1 rounded-md text-white px-3 py-1`}>
            {selectedBusiness?.businessName}
          </Text>
        </View>

        {/* vertical List to select product employee customer and show that in list and have search option  */}
        <View>
          <View className="flex-row justify-between items-start bg-[${styles.darkPrimaryColor}] text-white rounded-xl p-2 mt-2">
            <TouchableOpacity
              onPress={() => setSelectedCategory('product')}
              className={`flex justify-between items-start rounded-xl p-2 m-2 bg-gray-100 ${
                selectedCategory === 'product' &&
                `bg-[${styles.darkPrimaryColor}]`
              }  `}>
              <Text
                className={`text-lg font-semibold
                ${selectedCategory === 'product' && `text-white`}
            `}>
                Product
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedCategory('employee')}
              className={`flex justify-between items-start rounded-xl p-2 m-2 bg-gray-100 ${
                selectedCategory === 'employee' &&
                `bg-[${styles.darkPrimaryColor}]`
              }  `}>
              <Text
                className={`text-lg font-semibold 
            ${selectedCategory === 'employee' && `text-white`}
            `}>
                Employee
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedCategory('customer')}
              className={`flex justify-between items-start rounded-xl p-2 m-2 bg-gray-100 ${
                selectedCategory === 'customer' &&
                `bg-[${styles.darkPrimaryColor}]`
              }  `}>
              <Text
                className={`text-lg font-semibold
                ${selectedCategory === 'customer' && `text-white`}
            `}>
                Subscriptions
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex mb-40">
          {selectedCategory === 'employee' && (
            <>
              <View>
                <View className="flex-row justify-between items-start bg-[${styles.darkPrimaryColor}] text-white rounded-xl p-2 mt-2">
                  <Text className="text-lg font-bold text-[${styles.darkPrimaryColor}] w-50 mt-1">
                    Employees
                  </Text>
                  <View className="flex-row justify-between items-start bg-[${styles.darkPrimaryColor}] text-white rounded-xl gap-2">
                    <TouchableOpacity
                      onPress={() => setSelectedProduct(null)}
                      className="bg-[#f4f4f4] p-2 rounded-lg">
                      <Text className="text-gray-500">All Employee</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => customSnapOpen(openAddEmployeeRef, 1)}
                      className="bg-[#f4f4f4] p-2 rounded-lg">
                      <PlusIcon
                        size={20}
                        color={styles.darkPrimaryColor}
                        strokeWidth={3}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {selectedEmployee?.map((product: any) => (
                  <EmployeeListView key={product._id} employee={product} />
                ))}
              </View>
            </>
          )}
          {selectedCategory === 'product' && (
            <>
              <View>
                <View className="flex-row justify-between items-start bg-[${styles.darkPrimaryColor}] text-white rounded-xl p-2 mt-2">
                  <Text className="text-lg font-bold text-[${styles.darkPrimaryColor}] w-50 mt-1">
                    Products
                  </Text>
                  <View className="flex-row justify-between items-start bg-[${styles.darkPrimaryColor}] text-white rounded-xl gap-2">
                    <TouchableOpacity
                      onPress={() => setSelectedProduct(null)}
                      className="bg-[#f4f4f4] p-2 rounded-lg">
                      <Text className="text-gray-500">All Products</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => customSnapOpen(openAddProductRef, 1)}
                      className="bg-[#f4f4f4] p-2 rounded-lg">
                      <PlusIcon
                        size={20}
                        color={styles.darkPrimaryColor}
                        strokeWidth={3}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {products?.map((product: any) => (
                  <ProductListView key={product._id} product={product} />
                ))}
              </View>
            </>
          )}
          {selectedCategory === 'customer' && (
            <View>
              <View className="flex-row justify-between items-start bg-[${styles.darkPrimaryColor}] text-white rounded-xl p-2 mt-2">
                <Text className="text-lg font-bold text-[${styles.darkPrimaryColor}] w-50 mt-1">
                  Subscriptions
                </Text>
                <View className="flex-row justify-between items-start bg-[${styles.darkPrimaryColor}] text-white rounded-xl gap-2">
                  <TouchableOpacity
                    onPress={() => setSelectedProduct(null)}
                    className="bg-[#f4f4f4] p-2 rounded-lg">
                    <Text className="text-gray-500">All Customers</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => customSnapOpen(openAddCustomerRef, 2)}
                    className="bg-[#f4f4f4] p-2 rounded-lg">
                    <PlusIcon
                      size={20}
                      color={styles.darkPrimaryColor}
                      strokeWidth={3}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {subscriptions?.map((product: any) => (
                <CustomerListView key={product._id} customer={product} />
              ))}
            </View>
          )}
        </View>
        <View className="my-30"></View>
      </ScrollView>
      {/* Add Prduct */}
      <BottomSheetComp
        title="Add Product"
        ref={openAddProductRef}
        memoArray={['25%', '50%', '70']}>
        <AddProductScreen
          hideHeader={true}
          closeSheet={() => openAddProductRef.current?.close()}
        />
      </BottomSheetComp>

      <BottomSheetComp
        title="Add Business"
        ref={openAddBusinessRef}
        memoArray={['25%', '50%', '70']}>
        <MerchantAccountSettingScreen
          navigation={navigation}
          hideHeader={true}
          routeRedirect={false}
          closeSheet={() => openAddBusinessRef.current?.close()}
        />
      </BottomSheetComp>

      {/* Add Empoyee */}
      <BottomSheetComp
        title="Add Employee"
        ref={openAddEmployeeRef}
        memoArray={['25%', '50%', '70']}>
        <View className="flex justify-between bg-white p-2 rounded-lg shadow-md space-y-4">
          <MyText
            placeholder="Employee Mobile"
            text={employeeMobile}
            setText={setEmployeeMobile}
            keyboardTypeInput={1}
            required={true}
          />
          <TouchableOpacity
            onPress={addEmployeeHandler}
            className={`
            bg-[${styles.darkPrimaryColor}] p-2 rounded-lg
            `}>
            <Text className="text-white text-lg font-bold capitalize">
              Add to
              {' ' + selectedBusiness?.businessName}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>

      {/* Add Customer */}
      <BottomSheetComp
        title="Add Subscription"
        ref={openAddCustomerRef}
        memoArray={['25%', '50%', '70']}>
        <SubscriptionFormMerchant
          closeSheet={() => openAddCustomerRef.current?.close()}
          selctedBusiness={selectedBusiness}
        />
      </BottomSheetComp>
    </>
  );
};

export default HomeDashbaord;

// list view for product employee customer

const EmployeeListView = ({
  employee,
}: {
  employee: {
    employeeId: string;
    employeeName: string;
    role: string;
    image?: string;
    startDate: string;
  };
}) => {
  return (
    <View className="flex justify-between items-start bg-white my-2 p-2 rounded-lg shadow-md">
      {/* Left Section - Order Info */}
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-500 text-xs">
            {dayjs.utc(employee?.startDate).format('MMM DD,YYYY')}
          </Text>
          <Text className="text-gray-500 text-xs mt-1">
            {dayjs.utc(employee?.startDate).format('hh:mm A')}
          </Text>
        </View>
        <View className="flex-row justify-between items-center my-1 w-full">
          <View className="flex-row items-center my-1">
            {employee?.image ? (
              <Image
                source={{uri: employee?.image}}
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <Image
                source={images.profileImage1}
                className="h-12 w-12 rounded-full"
              />
            )}
            <View className="flex justify-between items-start">
              <Text className="font-bold ml-2 capitalize">
                {employee?.employeeName}
              </Text>
              <Text className="font-bold ml-2 capitalize">
                {employee?.role}
              </Text>
            </View>
          </View>
          <MessageIcon />
        </View>
      </View>
    </View>
  );
};

const ProductListView = ({
  product,
}: {
  product: {
    name: string;
    price: number;
    thumbnail: string;
    isSubscriptionAvailable: boolean;
    availableFor: string[];
    quantity: number;
    createdAt: string;
  };
}) => {
  console.log('product', product);
  return (
    <View className="flex justify-between items-start bg-white my-2 p-2 rounded-lg shadow-md">
      {/* Left Section - Order Info */}
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-500 text-xs">
            {dayjs.utc(product?.createdAt).format('MMM DD,YYYY')}
          </Text>
          <Text className="text-gray-500 text-xs mt-1">
            {dayjs.utc(product?.createdAt).format('hh:mm A')}
          </Text>
        </View>
        <View className="flex-row justify-between items-center my-1 w-full">
          <View className="flex-row items-center my-1">
            <Image
              source={{uri: product.thumbnail} || images.profileImage1}
              className="h-12 w-12 rounded-full"
            />
            <View className="flex justify-between items-start">
              <Text className="font-bold ml-2 capitalize">{product.name}</Text>
              <Text className="font-bold ml-2 capitalize">{product.price}</Text>
            </View>
          </View>
          <MessageIcon />
        </View>
      </View>
    </View>
  );
};

const CustomerListView = ({
  customer,
}: {
  customer: {
    name: string;
    mobile: string;
    profileImage: string;
    startDate: string;
    customerName: string;
    frequency: string;
    productName: string;
    deliveries: any;
  };
}) => {
  const [totalDelivered, setTotalDelivered] = useState(0);
  const [totalCancelled, setTotalCancelled] = useState(0);
  const calculateDeliveryMetrics = () => {
    let totalDelivered = 0;
    let totalCancelled = 0;

    customer.deliveries.forEach((delivery: any) => {
      if (delivery.status === 'Delivered') {
        totalDelivered += 1;
      }
      if (delivery.status === 'Cancelled') {
        totalCancelled += 1;
      }
    });

    setTotalDelivered(totalDelivered);
    setTotalCancelled(totalCancelled);
  };

  useEffect(() => {
    calculateDeliveryMetrics();
  }, [customer]);

  return (
    <View className="flex justify-between items-start bg-white my-2 p-2 rounded-lg shadow-md">
      {/* Left Section - Order Info */}
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-500 text-xs">
            {dayjs.utc(customer?.startDate).format('MMM DD,YYYY')}
          </Text>
          <Text className="text-gray-500 text-xs mt-1">
            {dayjs.utc(customer?.startDate).format('hh:mm A')}
          </Text>
        </View>
        <View className="flex-row justify-between items-center my-1 w-full">
          <View className="flex-row items-center my-1">
            {customer?.profileImage?.length ? (
              <Image
                source={{uri: customer?.profileImage}}
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <Image
                source={images.profileImage1}
                className="h-12 w-12 rounded-full"
              />
            )}
            <View className="flex justify-between items-start">
              <Text className="font-bold ml-2 capitalize">
                {customer.customerName}
              </Text>
              <Text className="font-bold ml-2 capitalize">
                {customer.productName}
              </Text>
              <Text className="font-bold ml-2 capitalize">
                {customer.frequency}
              </Text>
            </View>
          </View>
          <View>
            <Text className="font-bold ml-2 capitalize">
              Delivered {totalDelivered}
            </Text>
            <Text className="font-bold ml-2 capitalize">
              Cancelled {totalCancelled}
            </Text>
          </View>
          <MessageIcon />
        </View>
      </View>
    </View>
  );
};
