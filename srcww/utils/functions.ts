import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

const thresholds = [
  {l: 's', r: 44, d: 'second'},
  {l: 'm', r: 89},
  {l: 'mm', r: 44, d: 'minute'},
  {l: 'h', r: 89},
  {l: 'hh', r: 21, d: 'hour'},
  {l: 'd', r: 35},
  {l: 'dd', r: 25, d: 'day'},
  {l: 'M', r: 45},
  {l: 'MM', r: 11, d: 'month'}, // 46 days to 11 months
  {l: 'y', r: 23}, // 12 months to 23 months
  {l: 'yy', d: 'year'}, // 24 months+
];
const rounding = Math.floor;
dayjs.extend(relativeTime, {
  thresholds,
  rounding,
});
dayjs.extend(utc);

export const getAge = (dob: Date) => {
  const dateOfBirth = dayjs(dob);
  const age = dateOfBirth.fromNow(true);
  return age;
};

export const reverseGeocode = async (latitude: any, longitude: any) => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDO2K52Xb4RItlWKN9OALhJKXSzR3rKEfE';
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
  );

  const json = await response.json();
  console.log(json);
  if (json.results.length > 0) {
    const address = json.results[0].formatted_address;
    console.log(address); // This will contain the full address.
    const addressDetails = getAddressDetails(json.results);
    return addressDetails;
  }
};

const getAddressDetails = (results: any) => {
  // Initialize an object to store address components
  let address = {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  };

  if (results.length > 0) {
    // Iterate through the address components of the first result
    results[0].address_components.forEach((component: any) => {
      // Depending on the types, fill the address object appropriately
      if (component.types.includes('route')) {
        address.street = component.long_name; // Assuming the street name is under 'route'
      }
      if (component.types.includes('locality')) {
        address.city = component.long_name;
      }
      if (component.types.includes('administrative_area_level_1')) {
        address.state = component.long_name;
      }
      if (component.types.includes('postal_code')) {
        address.postalCode = component.long_name;
      }
      if (component.types.includes('country')) {
        address.country = component.long_name;
      }
    });
  }

  return address;
};
